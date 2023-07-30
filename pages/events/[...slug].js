import { getFilteredEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

const RenderFail = ({ text }) => (
	<>
		<ErrorAlert>
			<p>{text}</p>
		</ErrorAlert>
		<div className='center'>
			<Button link='/events'>Show All Events</Button>
		</div>
	</>
)

function FilteredEventsPage({ isDateNotValid, filteredEvents, year, month }) {
	if (isDateNotValid) {
		return <RenderFail text='Invalid filter. Please adjust your values!' />
	}

	if (!filteredEvents?.length) {
		return <RenderFail text='No events found for the chosen filter!' />
	}

	const date = new Date(year, month - 1)

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	)
}

export async function getServerSideProps(context) {
	const [year, month] = context.params.slug.map((a) => +a)

	const isDateNotValid =
		isNaN(year) ||
		isNaN(month) ||
		year > 2030 ||
		year < 2021 ||
		month < 1 ||
		month > 12

	if (isDateNotValid) {
		return {
			// if we want we can use props to get if there is error
			props: { isDateNotValid: true },
			// if we want we can set 404 error page
			/* notFound: true, */
			// if we want we can redirect to another page
			/* redirect: {
				destination: '/error',
			}, */
		}
	}

	const filteredEvents = await getFilteredEvents({ year, month })

	return { props: { filteredEvents, year, month } }
}

export default FilteredEventsPage

import { Fragment } from 'react'
import { getEventById, getFeaturedEvents } from '../../helpers/api-util'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'

function EventDetailPage({ event }) {
	if (!event) {
		return (
			<ErrorAlert>
				<p>No event found!</p>
			</ErrorAlert>
		)
	}

	return (
		<Fragment>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>
	)
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId
	const event = await getEventById(eventId)
	if (!event) return { notFound: true }
	return { props: { event: event ?? null }, revalidate: 30 }
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents()
	const ids = events.map(({ id }) => ({ params: { eventId: id } }))
	return { paths: ids, fallback: 'blocking' }
}

export default EventDetailPage

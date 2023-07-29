import { useRouter } from 'next/router'
import { getAllEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'

function AllEventsPage({ events }) {
	const router = useRouter()

	function findEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`
		router.push(fullPath)
	}

	return (
		<>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</>
	)
}

export async function getStaticProps() {
	const events = await getAllEvents()
	return { props: { events }, revalidate: 30 }
}

export default AllEventsPage
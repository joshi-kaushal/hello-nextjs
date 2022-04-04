import { useState } from "react";
import { useRouter } from "next/router";

export default function Events({ eventsList }) {
  const [events, setEvents] = useState(eventsList);

  const router = useRouter();

  const fetchSportsEvents = async () => {
    const response = await fetch(
      "http://localhost:3001/events?category=sports"
    );
    const data = await response.json();
    setEvents(data);

    router.push("/events?category=sports", undefined, { shallow: true });
  };

  return (
    <>
      <h1>List of events</h1>

      <button onClick={fetchSportsEvents}>sports events</button>

      {events.map((event) => {
        return (
          <div key={event.id}>
            <hr />
            <h2>{event.title}</h2>
            <b>{event.category}</b>
            <p>{event.description}</p>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const { category } = context.query;
  const queryString = category ? `?category=${category}` : "";

  /*
	? When we reload the page, `getServerSideProps` is called again.
	? This time, `category` is present. Hence, URL fetches filtered events.
  */

  const response = await fetch(`http://localhost:3001/events/${queryString}`);
  const eventsList = await response.json();

  return {
    props: {
      eventsList,
    },
  };
}

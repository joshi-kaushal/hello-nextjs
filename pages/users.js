import Users from "../components/users";

export default function ({ users }) {
  return (
    <>
      <h1>Users List:</h1>

      {users.map((user) => {
        return <Users user={user} />;
      })}
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return {
    props: {
      users,
    },
  };
}

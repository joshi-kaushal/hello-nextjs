export default function Users({ user }) {
  return (
    <>
      <ul>
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      </ul>
    </>
  );
}

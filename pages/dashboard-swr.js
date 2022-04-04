import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("http://localhost:3001/dashboard");
  const data = await response.json();

  return data;
};
export default function DashboardSWR() {
  const { data, error } = useSWR("dashboard", fetcher);

  if (error) return "Error fetching data";
  if (!data) return "Loading...";

  return (
    <div>
      <h1>Dashboard</h1>
      <p> number of posts: {data.posts}</p>
      <p> number of likes: {data.likes}</p>
      <p> number of comments: {data.comments}</p>
      <p> number of shares: {data.shares}</p>
    </div>
  );
}

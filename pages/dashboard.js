import { useState, useEffect } from "react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/dashboard");
      const data = await response.json();
      setDashboardData(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p> number of posts: {dashboardData.posts}</p>
      <p> number of likes: {dashboardData.likes}</p>
      <p> number of comments: {dashboardData.comments}</p>
      <p> number of shares: {dashboardData.shares}</p>
    </div>
  );
}

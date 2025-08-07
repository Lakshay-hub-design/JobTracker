import { useAuth } from "../context/AuthContex";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Hello, {user?.email}</h1>
      <p>Welcome {user?.name} to your dashboard!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;


import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import "./App.css";

// Define what a user looks like
type User = {
  id: number;
  name: string;
  email: string;
};

// Temporary data instead of an API
const sampleUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com" }
];

function App() {
  // Store the list of users
  const [users, setUsers] = useState<User[]>([]);

  // Track whether data is loading
  const [loading, setLoading] = useState(true);

  // Store any error message
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate loading data without an API
    const timer = setTimeout(() => {
      try {
        setUsers(sampleUsers);
        setError("");
      } catch {
        setError("Something went wrong loading users.");
      } finally {
        setLoading(false);
      }
    }, 1500);

    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <h1>React State Management</h1>

      {/* Show a loading message */}
      {loading && <p>Loading users...</p>}

      {/* Show an error if something goes wrong */}
      {error && <p className="error">{error}</p>}

      {/* Show users when loading is finished */}
      {!loading && !error && <UserList users={users} />}
    </div>
  );
}

export default App;

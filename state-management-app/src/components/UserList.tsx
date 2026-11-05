type User = {
  id: number;
  name: string;
  email: string;
};

type UserListProps = {
  users: User[];
};

function UserList({ users }: UserListProps) {
  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
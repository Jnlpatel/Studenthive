import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div className="max-w-sm mx-auto mt-16 p-4">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h1>
      <p className="text-gray-600">Email: {user.email}</p>
    </div>
);
}

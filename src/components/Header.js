import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600 cursor-pointer" >
        Blog Editor
      </h1>

      <nav className="flex gap-3">
        <button
          onClick={() => navigate('/editor')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + New Blog
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Profile</button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

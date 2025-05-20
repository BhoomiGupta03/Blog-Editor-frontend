

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(atob(token.split('.')[1]));
        setUser(userData);

        const res = await API.get('/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching dashboard data');
      }
    };
    fetchData();
  }, []);

  const published = blogs.filter((b) => b.status === 'published');
  const drafts = blogs.filter((b) => b.status === 'draft');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Profile Link */}
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer" >
          Blog Editor
        </h1>
        <div className="flex items-center gap-6">
          {user && (
            <button
              onClick={() => navigate('/profile')}
              className="text-sm text-right text-gray-700 hover:text-blue-600 font-medium"
            >
              {user.name}
            </button>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/editor')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              + New Blog
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Blog Sections */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Published Blogs</h2>
          {published.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {published.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white p-4 rounded shadow cursor-pointer hover:border-blue-500 border"
                  onClick={() => navigate('/editor', { state: blog })}
                >
                  <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-500 text-sm">{blog.tags?.join(', ')}</p>
                  <p className="text-gray-700 mt-2 line-clamp-2">{blog.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No published blogs yet.</p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Drafts</h2>
          {drafts.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {drafts.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white p-4 rounded shadow cursor-pointer hover:border-yellow-500 border"
                  onClick={() => navigate('/editor', { state: blog })}
                >
                  <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-500 text-sm">{blog.tags?.join(', ')}</p>
                  <p className="text-gray-700 mt-2 line-clamp-2">{blog.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No drafts yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}
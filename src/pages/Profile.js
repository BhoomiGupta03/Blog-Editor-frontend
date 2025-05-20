import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = JSON.parse(atob(token.split('.')[1]));
    setUser(decoded);

    API.get('/blogs')
      .then((res) => setBlogs(res.data))
      .catch(() => console.error('Error loading blogs'));
  }, []);

  const published = blogs.filter((b) => b.status === 'published');
  const drafts = blogs.filter((b) => b.status === 'draft');

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Info */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          {user ? (
            <div className="space-y-2 text-gray-700">
              {/* <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p> */}
              <p><strong>User ID:</strong> {user.id}</p>
            </div>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>

        {/* Published Blogs */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Published Blogs</h3>
          {published.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {published.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white p-4 rounded shadow cursor-pointer hover:border-blue-500 border"
                  onClick={() => navigate('/editor', { state: blog })}
                >
                  <h4 className="text-lg font-bold mb-2">{blog.title}</h4>
                  <p className="text-sm text-gray-500">{blog.tags?.join(', ')}</p>
                  <p className="text-gray-700 mt-2 line-clamp-2">{blog.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven’t published any blogs yet.</p>
          )}
        </div>

        {/* Draft Blogs */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Drafts</h3>
          {drafts.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {drafts.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white p-4 rounded shadow cursor-pointer hover:border-yellow-500 border"
                  onClick={() => navigate('/editor', { state: blog })}
                >
                  <h4 className="text-lg font-bold mb-2">{blog.title}</h4>
                  <p className="text-sm text-gray-500">{blog.tags?.join(', ')}</p>
                  <p className="text-gray-700 mt-2 line-clamp-2">{blog.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No drafts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

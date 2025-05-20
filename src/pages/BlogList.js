import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/blogs');
        setBlogs(res.data);
      } catch (err) {
        alert('Error loading blogs');
      }
    };
    fetchBlogs();
  }, []);

  const published = blogs.filter((b) => b.status === 'published');
  const drafts = blogs.filter((b) => b.status === 'draft');

  const openEditor = (blog) => {
    navigate('/editor', { state: blog });
  };

  return (

        <div className="min-h-screen bg-gray-100">
      <Header />

    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Blogs</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Published</h2>
        {published.length ? (
          published.map((blog) => (
            <div key={blog._id} className="border p-3 mb-3 cursor-pointer" onClick={() => openEditor(blog)}>
              <h3 className="text-lg font-bold">{blog.title}</h3>
              <p className="text-gray-600">{blog.tags.join(', ')}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No published blogs yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Drafts</h2>
        {drafts.length ? (
          drafts.map((blog) => (
            <div key={blog._id} className="border p-3 mb-3 cursor-pointer" onClick={() => openEditor(blog)}>
              <h3 className="text-lg font-bold">{blog.title}</h3>
              <p className="text-gray-600">{blog.tags.join(', ')}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No drafts available.</p>
        )}
      </section>
    </div>
    </div>
  );
}

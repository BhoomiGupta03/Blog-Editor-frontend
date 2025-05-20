import { useEffect, useRef, useState } from 'react';
import API from '../services/api';
import { debounce } from 'lodash';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function BlogEditor() {
  const [blog, setBlog] = useState({ title: '', content: '', tags: '' });
  const [blogId, setBlogId] = useState(null);
  const [autoSaved, setAutoSaved] = useState(false);
  const location = useLocation();

  useEffect(() => {
  if (location.state) {
    setBlog({
      title: location.state.title,
      content: location.state.content,
      tags: location.state.tags.join(', '),
    });
    setBlogId(location.state._id);
  }
}, [location]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
    debouncedAutoSave();
  };

  const saveDraft = async () => {
    try {
      const res = await API.post('/blogs/save-draft', { ...blog, id: blogId });
      setBlogId(res.data._id);
      setAutoSaved(true);
      setTimeout(() => setAutoSaved(false), 2000);
    } catch {
      console.error('Auto-save failed');
    }
  };

  const debouncedAutoSave = useRef(debounce(saveDraft, 5000)).current;

  const publish = async () => {
    try {
      await API.post('/blogs/publish', { ...blog, id: blogId });
      alert('Published!');
    } catch {
      alert('Failed to publish');
    }
  };

  return (
        <div className="min-h-screen bg-gray-100">
      <Header />

    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Blog Editor</h1>
      {autoSaved && <p className="text-green-500">Auto-saved</p>}
      <input
        className="w-full border p-2 mb-4"
        name="title"
        placeholder="Title"
        value={blog.title}
        onChange={handleChange}
      />
      <textarea
        className="w-full border p-2 mb-4 h-64"
        name="content"
        placeholder="Content"
        value={blog.content}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2 mb-4"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={blog.tags}
        onChange={handleChange}
      />
      <div className="flex gap-4">
        <button className="bg-gray-500 text-white px-4 py-2" onClick={saveDraft}>Save Draft</button>
        <button className="bg-blue-600 text-white px-4 py-2" onClick={publish}>Publish</button>
      </div>
    </div>
    </div>
  );
}

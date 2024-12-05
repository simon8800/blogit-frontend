import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router";
import Header from "../components/Header";

const EditorPage = () => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter a title for your blog post");
      return;
    }

    if (!editorRef.current || !editorRef.current.getContent().trim()) {
      alert("Please add some content to your blog post");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title.trim(),
          content: editorRef.current.getContent(),
          published: isPublished
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      navigate(`/blog/${data.id}`);
    } catch (error) {
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    // TODO: Implement draft saving functionality
    console.log("Save draft");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col p-10 gap-5">
        <textarea
          className="w-full text-2xl border-2 border-amber-200 rounded-lg p-2 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{ resize: "none" }}
          rows="1"
          value={title}
          placeholder="Blog title here..."
        />
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Don't think for too long. Just start writing...</p>"
          init={{
            height: 800,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic underline strikethrough | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
            />
            Publish immediately
          </label>
          <div className="flex gap-4">
            <button
              onClick={saveDraft}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors border border-gray-300"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : (isPublished ? 'Publish' : 'Save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;

import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorPage = () => {
  const [title, setTitle] = useState("");
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(title);
      console.log(editorRef.current.getContent());
      console.log(import.meta.env.VITE_TINYMCE_API_KEY);
    }
  };

  const saveDraft = () => {
    console.log("Save draft")
  }

  return (
    <div className="flex flex-col p-10 gap-5">
      <textarea
        className="w-full text-2xl border-2 rounded-lg p-2"
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
            "bold italic | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <div className="flex gap-2">
        <button className="border-2 rounded-md p-2 bg-amber-100" onClick={log}>
          Publish
        </button>
        <button className="border-2 rounded-md p-2 bg-amber-100" onClick={saveDraft}>
          Save draft
        </button>
      </div>
    </div>
  );
};

export default EditorPage;

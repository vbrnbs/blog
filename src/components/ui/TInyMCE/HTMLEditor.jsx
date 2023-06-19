import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function HTMLEditor({formData, setFormData}) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(formData);    
      setFormData({ ...formData, text: editorRef.current.getContent() });
      
    }
  };
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_REACT_APP_TINYMCE}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={formData.text.length > 0 ? formData.text : `<iframe style="width: 100%; height: 80vh; border: none;" src="" width="" height="" scrolling="auto" allowfullscreen="allowfullscreen"></iframe>`}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | code | ' +
            'bold italic forecolor fontfamily fontsize | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_css: 'tiny.css',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Submit Post Content</button>
    </>
  );
}
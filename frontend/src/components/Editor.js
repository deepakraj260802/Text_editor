
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Editor.css';

// const Editor = () => {
//   const [title, setTitle] = useState('');
//   const [letter, setLetter] = useState('');
//   const [message, setMessage] = useState('');
//   const [drafts, setDrafts] = useState([]);

//   // Load drafts from localStorage when the component mounts
//   useEffect(() => {
//     const storedDrafts = localStorage.getItem('drafts');
//     if (storedDrafts) {
//       setDrafts(JSON.parse(storedDrafts));
//     }
//   }, []);

//   // Function to save the current draft in localStorage
//   const handleSaveDraft = () => {
//     // Create a draft object with a unique ID (using Date.now())
//     const newDraft = {
//       id: Date.now(),
//       title: title,
//       letter: letter,
//       savedAt: new Date().toLocaleString()
//     };

//     const updatedDrafts = [newDraft, ...drafts];
//     setDrafts(updatedDrafts);
//     localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
//     setMessage('Draft saved locally!');
//   };

//   // Function to load a draft from the saved drafts list
//   const handleEditDraft = (draft) => {
//     setTitle(draft.title);
//     setLetter(draft.letter);
//     setMessage(`Loaded draft from ${draft.savedAt}`);
//   };

//   // Function to upload the current editor content
//   const handleUpload = async () => {
//     console.log('Upload clicked');
//     try {
//       const token = localStorage.getItem('jwt');
//       if (!token) {
//         setMessage('No JWT token found. Please log in again.');
//         return;
//       }
//       const response = await axios.post(
//         'http://localhost:5000/drive/upload',
//         { title, letterContent: letter },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log('Uploaded:', response.data);
//       setMessage(`Uploaded to Drive! File ID: ${response.data.fileId}`);
//     } catch (error) {
//       console.error('Upload error:', error);
//       setMessage('Upload failed. See console for details.');
//     }
//   };

//   // Optional: Clear the message after a delay
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         setMessage('');
//       }, 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   return (
//     <div className="editor-wrapper">
//       <div className="editor-header">
//         <h1>Letter Editor</h1>
//       </div>
//       <div className="editor-container">
//         <input
//           type="text"
//           placeholder="Enter Letter Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="editor-title"
//         />
//         <textarea
//           placeholder="Compose your letter here..."
//           value={letter}
//           onChange={(e) => setLetter(e.target.value)}
//           className="editor-textarea"
//         />
//         <div className="editor-actions">
//           <button className="editor-button" onClick={handleSaveDraft}>
//             Save Draft
//           </button>
//           <button className="editor-button upload-button" onClick={handleUpload}>
//             Upload to Drive
//           </button>
//         </div>
//         {message && <p className="editor-message">{message}</p>}
//       </div>
//       <div className="drafts-container">
//         <h2>Saved Drafts</h2>
//         {drafts.length === 0 ? (
//           <p>No drafts saved yet.</p>
//         ) : (
//           drafts.map((draft) => (
//             <div key={draft.id} className="draft-item">
//               <h3>{draft.title || 'Untitled Draft'}</h3>
//               <p>Saved at: {draft.savedAt}</p>
//               <button onClick={() => handleEditDraft(draft)}>Edit</button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Editor;



// src/components/Editor.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Editor.css';

const Editor = () => {
  const [title, setTitle] = useState('');
  const [letter, setLetter] = useState('');
  const [message, setMessage] = useState('');
  const [drafts, setDrafts] = useState([]);

  // Load drafts from localStorage when the component mounts
  useEffect(() => {
    const storedDrafts = localStorage.getItem('drafts');
    if (storedDrafts) {
      setDrafts(JSON.parse(storedDrafts));
    }
  }, []);

  // Function to save the current draft in localStorage
  const handleSaveDraft = () => {
    const newDraft = {
      id: Date.now(),
      title: title,
      letter: letter,
      savedAt: new Date().toLocaleString()
    };

    const updatedDrafts = [newDraft, ...drafts];
    setDrafts(updatedDrafts);
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
    setMessage('Draft saved locally!');
  };

  // Function to load a draft from the saved drafts list
  const handleEditDraft = (draft) => {
    setTitle(draft.title);
    setLetter(draft.letter);
    setMessage(`Loaded draft from ${draft.savedAt}`);
  };

  // Function to delete a draft from localStorage and state
  const handleDeleteDraft = (draftId) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
    setMessage('Draft deleted successfully.');
  };

  // Function to upload the current editor content
  const handleUpload = async () => {
    console.log('Upload clicked');
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setMessage('No JWT token found. Please log in again.');
        return;
      }
      const response = await axios.post(
        'http://localhost:5000/drive/upload',
        { title, letterContent: letter },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Uploaded:', response.data);
      setMessage(`Uploaded to Drive! File ID: ${response.data.fileId}`);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Upload failed. See console for details.');
    }
  };

  // Clear messages after a delay
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <h1>Letter Editor</h1>
      </div>
      <div className="editor-container">
        <input
          type="text"
          placeholder="Enter Letter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="editor-title"
        />
        <textarea
          placeholder="Compose your letter here..."
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          className="editor-textarea"
        />
        <div className="editor-actions">
          <button className="editor-button" onClick={handleSaveDraft}>
            Save Draft
          </button>
          <button className="editor-button upload-button" onClick={handleUpload}>
            Upload to Drive
          </button>
        </div>
        {message && <p className="editor-message">{message}</p>}
      </div>
      <div className="drafts-container">
        <h2>Saved Drafts</h2>
        {drafts.length === 0 ? (
          <p>No drafts saved yet.</p>
        ) : (
          drafts.map((draft) => (
            <div key={draft.id} className="draft-item">
              <h3>{draft.title || 'Untitled Draft'}</h3>
              <p>Saved at: {draft.savedAt}</p>
              <div className="draft-buttons">
                <button onClick={() => handleEditDraft(draft) }>Edit</button>
                <button onClick={() => handleDeleteDraft(draft.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Editor;

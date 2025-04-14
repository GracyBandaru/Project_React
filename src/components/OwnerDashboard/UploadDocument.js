import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import './UploadDocument.css';

function UploadDocument() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const token = localStorage.getItem('ownerToken');
      const formData = new FormData();
      formData.append('document', file);

      await axios.post(
        `http://localhost:5162/api/Owner/lease-agreements/${id}/document`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      navigate('/lease-agreements');
    } catch (err) {
      alert(`Failed to upload document: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-document">
      <h2>Upload Document</h2>
      <input 
        type="file" 
        accept=".pdf"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <button 
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? <FaSpinner className="spinner-icon" /> : 'Upload'}
      </button>
    </div>
  );
}

export default UploadDocument;
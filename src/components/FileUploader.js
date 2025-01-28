import React, { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../firebaseConfig"



const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file!");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      setUploadStatus("Uploading...");
      // Upload files to the server
      const app = initializeApp(firebaseConfig);
      const storage =  getStorage(app);    
      const storageRef = ref(storage,"/word-files/"+files.name)

      const metadata = {
        contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      };
      
      uploadBytes(storageRef,files,metadata).then(snap=>{
        console.log('Uploaded a blob or file!'+ snap.ref.fullPath);
      });

      setUploadStatus("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div>
      <h1>Upload DOCX Files</h1>
      <input type="file" multiple accept=".docx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUploader;
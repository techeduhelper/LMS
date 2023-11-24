import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotice } from "../redux/action/facultyAction";
import toast from "react-hot-toast";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

function FacultyNotices() {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (store.faculty.faculty.faculty.name) {
      setName(store.faculty.faculty.faculty.name);
      setUserId(store.faculty.faculty.faculty._id);
    } else {
      setName("");
      setUserId("");
    }
  }, [store.faculty.faculty.faculty.name]);

  const fileHandler = (e) => {
    const selectedFile = e.target.files.item(0);
    if (selectedFile && !ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setFileError("Unsupported file type. Please select a valid file type.");
      setFile(null);
    } else {
      setFile(selectedFile);
      setFileError("");
    }
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", file);
    formData.append("publisher", userId);
    formData.append("publisherName", name);

    try {
      await dispatch(addNotice(formData));
      setTitle("");
      setContent("");
      setFile(null);
      setFileError("");
    } catch (error) {
      toast.error("Error adding notice");
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-2'>
      <form
        onSubmit={handleAddNotice}
        encType='multipart/form-data'
        className='p-4 border border-gray-300 shadow-md rounded-md lg:max-w-4xl w-full lg:mx-auto mt-5'
      >
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-gray-700 font-semibold mb-2'
          >
            Subject:
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='content'
            className='block text-gray-700 font-semibold mb-2'
          >
            Content:
          </label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='file'
            className='block text-gray-700 font-semibold mb-2'
          >
            File:
          </label>
          <input
            type='file'
            id='file'
            name='file'
            onChange={fileHandler}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
          />
          {file && <p>Selected File: {file.name}</p>}
          {fileError && <div className='text-red-500 mt-2'>{fileError}</div>}
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600'
        >
          Add Notice
        </button>
        {errors && <div className='text-red-500 mt-2'>{errors}</div>}
      </form>
    </div>
  );
}

export default FacultyNotices;

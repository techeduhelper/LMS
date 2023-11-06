import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotice } from "../redux/action/facultyAction";

function FacultyNotices() {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

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
    if (e.target.files && e.target.files[0]) {
      let fi = e.target.files[0];
      setFile(fi);
    }
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();

    const noticeData = {
      title,
      content,
      file,
      publisher: userId,
      publisherName: name,
    };
    await dispatch(addNotice(noticeData));
  };

  return (
    <form
      onSubmit={handleAddNotice}
      encType='multipart/form-data'
      className='p-4 border border-gray-300 shadow-md rounded-md max-w-md mx-auto'
    >
      <div className='mb-4'>
        <label
          htmlFor='title'
          className='block text-gray-700 font-semibold mb-2'
        >
          Title:
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
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600'
      >
        Add Notice
      </button>
      {errors && <div className='text-red-500 mt-2'>{errors}</div>}
    </form>
  );
}

export default FacultyNotices;

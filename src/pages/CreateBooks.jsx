import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSnackbar} from 'notistack'

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imageURL, setImageURL] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSaveBook = async () =>{
    const book = {
      title,
      author,
      imageURL,
      description,
    };
    setLoading(true);
    await axios
      .post('http://localhost:5050/api/books', book)
      .then(response =>{
      setLoading(false);
      enqueueSnackbar('Book Added Successfully', { variant : 'success'})
      navigate('/');
      })
      .catch((err)=>{
        setLoading(false);
        enqueueSnackbar('Oops! Failed to add the book', { variant : 'error'})
        console.error(err.message)
      })

  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>CreateBooks</h1>

      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type = 'text'
            value = {title}
            onChange = {(e)=>setTitle(e.target.value)}
            className = 'border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type = 'text'
            value = {author}
            onChange = {(e)=>setAuthor(e.target.value)}
            className = 'border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Image URL:</label>
          <input
            type = 'text'
            value = {imageURL}
            onChange = {(e)=>setImageURL(e.target.value)}
            className = 'border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description:</label>
          <input
            type = 'text'
            value = {description}
            onChange = {(e)=>setDescription(e.target.value)}
            className = 'border-2 border-gray-500 px-4 py-2 w-full h-fit'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick = {handleSaveBook}> Save </button>
      </div>
    </div>
  )
}

export default CreateBooks
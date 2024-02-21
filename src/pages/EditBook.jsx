import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(' ');
  const [imageURL, setImageURL] = useState('')
  const [description, setDescription] = useState(' ');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();
  useEffect(()=>{
    setLoading(true);
    axios
      .get(`http://localhost:5050/api/books/${id}`)
      .then((res)=>{
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setImageURL(res.data.imageURL);
        setDescription(res.data.description);
        setLoading(false);
      })
      .catch((err)=>{
        setLoading(false);
        alert('An error occured! Please Check console')
        console.log(err)
      })
  },[])

  const handleEditBook = () =>{
    const book = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5050/api/books/${id}`, book)
      .then(()=>{
        setLoading(false);
        enqueueSnackbar('Book Edited Successfully', {variant: 'success'})
        navigate('/');
      })
      .catch((err)=>{
        setLoading(false);
        enqueueSnackbar('Oops! Error Occured', {variant: 'error'})
        console.error(err.message)
      })

  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>EditBook</h1>

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
        <button className='p-2 bg-sky-300 m-8' onClick = {handleEditBook}> Save </button>
      </div>
    </div>
  )
}

export default EditBook
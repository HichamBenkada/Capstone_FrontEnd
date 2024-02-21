import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  // console.log("line12_showBook",id); //id parameter checked
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5050/api/books/${id}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 ">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 m-auto">
          <div className="flex">
            <div className="my-4">
              <img
                className="w-25 h-40 rounded-lg m-10"
                src={book.imageURL}
                alt={book.title}
              />
            </div>
            <div className="m-10 p-5">
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Id</span>
                <span>{book._id}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Title</span>
                <span>{book.title}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Author</span>
                <span>{book.author}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Create time</span>
                <span>{new Date(book.createdAt).toString()}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">
                  Last update time
                </span>
                <span>{new Date(book.updatedAt).toString()}</span>
              </div>
            </div>
          </div>
          <p className="mt-4">Summary...:</p>
          <p className="my-2">{book.description}</p>
        </div>
      )}
    </div>
  );
};

export default ShowBook;

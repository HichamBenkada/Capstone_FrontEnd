import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, Navigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/Home/BooksTable";
import BooksCard from "../components/Home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5050/api/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <Link to='http://localhost:5173/'>
          <div className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg cursor-pointer">
            Client Interface
          </div>
        </Link>

        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Cards
        </button>
      </div>
      <div className="flex justify-between item-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className=" text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;

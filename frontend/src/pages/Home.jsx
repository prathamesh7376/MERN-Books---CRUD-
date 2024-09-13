import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://mern-books-crud-backend.onrender.com")
      .then((Response) => {
        setBooks(Response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full p-4 mx-auto">
      {/* Controls */}
      <div className="flex justify-center items-center gap-x-4 mb-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {/* Table or Card View */}
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

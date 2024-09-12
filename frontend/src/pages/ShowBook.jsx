import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <BackButton />
      <h1 className="text-4xl font-semibold my-6 text-center">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-md border border-gray-300 rounded-lg p-6">
          <div className="mb-4">
            <span className="text-lg font-medium text-gray-700">Id:</span>
            <span className="ml-2 text-gray-900">{book._id}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-medium text-gray-700">Title:</span>
            <span className="ml-2 text-gray-900">{book.title}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-medium text-gray-700">Author:</span>
            <span className="ml-2 text-gray-900">{book.author}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-medium text-gray-700">
              Publish Year:
            </span>
            <span className="ml-2 text-gray-900">{book.publishYear}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-medium text-gray-700">
              Create Time:
            </span>
            <span className="ml-2 text-gray-900">
              {new Date(book.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-medium text-gray-700">
              Last Updated Time:
            </span>
            <span className="ml-2 text-gray-900">
              {new Date(book.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;

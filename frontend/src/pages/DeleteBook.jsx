import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error occurred while deleting the book", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <BackButton />
      <h1 className="text-4xl font-semibold mb-6 text-center">Delete Book</h1>
      {loading ? <Spinner /> : null}
      <div className="bg-white shadow-lg border border-gray-300 rounded-lg w-full max-w-md p-6 mx-auto">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">
          Are you sure you want to delete this book?
        </h3>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-md w-full hover:bg-red-700 transition-colors"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;

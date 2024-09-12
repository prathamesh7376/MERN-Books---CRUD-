import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check the console.", {
          variant: "error",
        });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error occurred while editing the book", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <BackButton />
      <h1 className="text-4xl font-semibold mb-6 text-center">Edit Book</h1>
      {loading ? <Spinner /> : null}
      <div className="bg-white shadow-lg border border-gray-300 rounded-lg w-full max-w-3xl p-6">
        <div className="my-4">
          <label className="text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="my-4">
          <label className="text-lg font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="my-4">
          <label className="text-lg font-medium text-gray-700">
            Publish Year
          </label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
        </div>
        <button
          className="bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition-colors"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;

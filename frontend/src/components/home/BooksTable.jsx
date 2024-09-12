import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div className="w-full max-w-none overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-slate-300">
        <thead className="bg-gradient-to-r from-sky-400 to-sky-600 text-white">
          <tr>
            <th className="px-4 py-2 border border-slate-600 rounded-md">No</th>
            <th className="px-4 py-2 border border-slate-600 rounded-md">
              Title
            </th>
            <th className="px-4 py-2 border border-slate-600 rounded-md max-md:hidden">
              Author
            </th>
            <th className="px-4 py-2 border border-slate-600 rounded-md max-md:hidden">
              Publish Year
            </th>
            <th className="px-4 py-2 border border-slate-600 rounded-md">
              Operations
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="even:bg-sky-50 odd:bg-white hover:bg-sky-100 transition-colors duration-200"
            >
              <td className="px-4 py-2 border border-slate-700 text-center">
                {index + 1}
              </td>
              <td className="px-4 py-2 border border-slate-700 text-center">
                {book.title}
              </td>
              <td className="px-4 py-2 border border-slate-700 text-center max-md:hidden">
                {book.author}
              </td>
              <td className="px-4 py-2 border border-slate-700 text-center max-md:hidden">
                {book.publishYear}
              </td>
              <td className="px-4 py-2 border border-slate-700 text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-600 hover:text-green-800 transition-colors duration-200" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-500 hover:text-yellow-700 transition-colors duration-200" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-800 transition-colors duration-200" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Materi() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchData = async (page = 3, searchQuery = "") => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/data/materi?page=${page}&search=${searchQuery}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (!data) {
        localStorage.setItem("token", "");
        return navigate("/login");
      }
      const { materi, pages } = data;
      setData(materi);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching data:", error);
      localStorage.setItem("token", "");
      return navigate(0);
    }
  };

  useEffect(() => {
    fetchData(currentPage, search);
  }, [currentPage, search]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Materi</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Cari materi..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
        />
        {localStorage.getItem("user") === "siswa" ? (
          ""
        ) : (
          <button
            onClick={() => navigate("/Materi/add")}
            className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Tambahkan Materi
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center">
        {data.map((materi) => (
          <div
            key={materi.id_materi}
            className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6 h-72 overflow-hidden"
          >
            <div
              className="bg-white p-6 shadow rounded-md border h-full flex flex-col cursor-pointer"
              onClick={() => navigate(`/Materi/${materi.id_materi}`)}
            >
              <h3 className="text-indigo-600 font-bold text-lg mb-3">
                {materi.nama_materi}
              </h3>
              <p className="text-sm text-gray-600 break-words">
                {materi.konten}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-2">
            {[...Array(totalPages).keys()].map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === page + 1
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {page + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

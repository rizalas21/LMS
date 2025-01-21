import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [guruData, setGuruData] = useState({});
  const navigate = useNavigate();

  // Fetch data guru berdasarkan ID hanya sekali
  const getGuru = async (id) => {
    if (!guruData[id]) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/data/guru/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setGuruData((prev) => ({
          ...prev,
          [id]: response.data.nama_guru,
        }));
      } catch (error) {
        console.error(`Error fetching guru with ID ${id}:`, error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/data/program"
        );
        setData(data.program);
      } catch (error) {
        console.error("Error fetching program data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    data.forEach((program) => {
      getGuru(program.guru_id);
    });
  }, [data]);

  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-50">
      <div className="flex justify-between items-center bg-indigo-500 rounded p-6">
        <div className="w-4/5">
          <h1 className="text-2xl font-bold text-white">
            {data.length > 0 ? data[0].nama_program : "Loading..."}
          </h1>
          <p className="text-sm text-gray-200">
            {data.length > 0 ? data[0].deskripsi : "Loading..."}
          </p>
        </div>
        <div
          className="bg-white text-indigo-500 py-2 px-4 rounded-md cursor-pointer"
          onClick={() => navigate(`/Program/${data[0].id_program}`)}
        >
          Mulai Belajar
        </div>
      </div>

      {/* Daftar Program */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Program</h2>
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <div className="flex flex-wrap">
            {data.map((program) => (
              <div
                key={program.id_program}
                className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6"
              >
                <div className="bg-white p-6 shadow rounded-md border h-full flex flex-col justify-between">
                  <div className="">
                    <h3
                      className="text-white font-bold text-lg cursor-pointer bg-cover bg-center p-4 rounded-md h-20 flex items-center justify-center"
                      style={{
                        backgroundImage: `url('/images/background-programming.jpeg')`,
                      }}
                      onClick={() => navigate(`/Program/${program.id_program}`)}
                    >
                      {program.nama_program}
                    </h3>

                    <p className="text-sm text-gray-600 break-words">
                      {program.deskripsi}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    <strong>Pemateri: </strong>
                    {guruData[program.guru_id] || "Loading..."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Nilai Peserta */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Nilai Peserta
        </h2>
        <table className="w-full text-left bg-white shadow-md rounded-md border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-gray-600">Rank</th>
              <th className="py-3 px-4 text-gray-600">Nama</th>
              <th className="py-3 px-4 text-gray-600">Class</th>
              <th className="py-3 px-4 text-gray-600">Module</th>
              <th className="py-3 px-4 text-gray-600">Point</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-3 px-4">1</td>
              <td className="py-3 px-4">Parija Faiza</td>
              <td className="py-3 px-4">Pemrograman</td>
              <td className="py-3 px-4">L1</td>
              <td className="py-3 px-4">1,234 Point</td>
            </tr>
            <tr className="border-t">
              <td className="py-3 px-4">2</td>
              <td className="py-3 px-4">Arif Setiawan</td>
              <td className="py-3 px-4">Creative Marketing</td>
              <td className="py-3 px-4">L2</td>
              <td className="py-3 px-4">1,098 Point</td>
            </tr>
            <tr className="border-t">
              <td className="py-3 px-4">3</td>
              <td className="py-3 px-4">Siti Nurbaya</td>
              <td className="py-3 px-4">Management SDM</td>
              <td className="py-3 px-4">L3</td>
              <td className="py-3 px-4">950 Point</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;

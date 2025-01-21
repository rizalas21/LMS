import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PesertaEdit() {
  const { id } = useParams(); // Get the participant's ID from the URL params
  const navigate = useNavigate();

  // Form state
  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch peserta data when the component mounts
  useEffect(() => {
    const fetchPeserta = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/data/peserta/${id}`
        );
        const peserta = response.data; // Assuming the data is the participant itself
        setNama(peserta.nama_siswa);
        setNis(peserta.nis || "");
      } catch (error) {
        console.error("Error fetching peserta data:", error);
        setError("Error fetching data.");
      }
    };

    fetchPeserta();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      // Send the PUT request to update the peserta
      const response = await axios.put(
        `http://localhost:3000/api/data/peserta/${id}`,
        {
          nama_siswa: nama,
          nis: nis,
        }
      );

      if (response.status === 200) {
        // If successful, navigate to /peserta
        navigate("/Peserta");
      }
    } catch (error) {
      console.error("Error updating peserta:", error);
      setError("Failed to update participant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Peserta</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nama" className="block text-gray-600">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="nis" className="block text-gray-600">
            NIS
          </label>
          <input
            type="text"
            id="nis"
            value={nis}
            onChange={(e) => setNis(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        <div>
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

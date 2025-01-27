import axios from "axios";
import React, { useState, useEffect } from "react";

export default function DetailProfile() {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  let userrole = localStorage.getItem("user");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const role = userrole === "siswa" ? "peserta" : "guru";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: userData } = await axios.get(
          `http://localhost:3000/api/data/user/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("apa nihh : ", fetchProfile);

        console.log("Data User:", userData);
        const role = userData.role;

        const profileEndpoint = role === "guru" ? "guru" : "peserta";

        console.log("profile end point: ", profileEndpoint, id);

        const { data: profileData } = await axios.get(
          `http://localhost:3000/api/data/${profileEndpoint}/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setProfile(profileData);
      } catch (error) {
        console.log(error);
        console.error("Gagal mengambil data profil:", error);
      }
    };

    fetchProfile();
  }, [id, token]);

  console.log(profile);

  useEffect(() => {
    const fetchUser = async () => {
      if (profile) {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/api/data/user/${profile.user_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          console.log("data brO: ", data);

          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUser();
  }, [profile, token]);

  console.log(profile);

  if (!profile) {
    return <p>Loading profile data...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Details</h1>

      <button
        onClick={() => window.history.back()}
        className="bg-gray-500 text-white px-4 py-2 rounded-md mb-6"
      >
        Kembali
      </button>

      <div className="flex items-center space-x-6">
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
          <img
            src="/images/Defaultavatar.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-600">
            Personal Information
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              {role === "guru" ? (
                <div className="flex gap-2">
                  <strong>Nama Guru:</strong>
                  <p>{profile.nama_guru}</p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <strong>Nama Peserta:</strong>
                  <p>{profile.nama_siswa}</p>
                </div>
              )}
            </li>
            <li>
              {role === "guru" ? (
                <div className="flex gap-2">
                  <strong>NIP:</strong>
                  <p>{profile.nip}</p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <strong>NIS:</strong>
                  <p>{profile.nis}</p>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>

      {user && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-600">
            User Information
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>Role:</strong> {user.role}
            </li>
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-600">
          Program Information
        </h2>
        {role === "guru"
          ? profile.program.map((prog) => (
              <ul className="mt-4 space-y-2">
                <li key={prog.id_program}>
                  <strong>Nama Program:</strong> {prog.nama_program}
                </li>
                <li>
                  <strong>Deskripsi Program:</strong>
                  <p>{profile.program[0].deskripsi}</p>
                </li>
              </ul>
            ))
          : ""}
      </div>
    </div>
  );
}

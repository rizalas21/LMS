import React, { useState } from "react";

export default function Profile({ setIsShow }) {
  return (
    <div
      className="fixed top-0 right-0 h-full w-1/5 bg-white shadow-lg z-50 transition-transform duration-300"
      style={{
        transform: setIsShow ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <div className="flex flex-col p-4 h-full">
        {/* Close Button */}
        <button
          className="text-gray-500 self-end text-2xl"
          onClick={() => setIsShow(false)}
        >
          &times;
        </button>

        <div className="mt-4">
          <img
            src="/path-to-profile-picture.jpg"
            alt="Profile"
            className="rounded-full mx-auto w-24 h-24 object-cover border"
          />
          <h2 className="text-center text-lg font-semibold mt-4">
            Nama Pengguna
          </h2>
          <p className="text-center text-gray-500">email@domain.com</p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <button className="py-2 px-4 bg-indigo-500 text-white rounded-md">
            Edit Profile
          </button>
          <button className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  faChartBar,
  faBook,
  faUsers,
  faComments,
  faUser,
  faGear,
  faCalendar,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const guruPages = [
  { title: "Dashboard", url: "/Dashboard", icon: faChartBar },
  { title: "Materi", url: "/Materi", icon: faBook },
  { title: "Peserta", url: "/Peserta", icon: faUsers },
  { title: "Grup Chat", url: "/Grup-Chat", icon: faComments },
  { title: "Pemateri", url: "/Pemateri", icon: faUser },
];

const pesertaPages = [
  { title: "Dashboard", url: "/Dashboard", icon: faChartBar },
  { title: "Materi", url: "/Materi", icon: faBook },
  { title: "Grup Chat", url: "/Grup-Chat", icon: faComments },
  { title: "Pemateri", url: "/Pemateri", icon: faUser },
];

const labels = [
  { title: "Settings", url: "/Settings", icon: faGear },
  { title: "Kalender", url: "/Kalender", icon: faCalendar },
];

const Menu = (isShow, setIsShow) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-indigo-950 text-white fixed top-[72px] bottom-0 flex flex-col">
      <div className="flex-1 p-4 h-auto">
        <nav className="mb-6 border-white border-b pb-3">
          <ul className="space-y-2">
            {localStorage.getItem("user") === "guru" ||
            localStorage.getItem("user") === "admin"
              ? guruPages.map((appPage, index) => (
                  <li key={index}>
                    <Link
                      to={appPage.url}
                      className={`group flex items-center gap-3 p-3 rounded-lg text-sm transition ${
                        location.pathname === appPage.url
                          ? "bg-white text-indigo-950"
                          : "hover:bg-white hover:text-indigo-950"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={appPage.icon}
                        className={`w-5 h-5 transition ${
                          location.pathname === appPage.url
                            ? "text-indigo-950"
                            : "text-white group-hover:text-indigo-950"
                        }`}
                      />
                      <span>{appPage.title}</span>
                    </Link>
                  </li>
                ))
              : pesertaPages.map((appPage, index) => (
                  <li key={index}>
                    <Link
                      to={appPage.url}
                      className={`group flex items-center gap-3 p-3 rounded-lg text-sm transition ${
                        location.pathname === appPage.url
                          ? "bg-white text-indigo-950"
                          : "hover:bg-white hover:text-indigo-950"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={appPage.icon}
                        className={`w-5 h-5 transition ${
                          location.pathname === appPage.url
                            ? "text-indigo-950"
                            : "text-white group-hover:text-indigo-950"
                        }`}
                      />
                      <span>{appPage.title}</span>
                    </Link>
                  </li>
                ))}
          </ul>
        </nav>
        {/* Profile Section */}
        <div className="pb-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Profile
          </h3>
          <ul className="space-y-2">
            {labels.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.url}
                  className={`group flex items-center gap-3 p-3 rounded-lg text-sm transition ${
                    location.pathname === item.url
                      ? "bg-white text-indigo-950"
                      : "hover:bg-white hover:text-indigo-950"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`w-5 h-5 transition ${
                      location.pathname === item.url
                        ? "text-indigo-950"
                        : "text-white group-hover:text-indigo-950"
                    }`}
                  />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Logout Button */}
      <div className="px-4 py-3 border-t border-white">
        <button
          className="group w-full flex items-center gap-3 p-3 rounded-lg text-sm transition hover:bg-white hover:text-indigo-950"
          onClick={() => {
            localStorage.setItem("token", "");
            localStorage.setItem("user", "");
            navigate(0);
          }}
        >
          <FontAwesomeIcon
            className="w-5 h-5 transition group-hover:text-indigo-950"
            icon={faSignOut}
          />
          <p>Log Out</p>
        </button>
      </div>
    </div>
  );
};

export default Menu;

import {
  faBell,
  faEnvelope,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  return (
    <div className="bg-indigo-950 flex justify-around items-center p-4 z-50 fixed w-screen border-b border-white">
      <img
        src="/images/logo_adhivasindo.png"
        alt="Logo"
        className="w-[10%] h-10"
      />
      <span className="text-white text-xl font-semibold">
        Learning Management System
      </span>

      <div className="flex bg-white w-3/12 justify-between rounded">
        <button className="text-black ml-2">
          <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
        </button>
        <input
          placeholder="Search class..."
          className="w-[90%] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none focus:outline-none focus:ring-0 focus:shadow-none"
        />
      </div>
      <div className="flex w-1/12 justify-around">
        <button className="text-white">
          <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
        </button>
        <button className="text-white">
          <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

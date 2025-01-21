import "./App.css";
import Menu from "./component/Menu";
import Navbar from "./component/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Materi from "./pages/Materi";
import Peserta from "./pages/Peserta";
import GroupChat from "./pages/GroupChat";
import Guru from "./pages/Guru";
import Settings from "./pages/Settings";
import Kalender from "./pages/Kalender";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import DetailMateri from "./pages/MateriEdit";
import MateriDetail from "./pages/MateriDetail";
import MateriAdd from "./pages/MateriAdd";
import MateriEdit from "./pages/MateriEdit";
import PesertaEdit from "./pages/PesertaEdit";
import DetailProfile from "./pages/DetailProfile";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  const [isShow, setIsShow] = useState(false);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="*" element={<Navigate to="/Login" replace />} />
          </>
        ) : (
          <Route
            path="*"
            element={
              <AuthenticatedLayout isShow={isShow} setIsShow={setIsShow}>
                <Routes>
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/Materi" element={<Materi />} />
                  <Route path="/Materi/:id" element={<MateriDetail />} />
                  <Route path="/Materi/Add" element={<MateriAdd />} />
                  <Route path="/Materi/edit/:id" element={<MateriEdit />} />
                  <Route path="/Peserta" element={<Peserta />} />
                  <Route path="/Peserta/edit/:id" element={<PesertaEdit />} />
                  <Route path="/Grup-Chat" element={<GroupChat />} />
                  <Route path="/Pemateri" element={<Guru />} />
                  <Route path="/Setting" element={<Settings />} />
                  <Route path="/Kalender" element={<Kalender />} />
                  <Route path="/Profile/:id" element={<DetailProfile />} />

                  <Route
                    path="*"
                    element={<Navigate to="/Dashboard" replace />}
                  />
                </Routes>
              </AuthenticatedLayout>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

function AuthenticatedLayout({ children, isShow, setIsShow }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Menu isShow={isShow} setIsShow={setIsShow} />
        <main className="flex-grow mt-16 ml-64 p-6 bg-white shadow-lg rounded-lg h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

export default App;

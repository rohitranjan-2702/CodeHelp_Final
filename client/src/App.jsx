import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Doubt from "./page/Doubt";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import DoubtRender from "./page/DoubtRender";
import Profile from "./page/Profiletut";
import Profilestudent from "./page/Profilestudent";
import Pricing from "./component/Pricing";
import { LoginContext } from "./contexts/LoginContext";
import ProtectedRoutes from "./component/ProtectedRoute";
import ProtectedStudRoutes from "./component/ProtectedStudRoute";
import ProtectedTeachRoutes from "./component/ProtectedTeachRoute";
import Signuptut from "./page/Signuptut";
import Feedbackpage from "./component/Feedbackpage";
import TutorLogin from "./page/TutorLogin";
import StudentDoubt from "./page/StudentDoubt";
import TeacherDoubt from "./page/TeacherDoubt";
import VideoComponent from "./component/VideoComponent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("user"))?.isAuthed || false
  );
  const [userSkills, setUserSkills] = useState(
    JSON.parse(localStorage.getItem("user"))?.name || ""
  );
  const [userEdu, setUserEdu] = useState(
    JSON.parse(localStorage.getItem("user"))?.name || ""
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("user"))?.id || ""
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("user"))?.name || ""
  );
  const [userEmail, setUserEmail] = useState(
    JSON.parse(localStorage.getItem("user"))?.email || ""
  );
  const [userType, setUserType] = useState(
    JSON.parse(localStorage.getItem("user"))?.type || ""
  );
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
  };
  return (
    <BrowserRouter>
      <LoginContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          userSkills,
          setUserSkills,
          userEdu,
          setUserEdu,
          userName,
          setUserName,
          userEmail,
          setUserEmail,
          userType,
          setUserType,
          userId,
          setUserId,
          logout,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tutor/login" element={<TutorLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signuptut" element={<Signuptut />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<ProtectedStudRoutes />}>
              <Route path="/profilestudent" element={<Profilestudent />} />
              {/* <Route path="/doubt" element={<Doubt />} /> */}
              <Route path="/doubt" element={<StudentDoubt />} />
              <Route path="/feedback" element={<Feedbackpage />} />
            </Route>
            <Route element={<ProtectedTeachRoutes />}>
              <Route path="/profileteacher" element={<Profile />} />
              {/* <Route path="/doubtSection" element={<DoubtRender />} /> */}
              <Route path="/doubtSection" element={<TeacherDoubt />} />
            </Route>
            <Route path="/pricing" element={<Pricing />} />
          </Route>
          <Route path="/video" element={<VideoComponent />} />
        </Routes>
        {/* <Feedbackpage /> */}
        <Footer />
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;

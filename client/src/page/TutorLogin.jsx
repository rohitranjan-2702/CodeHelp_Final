import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

const def = {
  email: "",
  password: "",
};

const TutorLogin = () => {
  const [loginstate, setLoginState] = useState(def);
  const { setUserName, setUserEmail, setUserSkills, setUserEdu, setIsLoggedIn, setUserType, setUserId } = useContext(LoginContext);
  const navigate = useNavigate();

  const inputChange = (e) => {
    setLoginState({ ...loginstate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", loginstate.email);
    urlencoded.append("password", loginstate.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://65.0.30.70:5000/teacher/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setIsLoggedIn(true);
        setUserName(result.name);
        setUserType(result.type);
        setUserId(result._id);
        setUserEmail(result.email);
        setUserSkills(result.skills);
        setUserEdu(result.education);
        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: result._id,
            name: result.name,
            isAuthed: true,
            type: result.type,
            email: result.email
          })
        );
        navigate("/profileteacher");
      })
      .catch((error) => console.log("error", error));

    // setLoginState(def);
  };
  return (
    <>
      <div className="m-0 flex h-[550px] max-w-full items-center justify-center rounded-md bg-slate-200">
        <div className="md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px]">
          <h2 className="mb-4 text-2xl font-semibold ">LOGIN AS A TUTOR</h2>

          <form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="name@gmail.com"
                required
                onChange={(e) => inputChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                onChange={(e) => inputChange(e)}
              />
            </div>
            <div className="mb-6"></div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TutorLogin;

import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { LoginContext } from "../contexts/LoginContext";

const socket = io.connect("http://43.204.36.222:4000");

function StudentDoubt() {
  const studentId = JSON.parse(localStorage.getItem("user")).id;
  const authToken = localStorage.getItem("token");
  const [question, setQuestion] = useState("");
  const resultRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("studentConnected", { studentId });

    socket.on("moveToCall", async (payload) => {
      if (studentId !== payload.studentId) {
        console.log(
          `studentId: ${studentId}, questionId: ${payload.studentId}`
        );
        throw new Error("questionid != studentid");
      }
      console.log(`question answered ${JSON.stringify(payload)}`);
      resultRef.current.innerText = "Video call opening...";
      await handleMoveToCall(payload.teacherId, payload.studentId);
      navigate("/video");
    });
  });
  const handleMoveToCall = async (teacherId, studentId) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("teacherId", teacherId);
    urlencoded.append("studentId", studentId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const result = await fetch(
      "http://65.0.30.70:5000/agora/CallCredentials",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log("error", error));

    console.log(result);
    localStorage.setItem("video", JSON.stringify(result));
    return { result };
  }; //TODO: handle it

  const sendQuestion = (e) => {
    e.preventDefault();
    socket.emit("questionAsked", { question, studentId });
    setQuestion("");
    resultRef.current.innerText = "Waiting for tutors to accept...";
  };

  return (
    <>
      <div className="flex justify-center text-4xl p-6 font-semibold">
        ASK YOUR DOUBT
      </div>
      <div className="flex justify-center w-full p-6">
        <header
          className="App-header border-black bg-slate-200 rounded-2xl p-12 shadow-xl"
          ref={resultRef}
        >
          <form onSubmit={sendQuestion}>
            <input
              className="border-black rounded-lg p-4 m-4"
              type="text"
              name="chat"
              placeholder="type question"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
            <button
              type="submit"
              className=" rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            >
              ASK
            </button>
          </form>
        </header>
      </div>
    </>
  );
}

export default StudentDoubt;

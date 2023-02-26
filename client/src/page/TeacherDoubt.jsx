import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io.connect("http://43.204.36.222:4000");

function TeacherDoubt() {
  const teacherId = JSON.parse(localStorage.getItem("user")).id;
  const authToken = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("teacherOnline", { teacherId });

    socket.on("removeQuestion", async (payload) => {
      const studentId = payload.studentId;
      console.log(` ${studentId} question answered by someone else`);
      setQuestions([
        ...questions.filter((questionObj) => {
          if (questionObj.studentId === studentId) {
            return false;
          }
        }),
      ]);
    });

    socket.on("moveToCall", async (payload) => {
      const studentId = payload.studentId;
      const teacherId = payload.teacherId;
      console.log(`question answered ${studentId} ${teacherId}`);
      await handleMoveToCall(studentId, teacherId);
      navigate("/video");
    });

    socket.on("questionAvailable", (payload) => {
      const studentId = payload.studentId;
      const question = payload.question;

      setQuestions([...questions, { studentId, question }]);
    });

    return () => {
      socket.emit("teacherOffline");
    };
  });

  const handleMoveToCall = async (studentId, teacherId) => {
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

  const handleAnswer = (e, studentId) => {
    e.preventDefault();
    socket.emit("questionAccepted", { studentId, teacherId });
    setQuestions([]);
  }; //TODO: handle it

  const handleDecline = (e, studentId) => {
    e.preventDefault();
    setQuestions(
      questions.filter((question) => {
        if (question.studentId === studentId) {
          return false;
        }
      })
    );
  }; //TODO: handle it

  return (
    <>
      <div className="App h-full w-full p-6">
        <div className="flex justify-center text-4xl p-6 font-semibold">
          LIVE DOUBTS
        </div>
        <div className="flex justify-center">
          {/* <h3 className="text-4xl text-black font-semibold m-4">Incoming Doubts</h3> */}
          <div className="App-header w-1/2 bg-slate-300 p-12">
            {questions.map((questionObj) => {
              return (
                <div className="flex justify-center">
                  <div
                    className="question http://localhost:56954/ p-10 flex-col border bg-slate-900 rounded-xl m-1"
                    key={questionObj.studentId}
                    studentId={questionObj.studentId}
                  >
                    <div className="text-white p-2 pl-0">Question:</div>
                    <textarea
                      className="p-4 rounded-xl"
                      type="text"
                      name="chat"
                      placeholder="type question"
                      value={questionObj.question}
                      readOnly={true}
                    />
                    <div className="flex mt-2">
                      <button
                        className="bg-green-500 text-white p-2 m-2 w-24 rounded-full "
                        onClick={(e) => handleAnswer(e, questionObj.studentId)}
                      >
                        Answer
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 m-2 ml-0 w-24 rounded-full"
                        onClick={(e) => handleDecline(e, questionObj.studentId)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDoubt;

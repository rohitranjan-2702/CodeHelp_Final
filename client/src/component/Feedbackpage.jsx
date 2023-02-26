import React from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useNavigate } from "react-router-dom";
const Feedbackpage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div class="m-10">
        <p
          for="message"
          class=" pb-4 font-bold mb-2 text-sm  text-gray-900 dark:text-white flex justify-center  "
        >
          Feedback
        </p>
        <p class="flex justify-center font-bold">Rate Your Tutor</p>

        <div class="flex justify-center text-5xl text-amber-400 mb-4">
          <Rater total={5} rating={2} />
        </div>
        <div class="flex justify-center">
          <button
            type="button"
            class="align-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              alert("Rating submitted");
              navigate("/profilestudent");
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Feedbackpage;

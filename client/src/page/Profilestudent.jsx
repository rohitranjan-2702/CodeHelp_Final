import React, { useContext, useEffect } from "react";
import Pricing from "../component/Pricing";
import { LoginContext } from "../contexts/LoginContext";

const Profilestudent = () => {
  const { userName } = useContext(LoginContext);
  const { userEmail } = useContext(LoginContext);
  const { user } = useContext(LoginContext);

  // useEffect( (e) => {
  // var requestOptions = {
  //   method: "GET",
  //   redirect: "follow",
  // };

  // fetch("http://65.0.30.70:5000/user/profile", requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => console.log("error", error));

  // });

  return (
    <>
      <div class="flex h-screen items-center justify-center mt-4">
        <div class="w-screen m-10 mt-0 rounded-2xl border bg-slate-100">
          <div class="m-8 mb-0 h-[80px] w-[80px] rounded-full bg-red-400">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="img"
              class="rounded-full p-1"
            />
          </div>
          <div class="ml-8 mt-3 font-medium text-black">{userName}</div>
          <div class="flex flex-wrap items-center justify-center w-full">
            <div class="m-4 flex justify-center p-4 bg- w-full">
              <div class="rounded-3xl border w-full p-10 m-4 text-black shadow-xl">
                <p class="mb-3">Email: {userEmail}</p>
                <p class="mb-3">Doubt left: 10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pricing />
    </>
  );
};

export default Profilestudent;

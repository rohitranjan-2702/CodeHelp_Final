import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src="https://res.cloudinary.com/dlmgrochr/image/upload/v1677309948/image-removebg-preview_11_cxupug.png"
            />
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Solve your coding doubts at one click
            </h1>
            <p class="mb-8 leading-relaxed">
              Expert tutors are live 24/7 to help you out and make learning more
              easy. Top techs included like REACTJS, NEXTJS and many more...
            </p>
            <div class="flex justify-center">
              <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

<section class="text-gray-100 body-font lg:m-10 m-6 border-black rounded-2xl bg-slate-200">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
      <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Want to help hundreds of student out there, become a tutor at CodeHelp.</h1>
      <button onClick={() => navigate("/signuptut")} class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg sm:mt-0 m-3">SignUp as a Tutor</button>
      <button onClick={() => navigate("/tutor/login")} class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg sm:mt-0 m-3">Login</button>
    </div>
  </div>
</section>

    </>
  );
};

export default Home;

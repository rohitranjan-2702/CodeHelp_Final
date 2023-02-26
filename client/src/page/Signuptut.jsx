import React, { useState,useContext } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"; 
const options = [
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JAVASCRIPT", value: "javascript" },
  { label: "REACTJS", value: "reactjs" },
  { label: "NODEJS", value: "nodejs" },
  { label: "FIREBASE", value: "firebase" },
  // { label: "JAVASCRIPT", value: "strawberry", disabled: true },
];

const def = {
  name: "",
  email: "",
  password: "",
  skill:[],
  education:"",
  
  
 
};

const Signuptut = () => {
  const [selected, setSelected] = useState([]);
 
    const ashu=selected.map((e)=>{
     return e.value;
    })
  
  //console.log(selected);
  const [signstate, setSignState] = useState(def);
  const { setUserName, setIsLoggedIn, setUserType } = useContext(LoginContext);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignState({ ...signstate, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //
    var urlencoded = new URLSearchParams();
    urlencoded.append("name", signstate.name);
    urlencoded.append("email", signstate.email);
    urlencoded.append("password", signstate.password);
    urlencoded.append("skills", ashu);
    urlencoded.append("education", signstate.education);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://65.0.30.70:5000/teacher/register", requestOptions)
      .then((response) => {
        // if (response.status !== 200) {
        //   throw new Error("something went wrong");
        // }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setIsLoggedIn(true);
        setUserName(result.name);
        setUserType(result.type);
        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: result.name,
            isAuthed: true,
            type: result.type,
          })
        );
        navigate("/profileteacher");
      })
      .catch((error) => console.log("error", error));

    setSignState(def);
  };

  
  return (
    <>
      <div class="flex justify-center">
        <div class="w-1/2 m-10 p-5 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <p class="flex justify-center font-bold text-4xl">Tutor SignUp</p>
          <p class="m-5">Enter Your Fname</p>
          <input
           type="name"
                name="name"
                id="floating_name"
            class=" w-full p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            placeholder="First name"
            onChange={(e) => onInputChange(e)}
          />
          <p class="m-5">Education</p>
          <input
            type="education"
                name="education"
                id="floating_education"
            class="w-full  p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            placeholder="education"
            onChange={(e) => onInputChange(e)}
          />
          <p class="m-5">Enter Email</p>
          <input
           
            type="email"
                name="email"
                id="floating_email"
            class="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            placeholder="email Id"
            onChange={(e) => onInputChange(e)}
          />

          <div className="mt-4">
            <label for="comment" class="text-lg font-semibold ml-6  ">
              Techstack
            </label>
            <pre className="hidden">{JSON.stringify(selected)}</pre>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select Tags"
              hasSelectAll={false}
            />
          </div>
         
 <div className="group relative z-0 mb-6 w-full">
 <p class="m-5">Password</p>
              <input
                type="password"
                name="password"
                id="floating_password"
                class="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                placeholder=" "
                required
                onChange={(e) => onInputChange(e)}
                // onChange={(e) => onInputChange(e)}
              />
             
                
              
            </div>
            <div class="flex justify-center">
               <button onClick={(e) => {
                handleSubmit(e);
              }} type="button" class=" mt-5 align-center text-white bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SignUp as a Tutor</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Signuptut;

import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JAVASCRIPT", value: "javascript" },
  { label: "REACTJS", value: "reactjs" },
  { label: "NODEJS", value: "nodejs" },
  { label: "FIREBASE", value: "firebase" },
  // { label: "JAVASCRIPT", value: "strawberry", disabled: true },
];

const Doubt = () => {
  const [selected, setSelected] = useState([]);

  return (
    <>
    <h1 class="flex justify-center mt-10 mb-10 font-bold text-4xl flex-wrap">Ask your Doubt</h1>
<form>
  <div class="w-1/2 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 m-auto mt-12 mb-20">
      <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label for="comment" class="text-lg font-semibold">Your Question</label>
          {/* <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 border-black " placeholder="Write your Question..." required></textarea> */}
          <textarea id="chat" rows="1" class="block p-2.5 mt-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your Question..."></textarea>
          <div className="mt-4">
            <label for="comment" class="text-lg font-semibold mb-2">Techstack</label>
                <pre className="hidden">{JSON.stringify(selected)}</pre>
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select Tags"
                    hasSelectAll={false}
                />
        </div>
        
<label class="block px-4 py-2 mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input class="block w-full text-sm p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>


      </div>
      <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            ASK
          </button>
          <div class="flex pl-0 space-x-1 sm:pl-2">
              
              <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Upload image</span>
              </button>
          </div>
          <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              ASK
            </button>
           </div>
        </div>
        </div>
      </form>
    </>
  );
};

export default Doubt;

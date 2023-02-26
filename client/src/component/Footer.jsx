import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-[#e9e9e9] antialiased">
      <div className="mx-auto px-16 py-20">
        <div className="mt-8 grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex items-center justify-center">
            <img
              className="object-contain object-center h-6 mr-3 sm:h-16"
              src="https://res.cloudinary.com/dlmgrochr/image/upload/v1677308464/image-removebg-preview_10_ewg8zc.png"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-4 text-black">
              &copy; 2023 codeHelp All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ul className="flex items-center justify-center gap-x-4">
              <li className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </div>
              </li>
              <li className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="4.983" cy="5.009" r="2.188"></circle>
                    <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path>
                  </svg>
                </div>
              </li>
              <li className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </>
  )
};

export default Footer
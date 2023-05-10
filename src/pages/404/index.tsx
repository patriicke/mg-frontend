import React from "react";
import { Link } from "react-router-dom";
// import errorImage from "./errorImage.png"; // Replace with your own image

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {/* <img src={errorImage} alt="Error 404" className="w-48 mb-10" /> */}
      <h1 className="text-4xl font-bold mb-4">Oops! Page not found</h1>
      <p className="text-lg mb-8">
        The page you're looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md transition duration-300 hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
};

// read all svg files from path public/assets/crypto/color and make me json with name (excluding .svg) and path to svg
let svgJson = {
}

export default NotFoundPage;

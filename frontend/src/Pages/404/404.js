import React, { useEffect } from "react";

const Error404Page = () => {
  useEffect(() => {
    const randomNum = () => Math.floor(Math.random() * 9) + 1;
    let loop1, loop2, loop3;
    let i = 0;
    const time = 30;
    const selector3 = document.querySelector(".thirdDigit");
    const selector2 = document.querySelector(".secondDigit");
    const selector1 = document.querySelector(".firstDigit");

    loop3 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop3);
        selector3.textContent = 4;
      } else {
        selector3.textContent = randomNum();
        i++;
      }
    }, time);

    loop2 = setInterval(() => {
      if (i > 80) {
        clearInterval(loop2);
        selector2.textContent = 0;
      } else {
        selector2.textContent = randomNum();
        i++;
      }
    }, time);

    loop1 = setInterval(() => {
      if (i > 100) {
        clearInterval(loop1);
        selector1.textContent = 4;
      } else {
        selector1.textContent = randomNum();
        i++;
      }
    }, time);

    return () => {
      clearInterval(loop1);
      clearInterval(loop2);
      clearInterval(loop3);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <div className="relative">
        <div className="flex justify-center items-center mt-24">
          <div className="transform -skew-x-12">
            <div className="relative shadow-md">
              <span className="digit thirdDigit bg-blue-500 text-white rounded-full w-36 h-36 flex items-center justify-center text-6xl font-bold"></span>
            </div>
          </div>
          <div className="transform -skew-x-12">
            <div className="relative shadow-md">
              <span className="digit secondDigit bg-blue-500 text-white rounded-full w-36 h-36 flex items-center justify-center text-6xl font-bold"></span>
            </div>
          </div>
          <div className="transform -skew-x-12">
            <div className="relative shadow-md">
              <span className="digit firstDigit bg-blue-500 text-white rounded-full w-36 h-36 flex items-center justify-center text-6xl font-bold"></span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 bg-gray-800 text-white text-2xl font-semibold px-4 py-2 rounded-full">
          OH!
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-700 mt-8">
        Sorry! Page not found
      </h2>
    </div>
  );
};

export default Error404Page;

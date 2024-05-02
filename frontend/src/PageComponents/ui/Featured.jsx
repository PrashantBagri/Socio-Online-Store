import React from "react";

function Featured() {
  return (
    <>
    <section className=" ">
    <h1 className="text-8xl font-spartan font-semibold text-center my-12">
        ✨Be Socio✨
      </h1>
      <div className="grid md:grid-cols-3 md:grid-rows-2 grid-rows-4  gap-4 mx-4 md:h-[100vh] h-[300vh] mb-[200px]">
        <span className="md:row-span-2   border-4 border-black rounded-xl overflow-clip relative">
          <button className="absolute px-8 py-3 font-spartan border-gray-100 backdrop-blur-lg right-[50%] top-[50%] bg-black/10 text-white text-xl rounded-full">
            Be Stealthy🦹
          </button>
          <img
            className="h-full w-full object-cover"
            src="featured/Featured1.png"
            alt=""
          />
        </span>
        <span className="md:row-span-2   border-4 border-black rounded-xl overflow-clip relative">
          <button className="absolute px-8 py-3 font-spartan border-gray-100 backdrop-blur-lg right-[50%] top-[50%] bg-black/10 text-white text-xl rounded-full">
            Be Dope😎
          </button>
          <img
            className=" h-full w-full object-cover"
            src="featured/Featured2.png"
            alt=""
          />
        </span>
        <span className="rounded-xl overflow-clip border-4 border-black relative">
          <button className="absolute px-8 py-3 font-spartan border-gray-100 backdrop-blur-lg right-[50%] top-[50%] bg-black/10 text-white text-xl rounded-full">
            Be Funky🎉
          </button>
          <img
            className="h-full w-full object-cover"
            src="featured/Featured3.png"
            alt=""
          />
        </span>
        <span className=" rounded-xl overflow-clip border-4 border-black relative">
          <button className="absolute px-8 py-3 font-spartan border-gray-100 backdrop-blur-lg right-[50%] top-[50%] bg-black/10 text-white text-xl rounded-full">
            Be Cool🥶
          </button>
          <img
            className="h-full w-full object-cover object-top  "
            src="featured/Featured4.png"
            alt=""
          />
        </span>
      </div>
    </section>
      
    </>
  );
}

export default Featured;

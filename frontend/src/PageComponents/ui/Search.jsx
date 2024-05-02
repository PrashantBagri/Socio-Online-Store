import React, { useState, useEffect, useRef } from "react";
import { RiSearchLine } from "react-icons/ri";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

function Search() {
  const [searchBar, setSearchBar] = useState(false);
  const searchRef = useRef();
  const resultRef = useRef();
  const searchBtnRef = useRef()
  const inputRef = useRef();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();

  useEffect(() => {
    if (query) {
      const searchProducts = async (query) => {
        const response = await axios.post(`/products/search?q=${query}`, null);
        setResult(response.data.data);
      };
      searchProducts(query);
    }

  }, [query]);

  useEffect(()=>{
    const handleClick=(e)=>{
      if(!searchRef.current.contains(e.target) && e.target!==searchBtnRef.current && !searchBtnRef.current.contains(e.target)){
        setSearchBar(false)
        setQuery("")
      }
      
    }

    window.addEventListener('click', handleClick )

    return ()=>{
      window.removeEventListener('click', handleClick)
    }
  }, [searchBar])

  const handleSearchBar = () => {
    setSearchBar((prev) => !prev);
    inputRef.current.focus()
  };

  const handleSearchResult = () =>{
    if(searchBar){
      setSearchBar(false); 
      setQuery("");
      
    }else {
      setSearchBar(true) 
    }
  }


  return (
    <>
      <span
      ref={searchBtnRef}
        onClick={handleSearchBar}
        className={`bg-[#3b3c36] text-white p-5  transition-[width] duration-300 h-[3.75vw] cursor-pointer   flex gap-2 items-center w-[3.75vw] rounded-full absolute right-44 z-50`}
      >
        <RiSearchLine/>
      </span>

      <div ref={searchRef}>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`absolute font-spartan text-base right-44 bg-[#3b3c36] text-white p-5  transition-[width] duration-300 h-[3.75vw] ${
          searchBar ? "w-[20vw] " : "w-[3.75vw] "
        } rounded-full cursor-pointer  flex gap-2 items-center after:content-["*"]`}
      ></input>
      <span
        ref={resultRef}
        className={`${
          result?.length && query ? "block" : "hidden"
        } text-white border-2 border-black rounded-lg absolute right-44 top-24 z-50 h-fit w-[30vw] bg-[#3b3c36] flex flex-col gap-2`}
      >
        {result?.map((product) => {
          return (
            <Link
            onClick={handleSearchResult}
              key={product._id}
              className="mx-2 py-4 h-fit  border-b-2 border-b-primary-background font-spartan "
              to={`/products/${product._id}`}
            >
              <span>{product.name}</span>
            </Link>
          );
        })}
      </span>
      </div>
    </>
  );
}

export default Search;

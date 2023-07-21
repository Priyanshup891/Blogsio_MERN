import React, { useEffect, useState } from "react";
import "./searchpage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card";

const SearchPage = () => {
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    const getSearchedBlog = async () => {
      const responce = await axios.get(
        `https://blogsio-mern.onrender.com/api/blog/search/${query}`
      );
      setSearchedBlogs(responce.data);
    };

    getSearchedBlog();
  }, [query]);

  return (
    <div className="searchPageWrapper">
      {searchedBlogs.map((blog, index) => (
        <Card blog={blog} key={index} />
      ))}
    </div>
  );
};

export default SearchPage;

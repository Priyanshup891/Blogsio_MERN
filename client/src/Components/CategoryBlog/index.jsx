import React, { useEffect, useState } from "react";
import "./categoryblog.css";
import Card from "../Card";
import axios from "axios";

const CategoryBlog = ({ selectCategory }) => {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const responce = await axios.get(`http://localhost:8800/api/blog/`);
      setBlogs(responce.data);
    };

    getBlogs();
  }, []);

  useEffect(() => {
    if (selectCategory === "all") {
      setFiltered(blogs);
    } else {
      const filterBlog = blogs.filter((blog) =>
        blog.category.includes(selectCategory)
      );
      setFiltered(filterBlog);
    }
  }, [blogs, selectCategory]);

  return (
    <div className="categoryBlogWrapper">
      {filtered.map((blog, index) => (
        <Card blog={blog} key={index} />
      ))}
    </div>
  );
};

export default CategoryBlog;

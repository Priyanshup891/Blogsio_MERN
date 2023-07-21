import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Card = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog._id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <div className="card">
        <div className="cardImage">
          <img src={blog.blog_image.url} alt="blog_image" />
        </div>
        <div className="cardContent">
          <span className="cardCategoryTime">
            {blog.category} - {format(blog.createdAt)}
          </span>
          <h3 className="cardTitle">{blog.title}</h3>
          <p className="cardSummery">{blog.summery.split(10)}</p>
        </div>
        <div className="cardAuther">
          <img
            src={blog.auther.profile_image.url}
            alt="profile_image"
            className="cardAutherImage"
          />
          <span className="cardAutherName">{blog.auther.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;

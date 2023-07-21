import React, { useEffect, useState } from "react";
import "./blogdetailpage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getBlogDetails = async () => {
      const responce = await axios.get(`https://blogsio-mern.onrender.com/api/blog/${id}`);
      setBlogDetail(responce.data);
    };

    getBlogDetails();
  }, [id]);

  const deleteBlog = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    await axios
      .delete(`https://blogsio-mern.onrender.com/api/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(() => {
        toast.info("Blog has been deleted!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {blogDetail && (
        <div className="blogDetail">
          <div className="blogAuther">
            <img
              className="blogAutherImage"
              src={blogDetail.auther.profile_image.url}
              alt="profile_image"
            />
            <span className="blogAutherName">{blogDetail.auther.name}</span>
            <p className="blogDate">{format(blogDetail.createdAt)}</p>
          </div>
          {user && user.user._id === blogDetail.auther._id ? (
            <div className="blogController">
              <Link
                to={`/editblog/${blogDetail._id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <button className="blogEditButton">Edit</button>
              </Link>
              <button className="blogDeleteButton" onClick={deleteBlog}>
                Delete
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="blogDetailWrapper">
            <h1 className="blogDetailTitle">{blogDetail.title}</h1>
            <span className="blogDetailSummery">{blogDetail.summery}</span>
            <img
              src={blogDetail.blog_image.url}
              alt="blog_image"
              className="blogImage"
            />
            <div
              className="blogDetailContent"
              dangerouslySetInnerHTML={{ __html: blogDetail.content }}
            />
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default BlogDetailPage;

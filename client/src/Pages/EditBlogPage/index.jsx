import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editblogpage.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const EditBlogPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getBlogData = async () => {
      const responce = await axios.get(`https://blogsio-mern.onrender.com/api/blog/${id}`);
      setTitle(responce.data.title);
      setSummery(responce.data.summery);
      setCategory(responce.data.category);
      setContent(responce.data.content);
    };

    getBlogData();
  }, [id]);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = file
      ? {
          title,
          summery,
          file,
          category,
          content,
        }
      : {
          title,
          summery,
          category,
          content,
        };

    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const responce = await axios.put(
      `https://blogsio-mern.onrender.com/api/blog/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (responce.status === 200) {
      toast.info("Blog is being processed, will be updated shortly.");
      setTimeout(() => {
        navigate(`/blog/${id}`);
      }, 6500);
    } else if (responce.status !== 200) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="editBlog">
      <form onSubmit={createNewPost}>
        <div className="blogFormInput">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="blogFormInput">
          <input
            type="summery"
            placeholder="Summery"
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />
        </div>
        <div className="blogFormInput">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="select category">Select Category</option>
            <option value="culture">Culture</option>
            <option value="Creativity">Creativity</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="music">Music</option>
          </select>
        </div>
        <div className="blogFormInput">
          <input type="file" onChange={(e) => imageHandler(e)} />
        </div>
        <ReactQuill
          style={{
            width: "100%",
            height: "200px",
            marginBottom: "3rem",
          }}
          modules={modules}
          formats={formats}
          value={content}
          onChange={(newValue) => setContent(newValue)}
        />
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditBlogPage;

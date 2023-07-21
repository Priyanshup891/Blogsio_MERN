import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createblogpage.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

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
    const data = {
      title,
      summery,
      file,
      category,
      content,
    };

    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const responce = await axios.post(
      "http://localhost:8800/api/blog/createblog",
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (responce.status === 200) {
      toast.info("Blog is being processed, will be uploaded shortly.");
      setTimeout(() => {
        navigate("/");
      }, 6500);
    } else if (responce.status !== 200) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="createBlog">
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
            <option value="creativity">Creativity</option>
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

export default CreateBlogPage;

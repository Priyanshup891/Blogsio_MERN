import React, { useEffect, useState } from "react";
import "./signuppage.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [file, setFile] = useState("");

  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate, user]);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirm Password are not same");
    } else {
      try {
        const data = {
          name,
          email,
          password,
          file
        }
        await axios.post(
          "http://localhost:8800/api/auth/signup",
          data
        );
        toast.info("Process is successful");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } catch (error) {
        toast.error("Error! check your information");
      }
    }
  };

  return (
    <div className="signup">
      <div className="signupImage"></div>
      <form className="signupWrapper" onSubmit={handleSubmit}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#000",
          }}
        >
          <h1 className="signupWrapperTitle">Blogsio</h1>
        </Link>
        <p className="signupWrapperSubText">
          Sign Up using your email and password
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            marginTop: "2rem",
          }}
        >
          <img
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
            src={avatarPreview}
            alt="avatar"
          />
          <input
            type="file"
            onChange={(e) => {
              imageHandler(e);
            }}
          />
        </div>
        <input
          type="name"
          placeholder="Name"
          className="signupWrapperInput"
          name="name"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          className="signupWrapperInput"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          className="signupWrapperInput"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="signupWrapperInput"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => handleChange(e)}
        />
        <button className="signupWrapperButton" type="submit">
          Sign Up
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "1rem",
          }}
        >
          <span className="signupWrapperText">Have you an account?</span>
          <Link
            to="/signin"
            style={{
              textDecoration: "none",
              color: "red",
              fontSize: "16px",
            }}
          >
            Sign In
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;

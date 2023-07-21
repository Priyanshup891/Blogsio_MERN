import React, { useEffect, useState } from "react";
import "./signinpage.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/user/userSlice";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate, user]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    if (!email || !password) {
      toast.error("Please fill all the fields");
    } else {
      try {
        const responce = await axios.post(
          "http://localhost:8800/api/auth/signin",
          { email, password }
        );
        localStorage.setItem("access_token", JSON.stringify(responce.data.access_token))
        dispatch(loginSuccess(responce.data));
        toast.info("Process is successful");
        setTimeout(() => {
          navigate("/");
        }, 3500);
      } catch (error) {
        dispatch(loginFailure());
        toast.error("Error! check your information");
      }
    }
  };

  return (
    <div className="signin">
      <div className="signinImage"></div>
      <form className="signinWrapper" onSubmit={handleSubmit}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#000",
          }}
        >
          <h1 className="signinWrapperTitle">blogsio</h1>
        </Link>
        <p className="signinWrapperSubText">
          Sign In using your email and password
        </p>
        <input
          type="email"
          placeholder="E-mail"
          className="signinWrapperInput"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          className="signinWrapperInput"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <button className="signinWrapperButton" type="submit">
          Sign In
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "1rem",
          }}
        >
          <span className="signinWrapperText">Don't you have an account?</span>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "red",
              fontSize: "16px",
            }}
          >
            Sign Up
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignInPage;

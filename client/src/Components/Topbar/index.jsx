import React, { useState } from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../redux/user/userSlice";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const Topbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    toast.info("Checking Out");
    setTimeout(() => {
      dispatch(logout());
      localStorage.removeItem("access_token")
      navigate("/");
    }, 2000);
  };

  return (
    <nav className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLogo">
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <span>Blogsio</span>
          </Link>
        </div>
        <div className="topbarSearch">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon
            style={{ color: "#ccc", fontSize: "20px" }}
            onClick={() => {
              navigate(`/search/${query}`);
            }}
          />
        </div>
        <div className="topbarSignIn">
          {user ? (
            <Menu
              menuButton={
                <MenuButton className="topbarProfile">
                  <img
                    className="topbarProfileImage"
                    src={user.user.profile_image.url}
                    alt="profile_image"
                  />
                  <span className="topbarProfileText">{user.user.name}</span>
                </MenuButton>
              }
              transition
            >
              <Link
                to="/createblog"
                style={{
                  textDecoration: "none",
                }}
              >
                <MenuItem>Create Blog</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          ) : (
            <Link
              to="/signin"
              style={{
                textDecoration: "none",
              }}
            >
              <button className="tobarSignInButton">
                <LoginIcon />
                <span>Sign In</span>
              </button>
            </Link>
          )}
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Topbar;

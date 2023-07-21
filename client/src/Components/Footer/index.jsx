import React from 'react';
import './footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
        <div className="footerLinks">
            <Link to="https://github.com/Priyanshup891" style={{
                textDecoration:"none"
            }}>
            <GitHubIcon style={{color:"#222222", fontSize:"25px"}}/>
            </Link>
            <Link to="https://www.linkedin.com/in/priyanshupatil/" style={{
                textDecoration:"none"
            }}>
            <LinkedInIcon style={{color:"#222222", fontSize:"25px"}} />
            </Link>
        </div>
        <p>Copyright ©2023 All rights reserved | This project is made with ❤️ by Priyanshu Patil</p>
    </div>
  )
}

export default Footer
import React, { useEffect, useState } from "react";
import "./trendingblogs.css";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from 'react-router-dom';
import { format } from "timeago.js";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const TrendingBlogs = () => {
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    const getTrendingBlogs = async () => {
      const responce = await axios.get(
        "http://localhost:8800/api/blog/trendingblogs"
      );
      setTrendingBlogs(responce.data);
    };

    getTrendingBlogs();
  }, []);

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      transitionDuration={1000}
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      itemClass="carousel-item-padding-40-px"
    >
      {trendingBlogs.map((blog, index) => (
        <Link to={`/blog/${blog._id}`} key={index} style={{
          textDecoration:"none"
        }}>
          <div className="trendingBlogsWrapper" >
            <div className="trendingBlogsImage">
              <img src={blog.blog_image.url} alt="blog_image" />
            </div>
            <div className="trendingBlogsInfo">
              <span className="trendingBlogsCategory">
                {blog.category} - {format(blog.createdAt)}
              </span>
              <h3 className="trendingBlogsSubText">{blog.title}</h3>
              <p className="trendingBlogsSummery">{blog.summery}</p>
              <div className="trendingBlogsPrfile">
                <img
                  className="trendingBlogsPrfileImage"
                  src={blog.auther.profile_image.url}
                  alt="profile_image"
                />
                <span className="trendingBlogsProfileText">
                  {blog.auther.name}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default TrendingBlogs;

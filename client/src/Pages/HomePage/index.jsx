import React, { useState } from 'react';
import './homepage.css';
import TrendingBlogs from '../../Components/TrendingBlogs';
import Categories from '../../Components/Categories';
import CategoryBlog from '../../Components/CategoryBlog';

const HomePage = () => {

  const [selectCategory, setSelectCatelory] = useState("all");

  return (
    <div className="homepageWrapper">
      <TrendingBlogs/>
      <Categories setSelectCatelory={setSelectCatelory}/>
      <CategoryBlog selectCategory={selectCategory}/>
    </div>
  )
}

export default HomePage
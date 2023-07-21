import "./App.css";
import Layout from "./Components/Layout";
import BlogDetailPage from "./Pages/BlogDetailPage";
import CreateBlogPage from "./Pages/CreateBlogPage";
import EditBlogPage from "./Pages/EditBlogPage";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="createblog" element={<CreateBlogPage/>}/>
        <Route path="blog/:id" element={<BlogDetailPage/>}/>
        <Route path="editblog/:id" element={<EditBlogPage/>}/>
        <Route path="search/:query" element={<SearchPage/>}></Route>
      </Route>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/signin" element={<SignInPage/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;

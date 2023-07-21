const Blog = require("../models/blog.model");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.file);

    const newBlog = await Blog.create({
      title: req.body.title,
      summery: req.body.summery,
      content: req.body.content,
      category: req.body.category,
      blog_image: {
        id: result.public_id,
        url: result.secure_url,
      },
      auther: req.user.id,
    });

    await newBlog.save();

    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getTrendingBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("auther", ["name", "profile_image"])
      .sort({ createdAt: -1 })
      .limit(4);
    res.json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getBlogById = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("auther", [
      "name",
      "profile_image",
    ]);
    res.json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  try {
    let result;

    if (req.body.file) {
      result = await cloudinary.v2.uploader.upload(req.body.file);
    }

    const blog = await Blog.findById(req.params.id);
    const isAuther =
      JSON.stringify(blog.auther) === JSON.stringify(req.user.id);
    if (!isAuther) {
      return res.status(400).json("you are not the author");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        summery: req.body.summery,
        content: req.body.content,
        category: req.body.category,
        blog_image: result
          ? {
              id: result.public_id,
              url: result.secure_url,
            }
          : {
              id: blog.blog_image.id,
              url: blog.blog_image.url,
            },
      },
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json("User not found");
    }
    const isAuther =
      JSON.stringify(blog.auther) === JSON.stringify(req.user.id);
    if (!isAuther) {
      res.status(404).json("You can delete only your blog");
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json("Blog has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find().populate("auther", [
      "name",
      "profile_image",
    ]);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

const searchBlog = asyncHandler(async (req, res) => {
  try {
    const { query } = req.params;

    const blog = await Blog.find({
      title: { $regex: query, $options: "i" },
    }).populate("auther", ["name", "profile_image"]);

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  createBlog,
  getTrendingBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlog,
  searchBlog,
};

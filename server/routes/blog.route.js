const {
  createBlog,
  getTrendingBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlog,
  searchBlog,
} = require("../controllers/blog.controller");
const { getAccessToRoute } = require("../middleware/auth/auth");

const router = require("express").Router();

router.post(
  "/createblog",
  getAccessToRoute,
  createBlog
);

router.get("/trendingblogs", getTrendingBlogs);

router.get("/:id", getBlogById);

router.put(
  "/:id",
  getAccessToRoute,
  updateBlog
);

router.delete("/:id", getAccessToRoute, deleteBlog);

router.get("/", getBlog);

router.get("/search/:query", searchBlog);

module.exports = router;

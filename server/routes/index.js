const router = require("express").Router();
const auth = require("./auth.route");
const blog = require("./blog.route");

router.use("/auth", auth);
router.use("/blog", blog);

module.exports = router;

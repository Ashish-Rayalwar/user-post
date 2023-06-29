const { signupUser, loginUser } = require("../controllers/userController");

const router = require("express").Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.all("/*", (req, res) => {
  return res.status(404).send({
    status: false,
    message: "This API request is not available!",
  });
});
module.exports = router;

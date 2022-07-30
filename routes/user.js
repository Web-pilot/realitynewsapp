// DATABASE
const Pool = require("../db");
// MIDDLEWARE
const checkIfItemExist = require("../middleware/userExist");
const { verifyTokenAndAdmin } = require("../middleware/tokenVerification");
const isUserAuthenticated = require("../middleware/isUserLoggedIn");
const upload = require("../uploadImage");
// EXPRESS ROUTE
const router = require("express").Router();

// EDIT USER DETAILS
router.put(
  "/edit/:id",
  verifyTokenAndAdmin,
  upload.single("img"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const userid = req.user.userid;
      let { img, username, email, firstname, lastname, address, phone } =
        req.body;
      const user = await Pool.query("SELECT * FROM users WHERE userid = $1", [
        userid,
      ]);
      if (!user) {
        res.status(404).json("Not found");
      } else {
        const isUserOwner = await Pool.query(
          "SELECT * FROM users WHERE userid = $1",
          [userid]
        );
        if (isUserOwner.rows[0].userid !== userid) {
          res.status(403).json("Item not yours");
        } else {
          if (!img) {
            img = user.rows[0].profilepic;
          }
          const updatedUser = await Pool.query(
            "UPDATE users SET (firstname, lastname, email, username, address, phone, profilepic) = ($1, $2, $3, $4, $5, $6, $7) WHERE userid = $8 RETURNING *",
            [firstname, lastname, email, username, address, phone, img, id]
          );
          const { password, ...others } = updatedUser.rows[0];
          res.status(200).json(others);
        }
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

//GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await Pool.query("SELECT * FROM users");
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/count", async (req, res) => {
  try {
    const newsCount = await Pool.query("SELECT * FROM news");
    res.status(200).json(newsCount.rowCount);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = checkIfItemExist(id);
    if (!userExist) {
      res.status(404).json("Not found");
    } else {
      const user = await Pool.query("SELECT * FROM users WHERE userid = $1", [
        id,
      ]);
      res.status(200).json(user.rows[0]);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// DELETE USER
router.delete(
  "/delete/:id",
  isUserAuthenticated,
  verifyTokenAndAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const userExist = checkIfItemExist(id);
      if (!userExist) {
        res.status(404).json("Not found");
      } else {
        await Pool.query("DELETE FROM users WHERE userid = $1", [id]);
        res.status(200).json("User deleted successfully");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

// EXPORTS ROUTE
module.exports = router;

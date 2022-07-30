// MIDDLEWARE
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/tokenVerification");
const isUserAuthenticated = require("../middleware/isUserLoggedIn");
const upload = require("../uploadImage");
// DATABASE
const Pool = require("../db");
//HELPER FUNCTION
const checkIfItemExist = require("../middleware/userExist");
// EXPRESS ROUTE
const router = require("express").Router();

// CREATE NEWS
router.post("/create", verifyToken, upload.single("img"), async (req, res) => {
  try {
    const { title, headline, description, img, category, userid } = req.body;

    const news = await Pool.query(
      "INSERT INTO news (title, headline, description, img, category, date, userid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        title,
        headline,
        description,
        img,
        category,
        new Date().toDateString(),
        userid,
      ]
    );
    res.status(200).json(news.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//EDIT NEWS
router.put("/edit/:id", verifyToken, upload.single("img"), async (req, res) => {
  try {
    const { id } = req.params;
    let { title, headline, description, img, category } = req.body;
    const news = await Pool.query("SELECT * FROM news WHERE newsid = $1", [id]);
    if (!news.rows[0]) {
      res.status(404).json("Not found");
    } else {
      const item = await Pool.query("SELECT * FROM news WHERE newsid = $1", [
        id,
      ]);
      if (item.rows[0].userid === req.user.userid || req.user.isAdmin) {
        if (!img) {
          img = news.rows[0].img;
        } else {
          const updatedNews = await Pool.query(
            "UPDATE news SET (title, headline, description, img, category) = ($1, $2, $3, $4, $5) WHERE newsid = $6 RETURNING *",
            [title, headline, description, img, category, id]
          );
          //  res.status(200).json(updatedNews.rows[0]);
          res.status(200).json(updatedNews.rows[0]);
        }
      } else {
        res.status(403).json("You are not the owner of this item");
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET LATEST NEWS
router.get("/latest", async (req, res) => {
  try {
    const latestNews = await Pool.query(
      "SELECT * FROM news ORDER BY newsid DESC limit(6)"
    );
    res.status(200).json(latestNews.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/myarticles", verifyToken, async (req, res) => {
  try {
    const userid = req.user.userid;
    const myArticles = await Pool.query(
      "SELECT * FROM news WHERE userid = $1",
      [userid]
    );

    res.status(200).json(myArticles.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/count", async (req, res) => {
  try {
    const userCount = await Pool.query("SELECT * FROM users");
    res.status(200).json(userCount.rowCount);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
// GET ALL NEWS
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    if (category) {
      const data = await Pool.query("SELECT * FROM news WHERE category = $1", [
        category,
      ]);
      res.status(200).json(data.rows);
    } else {
      const data = await Pool.query("SELECT * FROM news");
      res.status(200).json(data.rows);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET NEWS BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newsExist = checkIfItemExist(id);
    if (!newsExist) {
      res.status(404).json("Not found");
    } else {
      const news = await Pool.query("SELECT * FROM news WHERE newsid = $1", [
        id,
      ]);
      res.status(200).json(news.rows[0]);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// DELETE NEWS BY ID
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const news = await Pool.query("SELECT * FROM news WHERE newsid = $1", [id]);
    if (!news) {
      res.status(404).json("Not found");
    } else {
      if (news.userid === req.user.userid || req.user.isAdmin) {
        await Pool.query("DELETE FROM news WHERE newsid = $1", [id]);
        res.status(200).json("News deleted successfully");
      } else {
        res.status(401).json("Not allowed ");
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// EXPORTS MY ROUTE
module.exports = router;

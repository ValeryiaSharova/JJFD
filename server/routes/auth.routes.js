const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/sighUp", async (req, res) => {});
router.post("/sighInWithPassword", async (req, res) => {});
router.post("/token", async (req, res) => {});

module.exports = router;

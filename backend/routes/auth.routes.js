const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const { check, validationResult } = require("express-validator");

const router = Router();

router.post("/reg", AuthController.registration);
router.get("/", AuthController.getAll);
router.post("/login", AuthController.login);
router.get("/auth", AuthController.auth);

module.exports = router;

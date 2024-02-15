import { getFavorites, getIsFavorite, toggleFavorite } from "#/controllers/favorite";
import { isVerified, mustAuth } from "#/middleware/auth";
import { Router } from "express";

const router = Router();

router.post("/", mustAuth, isVerified, toggleFavorite);
router.get("/", mustAuth, isVerified, getFavorites);
router.get("/is-fav", mustAuth, isVerified, getIsFavorite);

export default router;

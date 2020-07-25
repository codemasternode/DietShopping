import express from "express";
import { loginAuth, logout } from "../controllers/auth";

const router = express.Router();

export default () => {
  router.post("/login", loginAuth);
  router.post("/logout", logout)
  return router;
};
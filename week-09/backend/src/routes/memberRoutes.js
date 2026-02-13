import { Router } from "express";
import MemberController from "../controllers/MemberController.js";

const memberRoutes = Router();
const memberController = new MemberController();

memberRoutes
  .post(`/members`, memberController.postMember)
  .post("/members/login", memberController.loginMember);

export default memberRoutes;

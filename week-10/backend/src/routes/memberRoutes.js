import { Router } from "express";
import MemberController from "../controllers/MemberController.js";

const memberRoutes = Router();
const memberController = new MemberController();

memberRoutes
  .get("/members", memberController.getAllMembers)
  .get("/members/detail", memberController.getMember)
  .get("/members/logout", memberController.logoutMember)
  .post(`/members`, memberController.postMember)
  .post("/members/login", memberController.loginMember);

export default memberRoutes;

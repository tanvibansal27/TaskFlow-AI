import express from "express";

import {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/teamController.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================
   Get All Members
=========================== */

router.get("/", protect, getMembers);

/* ===========================
   Get Single Member
=========================== */

router.get("/:id", protect, getMember);

/* ===========================
   Create Member
=========================== */

router.post("/", protect, createMember);

/* ===========================
   Update Member
=========================== */

router.put("/:id", protect, updateMember);

/* ===========================
   Delete Member
=========================== */

router.delete("/:id", protect, deleteMember);

export default router;
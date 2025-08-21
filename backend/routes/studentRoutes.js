import express from "express";
import { getStudents, addStudent, updateStudent, deleteStudent, exportCSV } from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/export", exportCSV);

export default router;

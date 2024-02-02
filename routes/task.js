import express from "express";
import { newTask, myTasks, deleteTask, updateTask } from "../controllers/task.js";
import { isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

// Here we have used isAuthenticated to ensure that the logged in user data is collected and based on that the tasks are created
router.post("/new",isAuthenticated, newTask);

router.get("/mytasks",isAuthenticated, myTasks); 

router.route("/:id").delete(isAuthenticated, deleteTask).put(isAuthenticated, updateTask);


export default router;

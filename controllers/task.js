
import { Task } from "../models/task.js";
import ErrorHandler from "../middlewares/error.js";


export const newTask= async (req, res, next) => {
 try {
    const {title, description} = req.body;

    // const task = new Task({Title});
    //await task.save(); --- now this is same as create method
    
    let task = await Task.create({
        title,
        description, 
        user: req.user,
    });
    
    res.status(200).json({
        success: true,
        message:"New Task Created successfully"
        })
 } catch (error) {
    next(error);
    
 }
}

export const myTasks = async (req, res, next) => {
try {
    
    const userid = req.user._id; 
    // the find method returns an array which returns all the tasks created by the user based on id.
    const tasks = await Task.find({
        user: userid
    })

res.status(200).json({
    success: true,
    tasks,
});
} catch (error) {
    next(error);
}}

export const deleteTask = async (req, res, next) => {
try {
    const { id }= req.params;

    const task = await Task.findById(id);
if(!task) return next(new ErrorHandler("Task not found", 404));

await task.deleteOne();

res.status(200).json({
    success: true,
    message: "Task Deleted",
})

} catch (error) {
    next(error);
}
}


export const updateTask = async (req, res, next) => {
   try {
    const task = await Task.findById(req.params.id);
    
    if(!task) return next(new ErrorHandler("Task not found", 404));

task.isCompleted = !task.isCompleted;// sets opposite of the value


await task.save();

res.status(200).json({
    success: true,
    message: "Task Updated!"
})
   } catch (error) {
    next(error);
   }
}
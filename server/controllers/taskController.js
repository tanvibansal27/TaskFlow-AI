import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      project,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      project,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Tasks of One Project
export const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      project: req.params.projectId,
      owner: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    res.json({
      success: true,
      message: "Task Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user.id,
    })
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
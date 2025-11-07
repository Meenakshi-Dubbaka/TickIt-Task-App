import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ user: req.user.id, title, description });
    res.status(201).json({ message: "Task created succesfully", task });
  } catch (e) {
    res.status(400).json({ message: "Inavlid data" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      { new: true }
    );
    res.json({ message: "Task updated succesfully !" }, updated);
  } catch (e) {
    res.status(400).json({ message: "Update failed" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Task deleted succesfully !" });
  } catch (e) {
    res.status(400).json({ message: "Delet failed" });
  }
};

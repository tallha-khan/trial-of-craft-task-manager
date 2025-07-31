const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      status: req.body.status,
      dueDate: req.body.dueDate,
      assignedTo: req.body.assignedTo,
      project: req.body.project,
      createdBy: req.user,
    });
    if (req.body.assignedTo) {
      taskData.assignedTo = req.body.assignedTo;
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating task' });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo', 'name');
  res.json(tasks);
};


// Update task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    ).populate('assignedTo', 'name');
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating task' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting task' });
  }
};



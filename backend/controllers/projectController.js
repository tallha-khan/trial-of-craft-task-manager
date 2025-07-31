const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user,
      members: [req.user],
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating project' });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ members: req.user }).populate('members', 'name');
  res.json(projects);
};

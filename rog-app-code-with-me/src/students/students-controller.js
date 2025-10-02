const models = require('../../models');

async function getAllStudents(req, res) {
  const students = await models['students'].findAll();

  res.send(students);
}

async function getAllStudentsWithGraduateInfo(req, res) {
  const students = await models['students'].findAll({
    include: [
      {
        model: models['graduates'],
        include: models['programs'],
      },
    ],
  });

  res.send(students);
}

async function createStudent(req, res) {
  try {
    const newStudent = await models['students'].create(req.body);
    res.status(201).json(newStudent); // <-- Make sure you send the created student
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create student' });
  }
}

module.exports = {
  getAllStudents,
  getAllStudentsWithGraduateInfo,
  createStudent
};
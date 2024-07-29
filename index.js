// Import required modules
const express = require('express');
const app = express();

// Initialize a data array to store Employee records
let employees = [
  { id: 1, name: 'John Doe', course: 'Software Engineering', roll_no: 'SE-001' },
  { id: 2, name: 'Jane Doe', course: 'Data Science', roll_no: 'DS-002' },
  { id: 3, name: 'Bob Smith', course: 'Computer Science', roll_no: 'CS-003' },
];

// Middleware URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Middleware JSON payloads
app.use(express.json());

// API Endpoints

// Get All Employees Data (Read)
app.get('/', (req, res) => {
  res.json(employees);
});

app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);
  if (!employee) {
    res.status(404).json({ message: 'Employee not found' });
  } else {
    res.json(employee);
  }
});

app.post('/', (req, res) => {
  const { name, course, roll_no } = req.body;
  const newEmployee = { id: employees.length + 1, name, course, roll_no };
  employees.push(newEmployee);
  res.status(201).json({ message: 'Employee created successfully' });
});

app.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);
  if (!employee) {
    res.status(404).json({ message: 'Employee not found' });
  } else {
    const { name, course, roll_no } = req.body;
    employee.name = name;
    employee.course = course;
    employee.roll_no = roll_no;
    res.status(201).json({ message: 'Employee updated successfully' });
  }
});

app.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);
  if (!employee) {
    res.status(404).json({ message: 'Employee not found' });
  } else {
    const { name, course, roll_no } = req.body;
    if (name) employee.name = name;
    if (course) employee.course = course;
    if (roll_no) employee.roll_no = roll_no;
    res.status(201).json({ message: 'Employee updated successfully' });
  }
});

app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employeeIndex = employees.findIndex((emp) => emp.id === id);
  if (employeeIndex === -1) {
    res.status(404).json({ message: 'Employee not found' });
  } else {
    employees.splice(employeeIndex, 1);
    res.status(204).json();
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
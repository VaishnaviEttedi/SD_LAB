const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File path for student data
const dataFilePath = './student.json';

// Function to read data from JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Function to write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Create a new student
// Create a new student
// Create a new student
app.post('/students', (req, res) => {
    const students = readData();
    
    // Ensure the request body contains the expected properties
    const { name, age, cgpa } = req.body;

    // Check if all required properties are provided
    if (!name || !age || !cgpa) {
        return res.status(400).json({ message: 'Please provide name, age, and grade.' });
    }

    // Construct new student object
    const newStudent = { id: students.length + 1, name, age, cgpa };
    
    students.push(newStudent);
    writeData(students);
    res.status(201).json(newStudent);
});



// Get all students
app.get('/students', (req, res) => {
    const students = readData();
    res.json(students);
});

// Get a student by ID
app.get('/students/:id', (req, res) => {
    const students = readData();
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// Update a student by ID
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    // Read existing data from JSON file
    fs.readFile('student.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading data");

        const students = JSON.parse(data);
        const studentIndex = students.findIndex(student => student.id == id);

        if (studentIndex === -1) return res.status(404).send("Student not found");

        // Update student data
        students[studentIndex] = { ...students[studentIndex], ...updatedData };

        // Write updated data back to file
        fs.writeFile('student.json', JSON.stringify(students, null, 2), (err) => {
            if (err) return res.status(500).send("Error updating data");
            res.status(200).json(students[studentIndex]);
        });
    });
});

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
    let students = readData();
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex !== -1) {
        const deletedStudent = students.splice(studentIndex, 1);
        writeData(students);
        res.json({ message: 'Student deleted', student: deletedStudent });
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
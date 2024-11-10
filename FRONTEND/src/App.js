import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch students from the server
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add a new student
  const addStudent = async () => {
    try {
      await axios.post('http://localhost:3000/add', { name, age, email });
      fetchStudents();
      setName('');
      setAge('');
      setEmail('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Update an existing student
  const updateStudent = async () => {
    try {
      await axios.put(`http://localhost:3000/update/${editId}`, { name, age, email });
      fetchStudents();
      setName('');
      setAge('');
      setEmail('');
      setEditId(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Delete a student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Handle form submission for add/update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateStudent();
    } else {
      addStudent();
    }
  };

  // Set form fields for editing a student
  const startEdit = (student) => {
    setName(student.name);
    setAge(student.age);
    setEmail(student.email);
    setEditId(student.id);
  };

  return (
    <div className="App">
      <h1>Student Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button style={{backgroundColor:"purple"}} type="submit">{editId ? 'Update' : 'Add'} Student</button>
      </form>

      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <p>{student.name} ({student.age}) - {student.email}</p>
            <div>
              <button onClick={() => startEdit(student)}>Edit</button>
              <button onClick={() => deleteStudent(student.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

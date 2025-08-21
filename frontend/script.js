const API_URL = "http://localhost:5000/students";

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const roll_no = document.getElementById("roll_no").value;
  const name = document.getElementById("name").value;
  const subject = document.getElementById("subject").value;
  const marks = document.getElementById("marks").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roll_no, name, subject, marks })
  });

  loadStudents();
  e.target.reset();
});

async function loadStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();

  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  students.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.roll_no}</td>
        <td>${s.name}</td>
        <td>${s.subject}</td>
        <td>${s.marks}</td>
        <td>
          <button onclick="editStudent(${s.id}, '${s.roll_no}', '${s.name}', '${s.subject}', ${s.marks})">Edit</button>
          <button onclick="deleteStudent(${s.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadStudents();
}

async function editStudent(id, roll_no, name, subject, marks) {
  const newRoll = prompt("Edit Roll No:", roll_no);
  const newName = prompt("Edit Name:", name);
  const newSubject = prompt("Edit Subject:", subject);
  const newMarks = prompt("Edit Marks:", marks);

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roll_no: newRoll, name: newName, subject: newSubject, marks: newMarks })
  });

  loadStudents();
}

function exportCSV() {
  window.location.href = `${API_URL}/export`;
}

loadStudents();

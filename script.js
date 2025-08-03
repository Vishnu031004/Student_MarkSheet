document.getElementById('gradeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.ok) {
      this.reset();
      loadData();
      loadStats();
    }
  });
});

function loadData() {
  fetch('/grades')
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#dataTable tbody');
      tbody.innerHTML = '';
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.name}</td><td>${row.subject}</td><td>${row.marks}</td>`;
        tbody.appendChild(tr);
      });
    });
}

function loadStats() {
  // Average
  fetch('/average')
    .then(res => res.json())
    .then(data => {
      document.getElementById('avgMarks').textContent = parseFloat(data.average).toFixed(2);
    });

  // Top Performers
  fetch('/top')
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById('topPerformers');
      ul.innerHTML = '';
      data.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.name} (${student.subject}) - ${student.marks}`;
        ul.appendChild(li);
      });
    });
}

loadData();
loadStats();

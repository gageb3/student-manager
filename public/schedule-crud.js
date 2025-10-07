// Fetch and render all schedules
async function fetchSchedules() {
  const res = await fetch('/api/schedules');
  const data = await res.json();
  const container = document.getElementById('scheduleList');
  container.innerHTML = '';

  data.forEach(schedule => {
    const div = document.createElement('div');
    div.classList.add('schedule-card');
    div.innerHTML = `
      <h3>${schedule.name}</h3>
      <pre>${JSON.stringify(schedule.week, null, 2)}</pre>
      <button onclick="deleteSchedule('${schedule._id}')">Delete</button>
      <button onclick="editSchedule('${schedule._id}')">Edit</button>
    `;
    container.appendChild(div);
  });
}

// Handle create form
document.getElementById('createForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const schedule = {
    name: document.getElementById('name').value,
    week: {
      monday: document.getElementById('monday').value,
      tuesday: document.getElementById('tuesday').value,
      wednesday: document.getElementById('wednesday').value,
      thursday: document.getElementById('thursday').value,
      friday: document.getElementById('friday').value,
      saturday: document.getElementById('saturday').value,
      sunday: document.getElementById('sunday').value,
    }
  };

  await fetch('/api/schedules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(schedule)
  });

  e.target.reset();
  fetchSchedules();
});

// Delete schedule
async function deleteSchedule(id) {
  await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
  fetchSchedules();
}

// Edit schedule (simplified: just updates name for now)
async function editSchedule(id) {
  const newName = prompt("Enter new name:");
  if (!newName) return;
  await fetch(`/api/schedules/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName })
  });
  fetchSchedules();
}

// Initial load
fetchSchedules();

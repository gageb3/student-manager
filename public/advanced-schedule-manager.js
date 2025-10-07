// Populate dropdown
async function loadScheduleOptions() {
  const res = await fetch('/api/schedules');
  const data = await res.json();
  const select = document.getElementById('scheduleSelect');
  select.innerHTML = '';
  data.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s._id;
    opt.textContent = s.name;
    select.appendChild(opt);
  });
}

// Load schedule into form
document.getElementById('loadSchedule').addEventListener('click', async () => {
  const id = document.getElementById('scheduleSelect').value;
  if (!id) return;

  const res = await fetch(`/api/schedules/${id}`);
  const schedule = await res.json();

  const container = document.getElementById('daysContainer');
  container.innerHTML = '';
  for (const [day, plan] of Object.entries(schedule.week)) {
    const label = document.createElement('label');
    label.innerHTML = `${day}: <input type="text" name="${day}" value="${plan || ''}"><br>`;
    container.appendChild(label);
  }

  document.getElementById('scheduleEditor').style.display = 'block';

  // Save updated schedule
  document.getElementById('updateForm').onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedWeek = {};
    formData.forEach((val, key) => updatedWeek[key] = val);

    await fetch(`/api/schedules/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ week: updatedWeek })
    });

    alert("✅ Schedule updated!");
    loadScheduleOptions();
  };
});

// Init
loadScheduleOptions();

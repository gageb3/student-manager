// ======== Frontend Script for Weekly Schedule App ========
// Handles CRUD operations + rendering schedules into tables

const API_URL = "/api/schedules"; // backend API base

// Grab elements (used by schedule-crud.html)
const scheduleForm = document.getElementById("scheduleForm");
const scheduleIdInput = document.getElementById("scheduleId");
const nameInput = document.getElementById("name");
const dayInput = document.getElementById("day");
const taskInput = document.getElementById("task");
const scheduleTableBody = document.getElementById("scheduleTableBody");

// ======== Fetch and render all schedules ========
async function loadSchedules() {
  try {
    const res = await fetch(API_URL);
    const schedules = await res.json();

    if (scheduleTableBody) {
      scheduleTableBody.innerHTML = "";
      schedules.forEach((sch) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${sch.name}</td>
          <td>${sch.day}</td>
          <td>${sch.task}</td>
          <td>
            <button onclick="editSchedule('${sch._id}')">✏️ Edit</button>
            <button class="danger" onclick="deleteSchedule('${sch._id}')">🗑 Delete</button>
          </td>
        `;
        scheduleTableBody.appendChild(row);
      });
    }

    // If advanced manager is open, render grouped view
    if (document.getElementById("scheduleBoard")) {
      renderAdvancedView(schedules);
    }
  } catch (err) {
    console.error("❌ Error loading schedules:", err);
  }
}

// ======== Create or Update schedule ========
if (scheduleForm) {
  scheduleForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const schedule = {
      name: nameInput.value,
      day: dayInput.value,
      task: taskInput.value,
    };

    const id = scheduleIdInput.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule),
      });

      scheduleForm.reset();
      scheduleIdInput.value = "";
      await loadSchedules();
    } catch (err) {
      console.error("❌ Error saving schedule:", err);
    }
  });
}

// ======== Edit schedule (prefill form) ========
async function editSchedule(id) {
  try {
    const res = await fetch(`${API_URL}`);
    const schedules = await res.json();
    const sch = schedules.find((s) => s._id === id);

    if (sch) {
      scheduleIdInput.value = sch._id;
      nameInput.value = sch.name;
      dayInput.value = sch.day;
      taskInput.value = sch.task;
    }
  } catch (err) {
    console.error("❌ Error editing schedule:", err);
  }
}

// ======== Delete schedule ========
async function deleteSchedule(id) {
  if (!confirm("Are you sure you want to delete this schedule?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await loadSchedules();
  } catch (err) {
    console.error("❌ Error deleting schedule:", err);
  }
}

// ======== Seed sample schedules ========
async function seedData() {
  try {
    await fetch("/api/seed", { method: "POST" });
    await loadSchedules();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  }
}

// ======== Clear all schedules ========
async function cleanupData() {
  if (!confirm("Delete ALL schedules?")) return;

  try {
    await fetch("/api/cleanup", { method: "DELETE" });
    await loadSchedules();
  } catch (err) {
    console.error("❌ Error cleaning up data:", err);
  }
}

// ======== Advanced Manager View ========
function renderAdvancedView(schedules) {
  const board = document.getElementById("scheduleBoard");
  if (!board) return;

  board.innerHTML = "";

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  days.forEach((day) => {
    const column = document.createElement("div");
    column.className = "day-column";
    column.innerHTML = `<h3>${day}</h3>`;

    const filtered = schedules.filter((s) => s.day === day);
    filtered.forEach((s) => {
      const card = document.createElement("div");
      card.className = "task-card";

      card.innerHTML = `
        <div class="task-content">
          <strong>${s.name}</strong><br>
          <span>${s.task}</span>
        </div>
        <div class="task-actions">
          <button class="danger" onclick="deleteSchedule('${s._id}')">🗑</button>
        </div>
      `;

      column.appendChild(card);
    });

    board.appendChild(column);
  });
}

// ======== Initial Load ========
document.addEventListener("DOMContentLoaded", loadSchedules);

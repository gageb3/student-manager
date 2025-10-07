import express from 'express';
import 'dotenv/config';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB client
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: { version: ServerApiVersion.v1 }
});
const dbName = 'school';
let studentsCollection;
let schedulesCollection;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    const db = client.db(dbName);
    studentsCollection = db.collection('students');
    schedulesCollection = db.collection('schedules');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}
connectDB();

/* ---------------------------
   STUDENT ROUTES
---------------------------- */
app.get('/api/students', async (req, res) => {
  const students = await studentsCollection.find().toArray();
  res.json(students);
});

app.post('/api/students', async (req, res) => {
  try {
    const result = await studentsCollection.insertOne(req.body);
    res.json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    await studentsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await studentsCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------
   SCHEDULE ROUTES
---------------------------- */

// GET all schedules
app.get('/api/schedules', async (req, res) => {
  const schedules = await schedulesCollection.find().toArray();
  res.json(schedules);
});

// GET single schedule
app.get('/api/schedules/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const schedule = await schedulesCollection.findOne({ _id: new ObjectId(id) });
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new schedule
app.post('/api/schedules', async (req, res) => {
  try {
    const result = await schedulesCollection.insertOne(req.body);
    res.json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update schedule
app.put('/api/schedules/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    await schedulesCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE schedule
app.delete('/api/schedules/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await schedulesCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST seed sample schedules
app.post('/api/seed', async (req, res) => {
  try {
    const sampleSchedules = [
      { name: "Alice", day: "Monday", task: "Gym" },
      { name: "Bob", day: "Tuesday", task: "Study Go" },
      { name: "Charlie", day: "Wednesday", task: "Coding Project" }
    ];
    await schedulesCollection.deleteMany({});
    const result = await schedulesCollection.insertMany(sampleSchedules);
    res.json({ insertedCount: result.insertedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all schedules
app.delete('/api/cleanup', async (req, res) => {
  try {
    const result = await schedulesCollection.deleteMany({});
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------
   Traditional Form POST handler
---------------------------- */
app.post('/api/schedules/form', async (req, res) => {
  try {
    const { name, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
    const days = { Monday: monday, Tuesday: tuesday, Wednesday: wednesday, Thursday: thursday, Friday: friday, Saturday: saturday, Sunday: sunday };

    const schedules = Object.entries(days)
      .filter(([day, task]) => task && task.trim() !== "")
      .map(([day, task]) => ({ name, day, task }));

    if (schedules.length > 0) {
      await schedulesCollection.insertMany(schedules);
    }

    res.redirect('/traditional-forms.html?success=1');
  } catch (err) {
    res.redirect('/traditional-forms.html?error=1');
  }
});

/* ---------------------------
   SERVE FRONTEND
---------------------------- */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

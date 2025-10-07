// --- Dependencies ---
import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");

    const db = client.db("school"); // same db as in server.js
    const collection = db.collection("schedules");

    // Clear out old data
    await collection.deleteMany({});
    console.log("🗑️ Old schedules removed");

    // Sample schedules
    const sampleSchedules = [
      {
        name: "Alice",
        schedule: {
          Monday: "Gym",
          Tuesday: "Math Homework",
          Wednesday: "Grocery Shopping",
          Thursday: "Soccer Practice",
          Friday: "Movie Night",
          Saturday: "Hiking",
          Sunday: "Rest Day"
        }
      },
      {
        name: "Bob",
        schedule: {
          Monday: "Study Go Language",
          Tuesday: "Work Shift",
          Wednesday: "Laundry",
          Thursday: "Team Meeting",
          Friday: "Dinner with Friends",
          Saturday: "Volunteer Work",
          Sunday: "Relax with Family"
        }
      },
      {
        name: "Charlie",
        schedule: {
          Monday: "Piano Lesson",
          Tuesday: "Workout",
          Wednesday: "Coding Project",
          Thursday: "Cooking Class",
          Friday: "Game Night",
          Saturday: "Road Trip",
          Sunday: "Church"
        }
      }
    ];

    // Insert sample data
    const result = await collection.insertMany(sampleSchedules);

    console.log(`🌱 Seeded ${result.insertedCount} schedules into database!`);
    console.log("✅ Database seeding complete. Ready to use!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Close connection
    await client.close();
    console.log("\n🔌 Database connection closed");
  }
}

// Run the seed function
seedDatabase().catch(console.dir);

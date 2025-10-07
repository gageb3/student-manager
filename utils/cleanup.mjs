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

async function cleanupDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");

    const db = client.db("school"); // same database as server.js
    const collection = db.collection("schedules");

    // Check how many schedules exist before deletion
    const existingCount = await collection.countDocuments();
    console.log(`📊 Found ${existingCount} schedules in the database`);

    if (existingCount === 0) {
      console.log("🤷 No schedules found. Database is already clean!");
    } else {
      // Delete all schedules
      const result = await collection.deleteMany({});
      console.log(`🗑️  Successfully deleted ${result.deletedCount} schedules!`);
      
      // Verify deletion
      const remainingCount = await collection.countDocuments();
      console.log(`📊 Schedules remaining: ${remainingCount}`);
      
      if (remainingCount === 0) {
        console.log("✅ Database cleanup completed successfully!");
        console.log("💡 Tip: Run 'npm run seed' to add sample schedules back");
      }
    }

  } catch (error) {
    console.error("❌ Error cleaning up database:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("\n🔌 Database connection closed");
  }
}

// Run the cleanup function
cleanupDatabase().catch(console.dir);

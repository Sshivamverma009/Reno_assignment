import mysql from 'mysql2/promise';

const connection = { isConnected: false, db: null };

async function dbConnect() {
  if (connection.isConnected) {
    console.log("DATABASE ALREADY CONNECTED!");
    return;
  }
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // connection.isConnected = db.connections[0].readyState;
    connection.isConnected = true;
    connection.db = db;
    
    console.log("DB connected succussfully");
    return connection;

  } catch (error) {
    console.log("SOME ERROR OCCURED: ", error);
    process.exit(1);
  }
}

export default dbConnect;
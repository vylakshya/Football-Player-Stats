const mysql = require('mysql2/promise');

// MySQL Connection Pool Configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password', // ⚠️ Change this to your MySQL password
  database: 'player_stats_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection on startup
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
};

testConnection();

module.exports = pool;

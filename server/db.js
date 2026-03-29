const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Khởi tạo bảng (Initialize tables)
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    config TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_templates (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    config TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS template_overrides (
    id TEXT PRIMARY KEY,
    config TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS system_templates (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category INTEGER DEFAULT 8,
    image TEXT,
    config TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS system_settings (
    id TEXT PRIMARY KEY,
    config TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS private_photos (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS datasets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'json',
    content TEXT NOT NULL,
    bi_config TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Thêm cột bi_config nếu chưa có
try {
  db.exec("ALTER TABLE datasets ADD COLUMN bi_config TEXT;");
} catch (e) {
  // Cột đã tồn tại hoặc lỗi khác thì bỏ qua
}

console.log('SQLite Database initialized at:', dbPath);


module.exports = db;

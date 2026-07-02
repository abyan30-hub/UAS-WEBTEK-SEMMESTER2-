const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Menyimpan file database di dalam folder database
const dbPath = path.join(__dirname, 'kontak.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Gagal menghubungkan ke database SQLite:', err.message);
    } else {
        console.log('Terhubung ke database SQLite.');
    }
});

// Membuat tabel kontak sesuai spesifikasi
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS kontak (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            nama VARCHAR(255) NOT NULL,
            nomor_hp VARCHAR(20) NOT NULL,
            email VARCHAR(255),
            alamat TEXT
        )
    `, (err) => {
        if (err) {
            // SQLite tidak mendukung AUTO_INCREMENT langsung dengan tipe INT, 
            // melainkan menggunakan INTEGER PRIMARY KEY AUTOINCREMENT
            db.run(`
                CREATE TABLE IF NOT EXISTS kontak (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nama VARCHAR(255) NOT NULL,
                    nomor_hp VARCHAR(20) NOT NULL,
                    email VARCHAR(255),
                    alamat TEXT
                )
            `);
        }
    });
});

module.exports = db;
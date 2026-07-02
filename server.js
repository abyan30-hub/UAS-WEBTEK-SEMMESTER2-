const express = require('express');
const path = require('path');
const db = require('../database/database');

const app = express();
const PORT = 3000;

app.use(express.json());

// Sajikan file statis dari folder frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// 1. GET ALL & SEARCH KONTAK
app.get('/api/kontak', (dirname, res) => {
    const search = dirname.query.search || '';
    const query = `SELECT * FROM kontak WHERE nama LIKE ? OR nomor_hp LIKE ?`;
    
    db.all(query, [`%${search}%`, `%${search}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 2. POST (Tambah Kontak)
app.post('/api/kontak', (req, res) => {
    const { nama, nomor_hp, email, alamat } = req.body;
    if (!nama || !nomor_hp) {
        return res.status(400).json({ error: "Nama dan Nomor HP wajib diisi!" });
    }
    
    const query = `INSERT INTO kontak (nama, nomor_hp, email, alamat) VALUES (?, ?, ?, ?)`;
    db.run(query, [nama, nomor_hp, email, alamat], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, nama, nomor_hp, email, alamat });
    });
});

// 3. PUT (Update Kontak)
app.put('/api/kontak/:id', (req, res) => {
    const { nama, nomor_hp, email, alamat } = req.body;
    const { id } = req.params;
    
    const query = `UPDATE kontak SET nama = ?, nomor_hp = ?, email = ?, alamat = ? WHERE id = ?`;
    db.run(query, [nama, nomor_hp, email, alamat, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Kontak berhasil diperbarui" });
    });
});

// 4. DELETE (Hapus Kontak)
app.delete('/api/kontak/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM kontak WHERE id = ?`;
    
    db.run(query, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Kontak berhasil dihapus" });
    });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
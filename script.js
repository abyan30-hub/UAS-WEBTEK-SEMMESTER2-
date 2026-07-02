const API_URL = '/api/kontak';

// Ambil Data Kontak (Read)
async function fetchKontak() {
    const search = document.getElementById('search-input').value;
    const res = await fetch(`${API_URL}?search=${search}`);
    const data = await res.json();
    
    const tbody = document.getElementById('contact-table-body');
    tbody.innerHTML = '';
    
    data.forEach(k => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${k.nama}</strong></td>
                <td>${k.nomor_hp}</td>
                <td>${k.email || '-'}</td>
                <td>${k.alamat || '-'}</td>
                <td>
                    <button class="btn btn-edit" onclick="editKontak(${k.id}, '${k.nama}', '${k.nomor_hp}', '${k.email || ""}', '${k.alamat || ""}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteKontak(${k.id})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Tambah atau Update Data (Create / Update)
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('contact-id').value;
    const nama = document.getElementById('nama').value;
    const nomor_hp = document.getElementById('nomor_hp').value;
    const email = document.getElementById('email').value;
    const alamat = document.getElementById('alamat').value;

    const payload = { nama, nomor_hp, email, alamat };

    if (id) {
        // Jalankan PUT
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } else {
        // Jalankan POST
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    }

    resetForm();
    fetchKontak();
});

// Hapus Data (Delete)
async function deleteKontak(id) {
    if (confirm('Apakah Anda yakin ingin menghapus kontak ini?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchKontak();
    }
}

// Set data ke form untuk diedit
function editKontak(id, nama, nomor_hp, email, alamat) {
    document.getElementById('contact-id').value = id;
    document.getElementById('nama').value = nama;
    document.getElementById('nomor_hp').value = nomor_hp;
    document.getElementById('email').value = (email === 'null' || !email) ? '' : email;
    document.getElementById('alamat').value = (alamat === 'null' || !alamat) ? '' : alamat;

    document.getElementById('form-title').innerText = "Edit Detail Kontak";
    document.getElementById('btn-submit').innerText = "Update Kontak";
    document.getElementById('btn-cancel').style.display = "inline-flex";
}

function resetForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('contact-id').value = '';
    document.getElementById('form-title').innerText = "Tambah Kontak Baru";
    document.getElementById('btn-submit').innerText = "Simpan Kontak";
    document.getElementById('btn-cancel').style.display = "none";
}

// Load data saat pertama kali dibuka
document.addEventListener('DOMContentLoaded', fetchKontak);
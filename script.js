
let cart = [
    { nama: "Sepatu Kets", harga: 80000, qty: 1 },
    { nama: "Kaos Polos", harga: 45000, qty: 2 },
    { nama: "Topi", harga: 25000, qty: 1 }
];

function updateCartUI() {
    let totalHarga = 0;
    let tabelHTML = '';

    if (cart.length === 0) {
        tabelHTML = `<tr><td colspan="4">Keranjang belanja Anda sudah kosong</td></tr>`;
    } else {
        cart.forEach((item) => {
            const subtotal = item.harga * item.qty;
            totalHarga += subtotal;
            tabelHTML += `
                <tr>
                    <td style="text-align: left;">${item.nama}</td>
                    <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
                    <td>${item.qty}</td>
                    <td>Rp ${subtotal.toLocaleString('id-ID')}</td>
                </tr>
            `;
        });
    }

    $('#cartBody').html(tabelHTML);

    if (totalHarga > 100000) {
        const diskon = totalHarga * 0.1;
        const hargaSetelahDiskon = totalHarga - diskon;
        
        $('#cartTotal').html(`
            <del style="color: grey; font-size: 14px;">Rp ${totalHarga.toLocaleString('id-ID')}</del><br>
            <strong>Rp ${hargaSetelahDiskon.toLocaleString('id-ID')}</strong> 
            <span style="color:red; font-size:14px;"><br>(Diskon 10%)</span>
        `);
    } else {
        $('#cartTotal').html(`<strong>Rp ${totalHarga.toLocaleString('id-ID')}</strong>`);
    }
}

function simpanRiwayat(total, qty) {
    const riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];
    riwayat.push({ tanggal: new Date().toISOString(), total, qty });
    localStorage.setItem('riwayat', JSON.stringify(riwayat));
}

function tampilkanRiwayat() {
    const riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];
    
  
    if (riwayat.length === 0) {
        $('#containerRiwayat').hide();
    } else {
        $('#containerRiwayat').show();
        
        let htmlRiwayat = '';
        riwayat.reverse().forEach((item) => {
            const tanggalFormat = new Date(item.tanggal).toLocaleString('id-ID');
            
            htmlRiwayat += `
                <tr>
                    <td>${tanggalFormat}</td>
                    <td>${item.qty} item</td>
                    <td><strong>Rp ${item.total.toLocaleString('id-ID')}</strong></td>
                </tr>
            `;
        });
        
        $('#bodyRiwayat').html(htmlRiwayat);
    }
}

$(document).ready(function() {

    updateCartUI();
    tampilkanRiwayat();

    $('#btnBukaCheckout').click(function() {
        if (cart.length === 0) {
            alert("Keranjang masih kosong!");
            return;
        }
        $('#modalCheckout').fadeIn();
    });

    $('#btnBatal').click(function() {
        $('#modalCheckout').fadeOut();
    });

    $('#formCheckout').submit(function(e) {
        e.preventDefault(); 

        const nama = $('#inputNama').val().trim();
        const alamat = $('#inputAlamat').val().trim();
        const noHP = $('#inputNoHP').val().trim();

        if (!/^[0-9]{10,14}$/.test(noHP)) {
            alert("Nomor HP tidak valid. Masukkan hanya angka (10-14 digit).");
            return;
        }

        let totalHarga = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
        if (totalHarga > 100000) {
            totalHarga -= (totalHarga * 0.1); 
        }
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

        simpanRiwayat(totalHarga, totalQty);

        tampilkanRiwayat();

        alert(`Berhasil!\n\nTerima kasih ${nama}.\nPesanan Anda akan segera dikirim ke: ${alamat}`);

        cart = []; 
        updateCartUI();
        $('#formCheckout')[0].reset();
        $('#modalCheckout').fadeOut();
    });
});
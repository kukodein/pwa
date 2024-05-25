// Fungsi untuk menampilkan banner
function showInstallBanner() {
	var banner = document.getElementById('install-banner');
	banner.style.display = 'block';
}

// Fungsi untuk menyembunyikan banner
function hideInstallBanner() {
	var banner = document.getElementById('install-banner');
	banner.style.display = 'none';
}

// Cek apakah aplikasi sudah diinstal
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
	hideInstallBanner(); // Jika sudah diinstal, sembunyikan banner
} else {
	showInstallBanner(); // Jika belum diinstal, tampilkan banner
}

// Tangani klik tombol Instal
document.getElementById('install-button').addEventListener('click', function() {
	// Panggil API untuk menginstal aplikasi
	window.addEventListener('beforeinstallprompt', function(event) {
	event.prompt(); // Munculkan dialog instalasi
	hideInstallBanner(); // Sembunyikan banner setelah mengklik tombol instal
	});
});

// Tangani klik tombol Tutup
document.getElementById('close-button').addEventListener('click', function() {
	hideInstallBanner(); // Sembunyikan banner saat tombol Tutup diklik
});

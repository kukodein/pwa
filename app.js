// =======================================
// Service Worker Registration
// =======================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(reg => console.log("✅ Service Worker registered:", reg))
      .catch(err => console.error("❌ SW registration failed:", err));
  });
}

// =======================================
// IndexedDB Setup
// =======================================
let db;
const request = indexedDB.open("PWAHybridDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  if (!db.objectStoreNames.contains("posts")) {
    db.createObjectStore("posts", { keyPath: "id" });
  }
};

request.onsuccess = e => {
  db = e.target.result;
  console.log("✅ IndexedDB ready");
  loadData(); // load awal
};

// =======================================
// Load Data (Online / Offline)
// =======================================
function loadData() {
  if (navigator.onLine) {
    console.log("🌐 Online → ambil data dari API");
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then(res => res.json())
      .then(data => {
        saveToDB(data);
        displayData(data);
      })
      .catch(err => {
        console.error("⚠️ Fetch gagal:", err);
        loadFromDB();
      });
  } else {
    console.log("📴 Offline → ambil data dari IndexedDB");
    loadFromDB();
  }
}

// =======================================
// IndexedDB Helpers
// =======================================
function saveToDB(data) {
  const tx = db.transaction("posts", "readwrite");
  const store = tx.objectStore("posts");

  // Clear dulu supaya jumlah data update
  const clearReq = store.clear();

  clearReq.onsuccess = () => {
    data.forEach(item => store.put(item));
    console.log("✅ Data baru disimpan ke IndexedDB (replace)");
  };

  clearReq.onerror = e => {
    console.error("❌ Gagal clear store:", e.target.error);
  };
}

function loadFromDB() {
  const tx = db.transaction("posts", "readonly");
  const store = tx.objectStore("posts");
  const req = store.getAll();

  req.onsuccess = () => {
    if (req.result.length > 0) {
      console.log("📦 Data diambil dari IndexedDB");
      displayData(req.result);
    } else {
      console.warn("⚠️ Tidak ada data di IndexedDB → tampilkan offline.html");
      window.location.href = "offline.html";
    }
  };
}

// =======================================
// Render Data ke UI
// =======================================
function displayData(data) {
  const list = document.getElementById("dataList");
  list.innerHTML = "";
  data.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${item.id}. ${item.title}`;
    list.appendChild(li);
  });
}

// =======================================
// Toast Online/Offline
// =======================================
function showToast(message, type = "primary") {
  const toastEl = document.getElementById("statusToast");
  const toastBody = document.getElementById("toastMessage");

  // Update pesan & warna
  toastBody.textContent = message;
  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  // Tampilkan
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

window.addEventListener("online", () => {
  console.log("🌐 Kembali online → ambil data terbaru dari API");
  showToast("Koneksi kembali online", "success");
  loadData();
});

window.addEventListener("offline", () => {
  console.log("📴 Offline → pakai data dari IndexedDB");
  showToast("Koneksi terputus, menggunakan data offline", "danger");
  loadFromDB();
});

// =======================================
// Sticky Banner Install (Mobile Only)
// =======================================
let deferredPrompt;
const installBanner = document.getElementById("installBanner");
const installBtn = document.getElementById("installBtn");
const closeBanner = document.getElementById("closeBanner");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Tampilkan banner hanya di mobile
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    installBanner.style.display = "flex";
  }
});

installBtn.addEventListener("click", async () => {
  installBanner.style.display = "none";
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      console.log("✅ User accepted install");
    } else {
      console.log("❌ User dismissed install");
    }
    deferredPrompt = null;
  }
});

closeBanner.addEventListener("click", () => {
  installBanner.style.display = "none";
});

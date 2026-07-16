// Cravings Destiny - Location Fix Script
// Replace your existing location + WhatsApp section with this version.

const locBtn = document.getElementById("locBtn");
const locStatus = document.getElementById("locStatus");
const gpsInput = document.getElementById("custGps");

if (locBtn) {
  locBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Your browser doesn't support location.");
      return;
    }

    locBtn.disabled = true;
    locBtn.textContent = "Getting Location...";

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const map = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        if (gpsInput) gpsInput.value = map;

        if (locStatus) {
          locStatus.textContent = "✓ Current location captured successfully.";
          locStatus.style.color = "green";
        }

        locBtn.textContent = "✓ Location Added";
        locBtn.disabled = false;
      },
      (err) => {
        const msgs = {
          1: "Permission denied. Please allow location access.",
          2: "Location unavailable.",
          3: "Location request timed out."
        };
        alert(msgs[err.code] || "Unable to fetch location.");
        if (locStatus) locStatus.textContent = msgs[err.code] || "Unable to fetch location.";
        locBtn.textContent = "📍 Use My Location";
        locBtn.disabled = false;
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  });
}

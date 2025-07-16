window.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        document.getElementById("latitude").textContent = position.coords.latitude.toFixed(4);
        document.getElementById("longitude").textContent = position.coords.longitude.toFixed(4);
      },
      (error) => {
        document.getElementById("latitude").textContent = "Unavailable";
        document.getElementById("longitude").textContent = "Unavailable";
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});
const form = document.getElementById("feedbackForm");
const display = document.getElementById("feedbackDisplay");

function loadFeedback() {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  display.innerHTML = feedbacks
    .map((f) => `<p><strong>${f.name}</strong>: ${f.comment}</p>`)
    .join("");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();
  if (!name || !comment) return;

  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push({ name, comment });
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  form.reset();
  loadFeedback();
});

window.onload = loadFeedback;

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

fetch('https://api.open-meteo.com/v1/forecast?latitude=26.9124&longitude=75.7873&current_weather=true')
  .then(res => res.json())
  .then(data => {
    const weather = data.current_weather;
    document.getElementById('weatherContent').innerHTML = `
      🌡️ Temperature: ${weather.temperature}°C<br>
      💨 Wind Speed: ${weather.windspeed} km/h<br>
      🕒 Time: ${weather.time}
    `;
  })
  .catch(() => {
    document.getElementById('weatherContent').innerHTML = '<p class="text-red-500">Could not fetch weather info. Try again later.</p>';
  });


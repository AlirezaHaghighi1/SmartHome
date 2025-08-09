// Example dashboard data (this could come from an API later)
const dashboardData = {
  camera: {
    feeds: [
      {
        id: "C1",
        image:
          "https://csspicker.dev/api/image/?q=modern+living+room+interior&image_type=photo",
        timestamp: "12/05/2018 09:43AM",
        recording: true,
      },
      {
        id: "C2",
        image:
          "https://csspicker.dev/api/image/?q=bedroom+interior&image_type=photo",
        timestamp: "12/05/2018 09:44AM",
        recording: false,
      },
      {
        id: "C3",
        image: "https://csspicker.dev/api/image/?q=kitchen&image_type=photo",
        timestamp: "12/05/2018 09:45AM",
        recording: true,
      },
      {
        id: "C4",
        image: "https://csspicker.dev/api/image/?q=garage&image_type=photo",
        timestamp: "12/05/2018 09:46AM",
        recording: false,
      },
      {
        id: "C5",
        image:
          "https://csspicker.dev/api/image/?q=studio+room&image_type=photo",
        timestamp: "12/05/2018 09:47AM",
        recording: true,
      },
    ],
  },
  consumptionByRoom: [
    { name: "Living Room", percentage: 16, color: "#4caf50" },
    { name: "Studio", percentage: 22, color: "#ff9800" },
    { name: "Luca's Bedroom", percentage: 11, color: "#f44336" },
    { name: "Garage", percentage: 39, color: "#2196f3" },
    { name: "Kitchen", percentage: 12, color: "#9c27b0" },
  ],
  consumptionByDay: [60, 80, 70, 50, 40, 20, 30], // percent heights
  deviceLimit: { used: 10, total: 15 },
  statusByUnits: [
    { label: "ON LIVINGROOM", value: 745, unit: "W" },
    { label: "OUTSIDE", value: 20.0, unit: "°C" },
    { label: "INSIDE", value: 15.3, unit: "°C" },
    { label: "WATER", value: 494, unit: "CF" },
    { label: "INTERNET", value: 45.3, unit: "MBPS" },
  ],
  devices: [
    { name: "Outlets", date: "June 28, 2017", active: true },
    { name: "Camera", date: "June 28, 2017", active: false },
    { name: "Lights", date: "June 28, 2017", active: true },
    { name: "Thermostat", date: "June 28, 2017", active: false },
  ],
};

// Update camera section
function updateCamera() {
  const feedImg = document.querySelector(".camera-feed img");
  const timestamp = document.querySelector(".timestamp");
  const recordingStatus = document.querySelector(".recording-status");

  // Default to first feed
  const firstFeed = dashboardData.camera.feeds[0];
  feedImg.src = firstFeed.image;
  timestamp.textContent = firstFeed.timestamp;
  recordingStatus.style.display = firstFeed.recording ? "flex" : "none";

  // Camera tab click
  document.querySelectorAll(".camera-tabs .tab").forEach((tab, i) => {
    tab.addEventListener("click", () => {
      document
        .querySelector(".camera-tabs .tab.active")
        ?.classList.remove("active");
      tab.classList.add("active");

      const feed = dashboardData.camera.feeds[i];
      feedImg.src = feed.image;
      timestamp.textContent = feed.timestamp;
      recordingStatus.style.display = feed.recording ? "flex" : "none";
    });
  });
}

// Update consumption by room legend
function updateConsumptionByRoom() {
  const legendContainer = document.querySelector(".legend");
  legendContainer.innerHTML = "";
  dashboardData.consumptionByRoom.forEach((room) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `
      <div class="legend-color" style="background:${room.color}"></div>
      <span>${room.name}</span>
      <span class="percentage">${room.percentage}%</span>
    `;
    legendContainer.appendChild(item);
  });
}

// Update consumption by day bars
function updateConsumptionByDay() {
  const bars = document.querySelector(".bar-chart");
  bars.innerHTML = "";
  dashboardData.consumptionByDay.forEach((height) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = height + "%";
    bars.appendChild(bar);
  });
}

// Update device limit progress
function updateDeviceLimit() {
  const numberEl = document.querySelector(".device-limit .number");
  numberEl.textContent = dashboardData.deviceLimit.used;
  const percentage =
    (dashboardData.deviceLimit.used / dashboardData.deviceLimit.total) * 100;
  const circle = document.querySelector(
    ".device-limit svg circle:nth-child(2)"
  );
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  circle.setAttribute("stroke-dasharray", `${circumference} ${circumference}`);
  circle.setAttribute(
    "stroke-dashoffset",
    `${circumference - (percentage / 100) * circumference}`
  );
}

// Update status by units
function updateStatusByUnits() {
  const statusGrid = document.querySelector(".status-grid");
  statusGrid.innerHTML = "";
  dashboardData.statusByUnits.forEach((stat) => {
    const card = document.createElement("div");
    card.className = "status-card";
    card.innerHTML = `
      <div class="status-label">${stat.label}</div>
      <div class="status-value">${stat.value} <span class="unit">${stat.unit}</span></div>
    `;
    statusGrid.appendChild(card);
  });
}

// Update device cards
function updateDevices() {
  const deviceCards = document.querySelector(".device-cards");
  deviceCards.innerHTML = "";
  dashboardData.devices.forEach((dev) => {
    const card = document.createElement("div");
    card.className = "device-card";
    card.innerHTML = `
      <div class="device-icon">📟</div>
      <div class="device-info">
        <h3>${dev.name}</h3>
        <p>Active since</p>
        <span class="date">${dev.date}</span>
      </div>
      <div class="device-status ${dev.active ? "active" : ""}"></div>
    `;
    deviceCards.appendChild(card);
  });
}

// Initialize dashboard
function initDashboard() {
  updateCamera();
  updateConsumptionByRoom();
  updateConsumptionByDay();
  updateDeviceLimit();
  updateStatusByUnits();
  updateDevices();
}

document.addEventListener("DOMContentLoaded", initDashboard);

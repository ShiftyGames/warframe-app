// Task data
const tasks = {
    nightwave: ["Complete a Nightwave mission", "Claim your Nightwave reward"],
    hex: ["Defeat the Hex enemy in the Plains", "Complete Hex mission"],
    primeresurgence: [
        "Unlock a Prime Resurgence reward",
        "Complete the Prime Resurgence challenge",
    ],
};

// Show the correct tab
export function showTab(tabName) {
    const tabContents = document.querySelectorAll(".tab-content");
    const tabButtons = document.querySelectorAll(".tab-button");

    // Hide all tab contents
    tabContents.forEach((content) => content.classList.add("hidden"));
    tabButtons.forEach((button) => button.classList.remove("active"));

    // Show selected tab content
    document.getElementById(tabName).classList.remove("hidden");
    document.getElementById(`${tabName}Tab`).classList.add("active");
}

// Render tasks for a specific tab
export function renderTasks(tabName) {
    const taskList = document.getElementById(`${tabName}Tasks`);
    taskList.innerHTML = "";
    tasks[tabName].forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });
}

// Function to toggle dark mode
export function toggleDarkMode() {
    //const body = document.body;
    //const darkModeToggle = document.getElementById('darkModeToggle');
    const curr_theme = localStorage.theme;
    if (curr_theme == "light") {
        localStorage.theme = "dark";
    } else {
        localStorage.theme = "light";
    }

    document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches),
    );

    //body.classList.toggle('bg-gray-900');
    //body.classList.toggle('bg-white');
    //body.classList.toggle('text-white');
    //body.classList.toggle('text-black');

    //darkModeToggle.classList.toggle('bg-gray-800');
    //darkModeToggle.classList.toggle('bg-gray-200');
}

// Cetus Clock Update (Real-time simulation of Cetus cycle)
function updateCetusClock() {
    const cetusClock = document.getElementById("cetusClock");
    const now = new Date();
    const cetusTime = calculateCetusTime(now);
    cetusClock.innerHTML = `Time: ${cetusTime}`;
}

// Simulated Cetus Time (this is a simplified version, you can improve with actual in-game time data)
function calculateCetusTime(date) {
    // Cetus operates in a 24-minute day-night cycle (12 mins day, 12 mins night).
    const cetusDayLength = 24 * 60 * 1000; // 24-minute day in milliseconds
    const cetusStart = new Date("2025-01-01T00:00:00Z"); // Arbitrary start time for Cetus cycle
    const elapsedTime = (date - cetusStart) % cetusDayLength;

    const dayNightCycleTime = Math.floor(elapsedTime / 1000); // In seconds
    const dayMinutes = Math.floor(dayNightCycleTime / 60);
    const nightMinutes = dayMinutes < 12 ? dayMinutes : 24 - dayMinutes; // Day = 0-11, Night = 12-23

    return `${dayMinutes < 12 ? "Day" : "Night"} - ${dayMinutes < 12 ? dayMinutes : nightMinutes} mins`;
}

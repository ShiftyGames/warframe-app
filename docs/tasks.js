// Task data
const tasks = {
    nightwave: ["Complete a Nightwave mission", "Claim your Nightwave reward"],
    hex: ["HELLO WORLD Defeat the Hex enemy in the Plains", "Complete Hex mission"],
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

}

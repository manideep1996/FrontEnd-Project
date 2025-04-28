const tasks = {
    task1: { title: "Task 1", url: "tasks/task1/index.html" },
    task2: { title: "Task 2", url: "tasks/task2/index.html" },
    task3: { title: "Task 3", url: "tasks/task3/index.html" },
    task4: { title: "Task 4", url: "tasks/task4/index.html" },
    task5: { title: "Task 5", url: "tasks/task5/index.html" },
    task6: { title: "Task 6", url: "tasks/task6/index.html" },
    task7: { title: "Task 7", url: "tasks/task7/index.html" },
    task8: { title: "Task 8", url: "tasks/task8/index.html" },
    task9: { title: "Task 9", url: "tasks/task9/index.html" },
    task10: { title: "Task 10", url: "tasks/task10/index.html" },
    task11: { title: "Task 11", url: "tasks/task11/index.html" }
};

// Page definitions
const pages = {
    landing: "tasks/landing.html",
    about: "about.html",
    contact: "contact.html"
};

// DOM elements
const contentFrame = document.getElementById("contentFrame");
const taskToggles = document.querySelector(".task-toggles");
const loading = document.querySelector(".loading");
const navLinks = document.querySelectorAll(".nav-link");

// Initialize the application when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    createTaskButtons();
    setupNavigation();
    loadContent(pages.landing);
});

/**
 * Creates task buttons dynamically based on the tasks object
 */
function createTaskButtons() {
    if (!taskToggles) return;

    Object.entries(tasks).forEach(([key, task]) => {
        const button = document.createElement("button");
        button.classList.add("task-toggle");
        button.textContent = task.title;
        button.dataset.task = key;

        button.addEventListener("click", () => {
            // Remove active class from all buttons
            document.querySelectorAll(".task-toggle").forEach(btn => 
                btn.classList.remove("active")
            );
            
            // Add active class to clicked button
            button.classList.add("active");
            
            // Load the task content
            loadContent(task.url);
        });
        
        taskToggles.appendChild(button);
    });
}

/**
 * Loads content into the iframe and shows loading indicator
 * @param {string} url - URL to load in the iframe
 */
function loadContent(url) {
    if (!contentFrame) return;
    
    // Show loading indicator
    if (loading) loading.classList.add("active");

    // Set iframe source and handle onload event
    contentFrame.src = url;
    contentFrame.onload = () => {
        // Hide loading indicator when content is loaded
        if (loading) loading.classList.remove("active");
    };
}

/**
 * Sets up navigation link click handlers
 */
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(nav => nav.classList.remove("active"));
            
            // Add active class to clicked link
            link.classList.add("active");

            // Get the page from data attribute and load it
            const page = link.dataset.page;
            if (pages[page]) {
                loadContent(pages[page]);
            }
        });
    });
}
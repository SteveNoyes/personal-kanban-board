document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("add-task-btn");
  const modal = document.getElementById("task-modal");
  const closeModalBtn = modal.querySelector(".close-btn");
  const taskForm = document.getElementById("task-form");
  const taskTitleInput = document.getElementById("task-title");
  const taskDetailsInput = document.getElementById("task-details");
  const kanbanColumns = document.querySelectorAll(".kanban-column .kanban-tasks");

  let draggedTask = null;

  // Show modal
  addTaskBtn.addEventListener("click", () => {
      modal.style.display = "flex";
  });

  // Hide modal
  closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Add new task
  taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = taskTitleInput.value.trim();
      const details = taskDetailsInput.value.trim();

      if (title) {
          const task = document.createElement("div");
          task.className = "task";
          task.draggable = true;
          task.innerHTML = `<strong>${title}</strong><p>${details}</p>`;
          addDragEvents(task);
          kanbanColumns[0].appendChild(task); // Add to "To Do" column
      }

      taskTitleInput.value = "";
      taskDetailsInput.value = "";
      modal.style.display = "none";
  });

  // Drag-and-drop functionality
  function addDragEvents(task) {
      task.addEventListener("dragstart", () => {
          draggedTask = task;
          task.style.opacity = "0.5";
      });

      task.addEventListener("dragend", () => {
          draggedTask = null;
          task.style.opacity = "1";
      });
  }

  kanbanColumns.forEach((column) => {
      column.addEventListener("dragover", (e) => {
          e.preventDefault();
      });

      column.addEventListener("drop", () => {
          if (draggedTask) {
              column.appendChild(draggedTask);
          }
      });
  });
});

// Pomodoro Timer Variables
let timerInterval = null;
let isRunning = false;
let minutes = 25;
let seconds = 0;

// DOM Elements
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start-timer");
const pauseButton = document.getElementById("pause-timer");
const resetButton = document.getElementById("reset-timer");

// Update the Timer Display
function updateTimerDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

// Start Timer
startButton.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    alert("Pomodoro session complete!");
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateTimerDisplay();
        }, 1000);
    }
});

// Pause Timer
pauseButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
});

// Reset Timer
resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
});

// Initialize Timer Display
updateTimerDisplay();

// Reminder message
function showReminder() {
    alert("Stand Up and Drink Water");
}

// Fimer to alert user every 30 minutes (30 minutes = 1800000 milliseconds)
window.onload = function() {
    setInterval(showReminder, 1800000);
};
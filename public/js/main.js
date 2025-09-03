// FRONT-END (CLIENT) JAVASCRIPT HERE

let counter = 0; // Global counter variable to assign unique IDs to tasks

const handleTimeEdit = async function(taskId, newTime, originalTime) {
  // Check if the new time is valid
  if (!newTime || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(newTime)) {
    alert("Please enter a valid time in the format HH:MM.");

    // Revert the time to the original value
    const timeCell = document.querySelector(`#id-${taskId}`);
    if (timeCell) {
      timeCell.textContent = originalTime;
    }
    return;
  }


  try {
    // Send the updated time to the server
    const response = await fetch("/update-time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: taskId, time_input: newTime })
    });

    const serverResponse = await response.json();
    console.log("Server response after time update:", serverResponse);
    updateTaskList(serverResponse);
    
  } catch (error) {
    console.error("Error updating time:", error);
  }
}

const updateTaskList = function(serverResponse) {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = ""; // Clear the current list

  // Create a table
  const table = document.createElement("table");
  table.classList.add("task-table"); 

  // Create table header
  const headerRow = document.createElement("tr");
  ["Task Name", "Time", "Priority"].forEach(headerText => {
    const th = document.createElement("th"); 
    th.textContent = headerText;
    th.classList.add("task-header"); // Add class for styling
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Populate the table with tasks
  serverResponse.forEach(task => {
    const row = document.createElement("tr");
    row.classList.add("task-row");

    [task.task_input, task.time_input, task.priority].forEach((cellText, colIndex) => {
      const td = document.createElement("td");
      td.textContent = cellText;

      // Add class based on priority for styling
      if (cellText === "High") {
        td.classList.add("high-priority");
      } else if (cellText === "Medium") {
        td.classList.add("medium-priority");
      } else if (cellText === "Low") {
        td.classList.add("low-priority");
      } else if (cellText === "Expired") {
        td.classList.add("expired-priority");
      }
      else{
        td.setAttribute("contenteditable", "true"); // Make the cell editable

        if (colIndex == 1){ // Only add listener for time_input column
          td.id = `id-${task.task_id}`;
          td.addEventListener("blur", async function() {
            handleTimeEdit(task.task_id, td.textContent, task.time_input);
          });
        }
      }

      td.classList.add("task-cell"); // Add class for styling
      row.appendChild(td);
    });

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.classList.add("task-row");
    deleteButton.addEventListener("click", () => handleDeleteTask(task.task_id));
    row.appendChild(deleteButton);

    table.appendChild(row);
  });

  // Append the table to the task list container
  taskList.appendChild(table);
};

const handleDeleteTask = async function(taskId) {
  try {
    const response = await fetch("/delete-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: taskId })
    });

    const serverResponse = await response.json();
    console.log("Server response after deletion:", serverResponse);
    updateTaskList(serverResponse);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

const submit = async function(event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()  // prevents page reload when form submitted
  
  // Takes the input and converts to JSON
  const task_input = document.querySelector( "#task-name" ), 
      time_input = document.querySelector( "#task-time" ), 
      json = { task_input: task_input.value, time_input: time_input.value, task_id: counter++ },
      body = JSON.stringify( json )

  try {
    // Sends the JSON to the server using fetch() and processes the response
    const response = await fetch("/submit", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Extract and log the response text
    const serverResponse = await response.json();
    console.log("Server response:", serverResponse);

    // Update the task list in the HTML
    updateTaskList(serverResponse);
  } catch (error) {
    console.error("Error:", error);
  }
}

refreshTaskList = function() {
  setInterval(async () => {
    try {
      // Sends a GET request to fetch the updated task list
      const response = await fetch("/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Extract and log the response text
      const serverResponse = await response.json();
      console.log("Server response:", serverResponse);

      // Update the task list in the HTML
      updateTaskList(serverResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  }, 60000); // Refresh every 60 seconds
};


// Sets up the event listener for the submit button
window.onload = function() {
    const button = document.querySelector("button");
  button.onclick = submit;

  refreshTaskList(); // Start periodic refresh
}
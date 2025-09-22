John Diamond 
https://a2-johndiamond.onrender.com

**Note**: Render service is hosting in Oregon so the Priority field will be off by a few hours.

This project allows users to enter tasks with a specifed times which will be displayed on the page in a list format in order of how close the time is to the current time. Users can also edit and delete specific tasks.

Baseline Requirements
---


- `Server`: maintains a tabular dataset with fields.**task_input**, **time_input**, **task_id**, and **priority**.
- `Results`: this inputted tasks with the information **Task Name**, **Time**, and **Priority** are displayed in a table format on the page.
- `Form/Entry`: Users input the task name and time and click the 'Add Task' button to display the information on the table. 
- `Server Logic`: After receiving the task name and time from the user, the server calculates the **priority** field based on how close the task is to the current time as well as sorts them in ascending order based on time.
- `Derived field`: the field **priority** is calculated based on how close the task is to the current time with options **Low**, **Medium**, **High**, and **Expired**.


HTML Requirements:
---

- Users specify the task through `<input>` elements, one of type **text** and one of type **time**. The user then submits the task by clicking the `<button>` element 'Add Task'.
- The results are displayed in a `<table>` element with a `<th>` (table header) specifying columns **Task Name**, **Time**, and **Priority**. All tasks specified by users appear as `<tr>` (table rows) in the table.
- The pages is [validated](https://validator.w3.org)

CSS Requirements:
---

- CSS Selector styling:
    - Element selectors - `h1`, `body`, `button`
    - ID selectors - `#task-form`, `#form-description`, `#task-list`
    - Class selectors - `.task-table`, `.task-header`, 
- CSS positioning and styling of the primary visual elements in the application:
    - Use of either a CSS grid for layout - `#task-form`
    - Font used for all text - IBM Plex Sans
- CSS defined `main.css` 

JavaScript:
- `main.js` submits POST requests to the server `server.improved.js` whenever a user submits a new task, edits the time of an existing class, or deletes a task to update changes to the data stored in the server. It also submits a GET request every minute to update the **Priority** column of each task.

Node.js:
- The server `server.improved.js` calculates the priority of each task every minute, organizes the tasks in ascending order, and also ensures there are no duplicate tasks with the same name and time.


Acheivements
---


*Technical*
- As stated above, users can input a task name and task time to be displayed in a table below with a column called `Priority` calculated during runtime. If a user modifies the time, the page will automatically update the order of the tasks displayed in ascending order as well as the Priority of that specifc task. The page is updated every minute so update the Priority column as tasks get closer to their deadline.

- The User can modify the task name and task time by simply clicking on the text of either and modifying it directly. Users can not edit the priority because it is updated automatically if the time of the task is modified. Additionally, if the user hovers over a row in the table, a delete button pops up on the right hand side of that specifc row which a user can click on to delete the task.

*Design/UX*

Design Evaluation 1:
1. Theo Sawyer
2. There is nothing on the page that indicates you can edit the values  in each task
3. I should use AM and PM instead of military time
4. Add more elements to guide the user on how to use the application

Design Evaluation 2:
1. Aanan Goyal
2. The table headers should be present on the page even if there are no tasks under
3. He typed in an extremely long task which modified the length of the columns in the table that I did not expect.
4. Modify the table headers so they appear even if no tasks have been entered


AI Usage
---

Used ChatGPT with the following prompts:
- How to add `<li>` components to an HTML page dynamically after a button is clicked
- How to create a javascript function called when a user edits content in a table element
- How would I add a new category to the JSON on the server side?
- How would I use grid on the table to make one column longer than the others?
- How would I make the text in the table editable?
- How would I create a regex experssion to make sure a user enters time in format HH:MM
- How to add an event listener to a speciifc column in a table
- how to create a function to submit a post request to a server
- how to add an id to an element like classList.add
- How to create a button that only appears when hovering over an element





1. Help users avoid and correct mistakes - Tips for Developing 

When a user edits the time for an existing task, my application ensures the time is in the actual range and alerts the user if not (ex: 46:88 is not a valid time).

2. Provide informative, unique page titles - Tips for Writing

The page title for the login page is called "Login" and the title for the daily task page is "Daily Task Page".

3. Keep content clear and concise - Tips for Writing

The daily tasks page has three sentences to explain to the user how to use the application.

4. Provide sufficient contrast between foreground and background - Tips for Designing

The colors of the text versus the background they are displayed on are adequately contrasted to be able to read the text clearly.

5. Ensure that interactive elements are easy to identify - Tips for Designing

When you hover over task and time cells, they turn gray. Also, when you click on the text in either a task or time cell, there is a blue outline that appears on that cell. When you hover over any row in the table, a delete button for that button appears

6. Ensure that form elements include clearly associated labels - Tips for Designing

The text box to input the name of tasks has placeholder text "Task Name" and the time input form has the text "--:-- --" as well as a clock icon.

7. Provide easily identifiable feedback - Tips for Designing

If the user tries to click "Add Task" without filling out task name and task time, the browser will alert with the text: "Both Task Name and Time are required."

8. Reflect the reading order in the code order - Tips for Developing

The elements are in top to bottom order for a user to read. First the heading, then the explanation of the application, then the form input, and then the table to display the contents of the submitted forms.

9. Provide clear instructions - Tips for Writing

The text below the header effectively explain to the user how to application works as well as error explanations if a user does not use the application correctly.

10. Keep content clear and concise - Tips for Writing 

The text and interactive elements are minimal and formatted with spacing so a user can clearly distinguish between them.

11. Don't use color alone to convey information - Tips for Designing

The priority column has colors as well as text to indicate how close the deadline for each task is: low - green, medium - yellow, high - orange, expired - red.

12. Provide clear and consistent navigation options - Tips for Designing

The login button has the text "Login with Email/Password" and has an icon of an arrow entering a box. The logout button has the text "Logout" and has an icon of an arrow exiting a box.



CRAP Principles 

Contrast

My application uses 
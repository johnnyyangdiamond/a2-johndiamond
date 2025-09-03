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
- (5 points per person, with a max of 10 points) Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the [think-aloud protocol](https://en.wikipedia.org/wiki/Think_aloud_protocol) to obtain feedback on your design (talk-aloud is also fine). Important considerations when designing your study:

1. Make sure you start the study by clearly stating the task that you expect your user to accomplish.
2. You shouldn't provide any verbal instructions on how to use your interface / accomplish the task you give them. Make sure that your interface is clear enough that users can figure it out without any instruction, or provide text instructions from within the interface itself. 
3. If users get stuck to the point where they give up, you can then provde instruction so that the study can continue, but make sure to discuss this in your README. You won't lose any points for this... all feedback is good feedback!

You'll need to use sometype of collaborative software that will enable you both to see the test subject's screen and listen to their voice as they describe their thoughts, or conduct the studies in person. After completing each study, briefly (one to two sentences for each question) address the following in your README:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?

*You do not need to actually make changes based on their feedback*. This acheivement is designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 



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
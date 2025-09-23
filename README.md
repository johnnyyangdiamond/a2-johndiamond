John Diamond 
https://a3-johndiamond-production.up.railway.app/


**Note**: Railway service is hosting in Oregon so the Priority field will be off by a few hours.

**Login Information**
- Email: user@gmail.com
- Password: aa3Bas882J

This project allows users to enter tasks with a specifed times which will be displayed on the page in a list format in order of how close the time is to the current time. Users can also edit and delete specific tasks.

One of the biggest challenges with this application was converting it to use MongoDB as the UI for setting up databases and collections was confusing as well as refactoring my code to work with the API calls.

I choose Auth0 for my authentication strategy so I could get the Technical Achievement.

I used the CSS framework Bootstrap because it was the most generalized and popular framework.

Express Middleware:
- express.json(): parse JSON request bodes
- express.static(dir): Serve static files from 'public' directory
- express-session: handles login state between requests
- passport: integrates Auth0 authentication and ties it into session
- requireLogin(): custom function, ensures that user is authenticated before going to rest of code such as connecting to MongoDB
- custom function that makes sure collection exists before proceeding with code to call collection functions





Acheivements
---


*Technical*

I implemented OAuth authentication with passport.js.
- Email: user@gmail.com 
- Password: aa3Bas882J

I used Railway instead of Render. I felt that the UI was more straight forward and I didn't have to configure the environment as much.


*Design/UX*

Twelve Tips:
___

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
___


Contrast

Contrast in my site is primarily achieved through color. The background color of the page is white but the table is primarily black. Text contrast is also used with text either being black of white to contrast the background color and make it easily readable. The table of tasks leverages contrast as well, with high, medium, low, and expired tasks each highlighted in distinct background colors (orange, yellow, green, and red). This allows users to quickly differentiate the priority level of each task. Additionally, hovering over cells in “Task Name” and “Time” turns the background color gray in contrast to black to indicate that they can be edited. Finally, if you click on the text in one of the cells, the outline turns blue in contrast to no outline to indicate that the current cell is being edited.

Repetition

The blue of the Login and Logout buttons as well as the icons are repeated to ensure the user knows these are navigation buttons. The font throughout the application is repeated using 'IBM Plex Sans' to give it a sleek and modern look. The form inputs and button all have a white background with a light gray outline to indicate to the user that they are all within the same function of submitting a task into the table. Additionally, all rows in the table have the same functions of making a delete button visible when a user hovers over the row and making the background color of the cells turn gray when hovered, ensuring that the user is aware of the functionality of the various row within the table. Morevover, the functionality of each row is repeated in the table of being able to edit the task name and time cells as well as delete any row when needed.

Alignment

The main page text and buttons are all aligned to the center for consistency besides the logout button which is off to the side to indicate that it is not part of the main function of the application. Additionally, the table aligns 'Task Name', 'Time', and 'Priorty' into columns so users can easily track each row and category. The 'Task Name' column is wider than the others so users have more space to type out longer tasks. The form input for task name, task time, and add task button are all in the same row to indicate that they work together. The login page has the header 'Daily Tasks' with a large Login button aligned in the center so the user's attention is front and center. Finally, the text on the main page is aligned for the user to understand how the application works by reading it top to bottom.

Proximity

On the login page there is a white box in the center with the header "Daily Tasks" and a blue button right below with the text "Login with Email/Password". This lets the user know that if they click the button they will be directed to another page with Daily Tasks. On the main page the header is repeated with additional text right below that explains how to use the application. Right below that is a form input for text, time, and a button 'Add Task'. Since it is right below text explaining how to use the application, the user knows that this must be the form submission that was explained just above.


AI Usage
---

Used ChatGPT with the following prompts:
- What is the express version of the sendFile function
- How do I figure out this information on my mongoDB database? USERNM=xxxxx PASS=xxxxx HOST="cluster0-xxxxxxxx.mongodb.net"
- Error: querySrv ENOTFOUND _mongodb._tcp.undefined …
- What does run().catch(console.dir) do
- SyntaxError: Unexpected token 'E', "Error adding task" is not valid JSON
- What data type is duplicate in: const duplicate = await collection.findOne({ task_input: newTask.task_input, time_input: newTask.time_input });
- Error running findOne: MongoServerError: (Unauthorized) not authorized on admin to execute command
- Atlas restricts write access to collections on certain namespaces that are used by MongoDB itself. Included restricted a3-collection on role: readWrite@admin
- Why does this get request not work: app.get("/index", (req,res) => { res.sendFile(path.join(__dirname, "public/html", "index.html")); }) when I do window.location.href = "/index";
- I just tried to deploy my application on vercel but I got 404 not found when tried to login to auth0
- Can you wrap duplicate in a try catch statement?










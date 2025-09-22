const express = require("express");
const mime = require("mime");
const path = require("path");
require("dotenv").config();

const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const session = require("express-session");

const app = express();
const dir = "public";

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,     // don't resave if session unchanged
  saveUninitialized: true   // save new but unmodified sessions
}));

app.use(passport.initialize());   
// integrates Express sessions so passport can persist login state
app.use(passport.session());  

passport.use(new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK
  },
  // Runs after login succeeds and saves user object in session
  function(accessToken, refreshToken, extraParams, profile, done){
    return done(null, profile);
  }
));

// serialize user into session, store entire user profile
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserialize User object on each request
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Redirect to Auth0 hosted login page
app.get("/login", passport.authenticate("auth0", {
  scope: "openid"
}));

// Auth0 redirects after login
app.get("/callback", passport.authenticate("auth0", {
  failureRedirect: "/index" // Redirect back to login page if fails
}), (req, res) => {
  res.redirect("/user");
});

// Redirect to login page after logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.redirect(
      `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.AUTH0_ORIGIN}`
      );
    });
  });
});

// Protection middleware to make sure user is logged in
function requireLogin(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  else{
      res.redirect("/login");
  }
}

// Middleware to parse JSON bodies 
app.use(express.json());
// Middleware to serve static files from folder
app.use(express.static(dir));


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USERNM}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=a3-johndiamond`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection = null
async function run() {
  try {
    console.log(uri);
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    collection = client.db("a3-database").collection("a3-collection");

    if(collection !== null){
      console.log("Collection exists");
    }
    // Send a ping to confirm a successful connection
    await client.db("a3-database").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (err) {
    // Ensures that the client will close when you finish/error
    console.error("MongoDB connection error:", err);
  }
}
run().catch(console.dir);

app.use((req, res, next) => {
  if (collection !== null){
    next();
  } else {
    res.status(503).send("Collection does not exists");
  }
});


const determinePriority = function(tasks){ 
  const currentTime = new Date(`1970-01-01T${new Date().toTimeString().split(' ')[0]}Z`);

  return tasks.map(task => {
    const taskTime = new Date(`1970-01-01T${task.time_input}:00Z`);
    const timeDiff = (taskTime - currentTime) / (1000 * 60); // Difference in minutes

    let priority;
    if (timeDiff <= 30 && timeDiff >= 0) {
      priority = "High";
    } else if (timeDiff > 30 && timeDiff <= 120) {
      priority = "Medium";
    } else if (timeDiff > 120) {
      priority = "Low";
    } else {
      priority = "Expired";
    }

    // return a new object with priority added
    return { ...task, priority };
  });
};

// const ensureNoDuplicates = function(newTask) {
//   // Check if a task with the same task_input and time_input already exists
//   return !appdata.some(task => task.task_input === newTask.task_input && task.time_input === newTask.time_input);
// }

// Convert ids for each task to string for client side
function convertIdtoString(tasks){
  return tasks.map(task => ({
    ...task,
    id: task._id.toString(),
  }));
}

async function getTasksWithPriority(){
  // fetch tasks sorted by time
  const tasks = await collection.find({}).sort({ time_input: 1 }).toArray();

  // add priority and convert _id to string
  const tasksWithPriority = determinePriority(tasks);
  return convertIdtoString(tasksWithPriority);
}


// Serve login.html automatically
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve index.html if authenticated
app.get("/user", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.html"));
});



// handle "tasks" GET call
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await getTasksWithPriority();
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Error fetching tasks");
  }
});


app.post("/submit", async (req, res) => {
  try {
    const newTask = req.body;

    console.log(newTask);

    console.log("Collection is:", collection ? "READY" : "NULL");
    console.log("DB:", collection.dbName, "Collection:", collection.collectionName);
    
    // Ensure no duplicates with same task + time
    const duplicate = await collection.findOne({
      task_input: newTask.task_input,
      time_input: newTask.time_input
    });

    console.log(duplicate);

    if(!duplicate){
      const result = await collection.insertOne(newTask);
      console.log("Inserted task: with _id:", result.insertedId);
    }

    const tasks = await getTasksWithPriority(collection);
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Error adding task");
  }
});


app.post("/update-time", async (req, res) => {
  try{
    const { id, time_input } = req.body;

    await collection.updateOne(
      { _id: new ObjectId(String(id)) },
      { $set: { time_input } }
    );

    const tasks = await getTasksWithPriority();
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Error updating task");
  }
});

  
app.post("/delete-task", async (req, res) => {
  try {
    const { id } = req.body;

    await collection.deleteOne({ _id: new ObjectId(String(id)) });

    const tasks = await getTasksWithPriority();
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Error deleting task");
  }
});


port = process.env.PORT || 3000;

app.listen( port, () => {
  console.log(`Server running on port: ${port}`);
});
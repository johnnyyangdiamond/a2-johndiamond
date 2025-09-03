const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = []


const organizeAppData = function() {
  const currentTime = new Date(); 

  appdata.sort((a, b) => {
    // Convert time_input strings to Date objects for comparison
    const timeA = new Date(`1970-01-01T${a.time_input}:00Z`);
    const timeB = new Date(`1970-01-01T${b.time_input}:00Z`);

    // Calculate differences from current time
    const diffA = Math.abs(currentTime - timeA);
    const diffB = Math.abs(currentTime - timeB);

    return diffB - diffA; // Sort in descending order 
  });

};

const determinePriority = function(){ 
  const currentTime = new Date(`1970-01-01T${new Date().toTimeString().split(' ')[0]}Z`);

  for (let i = 0; i < appdata.length; i++) {
    const taskTime = new Date(`1970-01-01T${appdata[i].time_input}:00Z`);
    const timeDiff = (taskTime - currentTime) / (1000 * 60); // Difference in minutes

    if (timeDiff <= 30 && timeDiff >= 0) {
      appdata[i].priority = "High";
    } else if (timeDiff > 30 && timeDiff <= 120) {
      appdata[i].priority = "Medium";
    } else if (timeDiff > 120) {
      appdata[i].priority = "Low";
    }
    else {
      appdata[i].priority = "Expired";
    }
  }
}

const ensureNoDuplicates = function(newTask) {
  // Check if a task with the same task_input and time_input already exists
  return !appdata.some(task => task.task_input === newTask.task_input && task.time_input === newTask.time_input);
}

// Handles HTTP requests and calls coressponding functions
const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

// Either serves a file or the index page
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }
  else if( request.url === "/tasks" ) {
    organizeAppData();
    determinePriority();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  }else{
    sendFile( response, filename )
  }
}

//
const handlePost = function( request, response ) {
  let dataString = ""

  // receives data in chunks to append to dataString
  request.on( "data", function( data ) { // event listener triggered when data is received
      dataString += data 
  })

  // event listener triggered when all data is received
  request.on( "end", function() {
    const parsedData = JSON.parse(dataString);

    if(request.url === "/update-time") {

      const task = appdata.find(t => t.task_id === parsedData.id);
      if (task) {
        task.time_input = parsedData.time_input;
      }
    }
    else if (request.url === "/delete-task") {
      console.log("Deleting task with ID:", parsedData.id);
      const taskIndex = appdata.findIndex(t => t.task_id === parsedData.id);
      if (taskIndex !== -1) {
        appdata.splice(taskIndex, 1); // Remove the task from the array
      }
    }
    else {
      // Add the new data to the appdata array
      if (ensureNoDuplicates(parsedData)) {
        appdata.push(parsedData);
      }
    }

    // Re-apply organization and priority after any update
    organizeAppData();
    determinePriority();

    // Send the entire appdata array as the response
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  })
}


const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

  // read file from file system
   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )

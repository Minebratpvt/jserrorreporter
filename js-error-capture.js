var projectName = document.title; 
 
  window.onerror = function(message, source, lineno, colno, error) { 
    var today = new Date();
    let err = {
             projectName: projectName,
             line: lineno,
             column: colno,
             message: message,
             fileName: source,
             error: error.stack,
             timeStamp: today.getDate()+"/" + today.getMonth() +"/"+ today.getFullYear() + "  " + today.getHours()+ ":" + today.getMinutes() + ":" + today.getSeconds() 
             
      
          };
    
    var xhr = new XMLHttpRequest();
    //URL of the Express Server
    var url = "http://localhost:8000/api/errors/javascript"; 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    };
    var data = JSON.stringify(err);
    xhr.send(data);
}
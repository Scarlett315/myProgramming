let currentSchedule = document.getElementById("dayScheduletbl")
let scheduleList = [];
let todoLi = [];

function editSchedule(){ //Shows form for adding items to schedule
    document.getElementById("formAddToSchedule").style.display = 'block';
}

//Schedule
function addEventToSchedule(){
    currentSchedule.innerText = "";
    scheduleList.push([document.getElementById("scheduleTime").value, 
    document.getElementById("scheduleText").value]); //appends the event and time to a list


    //console.log(unorganizedSchedule);
    scheduleList.sort();
    
    var html = "<table style = width:80%>";
    for (var i = 0; i < scheduleList.length; i++) {
        html+="<tr>";
        html+="<td style=width:10%>"+scheduleList[i][0]+"</td>";
        html+="<td>"+scheduleList[i][1]+"</td>";
        html+="</tr>";

    }
    html+="</table>";
    document.getElementById("dayScheduletbl").innerHTML = html;

    document.getElementById("scheduleTime").value = "";
    document.getElementById("scheduleText").value = "";
    document.getElementById("formAddToSchedule").style.display = 'none'; //hides form
}

function clearSchedule(){
    scheduleList = [];
    currentSchedule.innerText = "";
}

//To-Do List
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function addToDoItem() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("todoInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("todoLi").appendChild(li);
  }
  document.getElementById("todoInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
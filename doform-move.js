var ie = (document.all)? true:false;
var ns4 = (document.layers)? true:false;
var ns6 = (document.getElementById)? true:false;

var myCurrentDiv = null;
var bDoResize = false;

//Init of variables, Divs-Layers, and onmousedown
// Function called at the onLoad of Body
function InitOnMouseDown() {
  var myArray=document.getElementsByName("myDivs");
  for (i=0;i<myArray.length;i++) {
    var myDiv=myArray[i];
    if (ie) {
      myDiv.onmousedown=InitOnMouseMoveAndUp;
    } else if (ns4) {
      document.captureEvents(Event.MOUSEDOWN);
      document.onmousedown=InitOnMouseMoveAndUp;
    } else if (ns6) {
      myDiv.addEventListener("mousedown",InitOnMouseMoveAndUp, false);
    }
  }
}
// Parametrization of the move of the Divs-Layers and of the onmousemove & onmouseup during the onmousedown
// The "(e)" indicates to the program that it uses the events
// Function called at the mousedown of each Div
function InitOnMouseMoveAndUp(e) {
  if (myCurrentDiv==null) {
    myCurrentDiv=this;
  }
  if (ie) {
    window.lastX=event.clientX;
    window.lastY=event.clientY;
    bDoResize = (window.lastX > parseInt(myCurrentDiv.style.left) + parseInt(myCurrentDiv.style.width - 4)) && (window.lastY > parseInt(myCurrentDiv.style.top) + parseInt(myCurrentDiv.style.height) - 4)
    document.onmousemove=MoveDiv;
    document.onmouseup=ClearOnMouseMove;
  } else if (ns4) {
    window.lastX=e.pageX;
    window.lastY=e.pageY;
    bDoResize = (window.lastX > parseInt(myCurrentDiv.left) + parseInt(myCurrentDiv.width) - 4) && (window.lastY > parseInt(myCurrentDiv.top) + parseInt(myCurrentDiv.height) - 4)
    document.captureEvents(Event.MOUSEMOVE)
    document.onmousemove=MoveDiv;
    document.captureEvents(Event.MOUSEUP)
    document.onmouseup=ClearOnMouseMove;
  } else if (ns6) {
    window.lastX=e.clientX;
    window.lastY=e.clientY;
    bDoResize = (window.lastX > parseInt(myCurrentDiv.style.left) + parseInt(myCurrentDiv.offsetWidth) - 4) && (window.lastY > parseInt(myCurrentDiv.style.top) + parseInt(myCurrentDiv.offsetHeight) - 4)
    window.onmousemove=MoveDiv;
    window.onmouseup=ClearOnMouseMove;
  }
}
// Move of the Divs-Layers
// Function called at the onMouseMove of the document
function MoveDiv(e) {
  if (ie) {
    // Compute the position gap of the mouse
    var iDeltaX=event.clientX-window.lastX;
    var iDeltaY=event.clientY-window.lastY;
    if (bDoResize) {
      myCurrentDiv.style.width = parseInt(myCurrentDiv.style.width)+iDeltaX;
      myCurrentDiv.style.height = parseInt(myCurrentDiv.style.height)+iDeltaY;
    } else {
      //Retrieve the position of the div and add the gap position of the mouse
      var iNewX = parseInt(myCurrentDiv.style.left)+iDeltaX;
      var iNewY = parseInt(myCurrentDiv.style.top)+iDeltaY;
      // Assign new position to the div
      myCurrentDiv.style.left=iNewX+"px";
      myCurrentDiv.style.top=iNewY+"px";
    }
    // Assign the old position of the mouse
    window.lastX=event.clientX;
    window.lastY=event.clientY;
  } else if (ns4) {
    // Compute the position gap of the mouse
    var iDeltaX=e.pageX-window.lastX;
    var iDeltaY=e.pageY-window.lastY;
    if (bDoResize) {
      myCurrentDiv.width = parseInt(myCurrentDiv.width)+iDeltaX;
      myCurrentDiv.height = parseInt(myCurrentDiv.height)+iDeltaY;
    } else {
      // Retrieve the position of the div and add the gap position of the mouse
      var iNewX = parseInt(myCurrentDiv.left)+iDeltaX;
      var iNewY = parseInt(myCurrentDiv.top)+iDeltaY;
      // Assign new position to the div
      myCurrentDiv.left=iNewX;
      myCurrentDiv.top=iNewY;
    }
    // Assign the old position of the mouse
    window.lastX=e.pageX;
    window.lastY=e.pageY;
  } else if (ns6) {
    // Compute the position gap of the mouse
    var iDeltaX=e.clientX-window.lastX;
    var iDeltaY=e.clientY-window.lastY;
    if (bDoResize) {
      myCurrentDiv.style.width = (parseInt(myCurrentDiv.offsetWidth)+iDeltaX) + "px";
      myCurrentDiv.style.height = (parseInt(myCurrentDiv.offsetHeight)+iDeltaY) + "px";
    } else {
      // Retrieve the position of the div and add the gap position of the mouse
      var iNewX = parseInt(myCurrentDiv.style.left)+iDeltaX;
      var iNewY = parseInt(myCurrentDiv.style.top)+iDeltaY;
      // Assign new position to the div
      myCurrentDiv.style.left=iNewX+"px";
      myCurrentDiv.style.top=iNewY+"px";
    }
    // Assign the old position of the mouse
    window.lastX=e.clientX;
    window.lastY=e.clientY;
  } 
}
function ClearOnMouseMove(e) {
  myCurrentDiv=null;
  // Reinitialize on the onmousemove
  if (ie || ns4) {
    document.onmousemove=null;
  } else if (ns6) {
    window.onmousemove=null;
  }
}

function copySummaryToInputs() {
  var sString = document.getElementById('CssSummary').value;
  // Suppress all spaces
  sString = sString.replace(/ +/g,'');
  var sStringArray = sString.split('\n');
  for(var i=0;i<sStringArray.length;i++) {
    var sRow = sStringArray[i];
    // Suppress the initial "."
    sRow = sRow.replace(/^\./g,'');
    // Suppress the final "}"
    sRow = sRow.replace(/}$/g,'');
    var sRowArray = sRow.split("{");
    var sClassName = sRowArray[0];
    var sKeyArray = sRowArray[1].split(";");
    for(var j=0;j<sKeyArray.length;j++) {
      sCaractArray = sKeyArray[j].split(":");
      switch (sCaractArray[0].toLowerCase()) {
        case "top": document.getElementById(sClassName).style.top=sCaractArray[1]; break;
        case "left": document.getElementById(sClassName).style.left=sCaractArray[1]; break;
        case "height": document.getElementById(sClassName).style.height=sCaractArray[1]; break;
        case "width": document.getElementById(sClassName).style.width=sCaractArray[1]; break;
      }
    }
  }
  document.getElementById('CssSummary').value = "";
}
function copyInputsToSummary() {
  var sReturn="";
  // var myInputsArray = document.getElementById('divInputs').getElementsByTagName("*");
  var myInputsArray = document.getElementsByName("myDivs");
  for(var i=0;i<myInputsArray.length;i++) {
    // .Race {position:absolute;top:213px;left:70px;width:140px;text-align:left;}
    sReturn = sReturn + (sReturn==""?'':'\n') + "." + myInputsArray[i].id + " {position:absolute;"
    + "top:" + myInputsArray[i].style.top + ";"
    + "left:" + myInputsArray[i].style.left + ";"
    + "height:" + myInputsArray[i].offsetHeight + ";"
    + "width:" + myInputsArray[i].offsetWidth + ";"
    + "}";
  }
  document.getElementById('CssSummary').value = sReturn;
}

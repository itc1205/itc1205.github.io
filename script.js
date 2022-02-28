let elem = document.getElementById("drag-n-drop-window");
let statusText = document.getElementById("status");
let minimize = document.getElementById("minimize");

class Window {
  constructor(element) {
    this.element = element;
    this.hidden = false;
    this.titlebar = element.getElementsByClassName("title-bar")[0];
    this.closebutton = element.getElementsByClassName("close")[0];
    this.cpu_status = element.getElementsByClassName("CPU_usage")[0];
    console.log(this.titlebar);
  }
};

let statusWindow = new Window(elem);

close.onmousedown = function () {
  statusWindow.element.setAttribute('style', 'display: none;');
  statusWindow.hidden = true;
};

statusWindow.titlebar.onmousedown = function (event) {
  if (!statusWindow.hidden) {
    let shiftX = event.clientX - statusWindow.element.getBoundingClientRect().left;
    let shifY = event.clientY - statusWindow.element.getBoundingClientRect().top;
    
    statusText.innerText = "Moving"

    statusWindow.element.style.position = "absolute";
    statusWindow.element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);
    

    function moveAt(pageX, pageY) {
      statusWindow.element.style.left = pageX - shiftX + "px";
      statusWindow.element.style.top = pageY - shifY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      statusWindow.cpu_status.innerText = `CPU Usage: ${Math.floor(Math.random() * 100)}%`
    }

    document.addEventListener("mousemove", onMouseMove);

    statusWindow.titlebar.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      statusWindow.titlebar.onmouseup = null;
      statusText.innerText = "Not moving"
    };
  } else {
    document.removeEventListener("mousemove", onMouseMove);
  }
};

statusWindow.titlebar.ondragstart = function () {
  return false;
};

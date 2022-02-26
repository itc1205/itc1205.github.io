let elem = document.getElementById("drag-n-drop-window");
let status = document.getElementById("status");


elem.onmousedown = function (event) {
  let shiftX = event.clientX - elem.getBoundingClientRect().left;
  let shifY = event.clientY - elem.getBoundingClientRect().top;
  
  status.innerText = "Moving"

  elem.style.position = "absolute";
  elem.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    elem.style.left = pageX - shiftX + "px";
    elem.style.top = pageY - shifY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  elem.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    elem.onmouseup = null;
    status.innerText = "Not moving"
  };
};

elem.ondragstart = function () {
  return false;
};

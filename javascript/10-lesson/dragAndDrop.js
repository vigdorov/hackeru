let drag = document.getElementsByClassName('drag')[0];

drag.addEventListener('dragend', (e) => {
  let target = document.elementFromPoint(e.clientX, e.clientY);
  target.appendChild(drag);
});
function show(){
  var y=document.getElementById("prod_id").value;
  console.log(y);
  if(y == 'sofa')
  {
  var x = document.getElementById("prodImg1");
  x.setAttribute("src", "images/sofa.png");
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  }
  if(y == 'lamp')
  {
  var x = document.getElementById("prodImg2");
  x.setAttribute("src", "images/lamp.png");
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  }
  if(y == 'clock')
  {
  var x = document.getElementById("prodImg3");
  x.setAttribute("src", "images/clock.jpg");
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  }
}

interact('.draggable')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,

    onmove: dragMoveListener,
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

const { listeners } = require("process");

const frames = window.frames; // or const frames = window.parent.frames;
// for (let i = 0; i < frames.length; i++) {
//   // do something with each subframe as frames[i]
//   frames[i].document.body.style.background = "red";
// }

let contextMenu = frames[0].getElementsByClassName('vjs-contextmenu-ui-menu');

window.addEventListener("contextmenu", (event) => {
   console.log(contextMenu[0].style);
    contextMenu[0].style.backgroundColor = '#3080aa';
    contextMenu[0].style.opacity = '0.7';
});

window.addEventListener("keydown", function(event) {
 let contextMenu = document.getElementsByClassName('vjs-contextmenu-ui-menu');
    const key = event.key; 
   // &&  contextMenu[0] !== undefined
    if (key === "Escape") {
         contextMenu[0].style.display = 'none !important';
         var i;
        for (i = 0; i < contextMenu.length; i++) {
            contextMenu[i].style.display = 'none';
        }
    }
    return false; 
});

// --------------------------------------
// Try to make a button for copy code lines.
// --------------------------------------

var copy = function(target) {
    var textArea = document.createElement('textarea')
    textArea.setAttribute('style','width:1px;border:0;opacity:0;')
    document.body.appendChild(textArea)
    textArea.value = target.innerHTML
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
}

var pres = document.querySelectorAll(".comment-body > pre")
pres.forEach(function(pre){
  var button = document.createElement("button")
  button.className = "btn btn-sm"
  button.innerHTML = "copy"
  pre.parentNode.insertBefore(button, pre)
  button.addEventListener('click', function(e){
    e.preventDefault()
    copy(pre.childNodes[0])
  })
})
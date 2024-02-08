/////////////////////
// Light/Dark Mode //
/////////////////////
// Set to light on first load
if (localStorage.mode == undefined){
    localStorage.mode = "Light";
};
addMode();
// Change modes
function ModeSwitch(){
    if (localStorage.mode == "Light"){
        localStorage.mode = "Dark";
    }
    else if (localStorage.mode == "Dark"){
        localStorage.mode = "Light";
    }
    // In case of bugs / tinkering
    else{
        localStorage.mode = "Dark";
    }
    // Changes to mode
    addMode()
};
// Change body class to mode
function addMode(){
    if (localStorage.mode == "Light"){
        document.body.classList = "light";
    }
    else{
        document.body.classList = "dark";
    }
}


/////////////////////
/// Mouse Trailer ///
/////////////////////

const trailer = document.getElementById("trailer");
// Animation
const animateTrailer = (e, interacting) => {
    // Determine position
    const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;
    // Scale trailer
    const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${interacting ? 4 : 1})`
    }
    // Animate
    trailer.animate(keyframes, { 
        // Slows cursor down
        duration: 500, 
        fill: "forwards" 
    });
}
// Determines cursor type (Play icon for vids or arrow for links)
const getTrailerIcon = type => {
  switch(type) {
    case "video":
        // Get class of play icon
        return "▶";
    case "search":
        return "?";
    default:
        // Else is probably a link/ can become a link
        return ""; 
  }
}

// Check if its close to an interactable
window.onmousemove = e => {
    const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;
  
    const icon = document.getElementById("trailer-icon");
  
    animateTrailer(e, interacting);
    // Set dataset type of trailer based on interactable
    trailer.dataset.type = interacting ? interactable.dataset.type : "";
  
    if(interacting) {
        icon.innerText = getTrailerIcon(interactable.dataset.type);
    }
}
$(document).ready(function() {
    $(document).on('mousemove', function(e) {
      $('#circularcursor').css({
        left: e.pageX,
        top: e.pageY
      });
    })
});
// Sets trailer to visible if PC view
trailer.style.display = "flex";


var $loadingOverlay = $('#loadingOverlay');
// Show loading overlay when the page loads
$loadingOverlay.show();

// Hide loading overlay after animation duration (2 seconds in this case)
setTimeout(function () {
  $loadingOverlay.hide();
}, 2000);
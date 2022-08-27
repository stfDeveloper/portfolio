function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

//random moving div
function RandomObjectMover(obj, container) {
  this.$object = obj;
  this.$container = container;
  this.container_is_window = container === window;
  this.pixels_per_second = 250;
  this.current_position = { x: 0, y: 0 };
  this.is_running = false;
}

// Set the speed of movement in Pixels per Second.
RandomObjectMover.prototype.setSpeed = function (pxPerSec) {
  this.pixels_per_second = pxPerSec;
};

RandomObjectMover.prototype._getContainerDimensions = function () {
  if (this.$container === window) {
    return {
      height: this.$container.innerHeight,
      width: this.$container.innerWidth,
    };
  } else {
    return {
      height: this.$container.clientHeight,
      width: this.$container.clientWidth,
    };
  }
};

RandomObjectMover.prototype._generateNewPosition = function () {
  // Get container dimensions minus div size
  let containerSize = this._getContainerDimensions();
  let availableHeight = containerSize.height - this.$object.clientHeight;
  let availableWidth = containerSize.width - this.$object.clientHeight;

  // Pick a random place in the space
  let y = Math.floor(Math.random() * availableHeight);
  let x = Math.floor(Math.random() * availableWidth);

  return { x: x, y: y };
};

RandomObjectMover.prototype._calcDelta = function (a, b) {
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  return dist;
};

RandomObjectMover.prototype._moveOnce = function () {
  // Pick a new spot on the page
  let next = this._generateNewPosition();

  // How far do we have to move?
  let delta = this._calcDelta(this.current_position, next);

  // Speed of this transition, rounded to 2DP
  let speed = Math.round((delta / this.pixels_per_second) * 100) / 100;

  //console.log(this.current_position, next, delta, speed);

  this.$object.style.transition = "transform " + speed + "s linear";
  this.$object.style.transform =
    "translate3d(" + next.x + "px, " + next.y + "px, 0)";

  // Save this new position ready for the next call.
  this.current_position = next;
};

RandomObjectMover.prototype.start = function () {
  if (this.is_running) {
    return;
  }

  // Make sure our object has the right css set
  this.$object.willChange = "transform";
  this.$object.pointerEvents = "auto";

  this.boundEvent = this._moveOnce.bind(this);

  // Bind callback to keep things moving
  this.$object.addEventListener("transitionend", this.boundEvent);

  // Start it moving
  this._moveOnce();

  this.is_running = true;
};

RandomObjectMover.prototype.stop = function () {
  if (!this.is_running) {
    return;
  }

  this.$object.removeEventListener("transitionend", this.boundEvent);

  this.is_running = false;
};

// Init it
let a = new RandomObjectMover(document.getElementById("a"), window);
let b = new RandomObjectMover(document.getElementById("b"), window);
let c = new RandomObjectMover(document.getElementById("c"), window);
let d = new RandomObjectMover(document.getElementById("d"), window);
let e = new RandomObjectMover(document.getElementById("e"), window);
let f = new RandomObjectMover(document.getElementById("f"), window);
let g = new RandomObjectMover(document.getElementById("g"), window);
let h = new RandomObjectMover(document.getElementById("h"), window);
let i = new RandomObjectMover(document.getElementById("i"), window);
let j = new RandomObjectMover(document.getElementById("j"), window);
let k = new RandomObjectMover(document.getElementById("k"), window);
let l = new RandomObjectMover(document.getElementById("l"), window);
let m = new RandomObjectMover(document.getElementById("m"), window);

// Start it off

a.start();
b.start();
c.start();
d.start();
e.start();
f.start();
g.start();
h.start();
i.start();
j.start();
k.start();
l.start();
m.start();

function initMap() {
  // The location of argenta
  const argenta = { lat: 44.61397, lng: 11.83547 };
  // The map, centered at argenta
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: argenta,
  });
  // The marker, positioned at argenta
  const marker = new google.maps.Marker({
    position: argenta,
    map: map,
  });
}

window.initMap = initMap;

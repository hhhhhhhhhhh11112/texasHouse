window.addEventListener("scroll", function () {
  let navbar = document.getElementById("navbar");
  let image = document.getElementById("logo");
  let imgtoggle = document.getElementById("img-toggle");

  if (this.window.scrollY > 50) {
    navbar.classList.add("scrolled");
    if (image) {
      image.remove(); // Remove the image if it exists when scrolling down
    }
  } else {
    navbar.classList.remove("scrolled");

    // Only append a new image if one doesn't already exist
    if (!document.getElementById("logo")) {
      let newImage = document.createElement("img");
      newImage.id = "logo";
      newImage.src = "assets/img/Texas-House-1test - Copy.jpg";
      imgtoggle.appendChild(newImage);
    }
  }
});

/*img zoom*/
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery img");

  images.forEach(img => {
    img.addEventListener("click", (event) => {
      // If the image is zoomed, remove the zoom
      if (event.target.classList.contains("zoomed")) {
        event.target.classList.remove("zoomed");
      } else {
        // Remove zoom from all other images
        images.forEach(i => i.classList.remove("zoomed"));
        
        // Add zoom to the clicked image
        event.target.classList.add("zoomed");
      }
    });
  });

  // Click outside to close zoomed image
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".gallery img")) {
      images.forEach(img => img.classList.remove("zoomed"));
    }
  });
});



/*table booking*/
const restaurant = document.getElementById("restaurant");
const bookingForm = document.getElementById("bookingForm");
const selectedTable = document.getElementById("selectedTable");
let selectedTableId = null;

const tablePositions = [
  { id: 1, x: 40, y: 50 }, { id: 2, x: 125, y: 40 },
  { id: 3, x: 200, y: 50 }, { id: 4, x: 450, y: 50 },
  { id: 5, x: 535, y: 40 }, { id: 6, x: 610, y: 50 },
  { id: 7, x: 60, y: 155 }, { id: 8, x: 60, y: 310 },
  { id: 9, x: 227, y: 280 }, { id: 10, x: 460, y: 175 },
  { id: 11, x: 590, y: 150 }, { id: 12, x: 590, y: 300 },
  { id: 13, x: 35, y: 445 }, { id: 14, x: 123, y: 435 },
  { id: 15, x: 200, y: 445 }, { id: 16, x: 455, y: 445 },
  { id: 17, x: 547, y: 437 }, { id: 18, x: 630, y: 445 },
  { id: 19, x: 710, y: 435 }
];

function loadBookings() {
  return JSON.parse(localStorage.getItem("BookedTables")) || [];
}

function saveBookings(bookedTables) {
  localStorage.setItem("BookedTables", JSON.stringify(bookedTables));
}

function generateTables() {
  const bookedTables = loadBookings();

  const smallRectTables = [1, 3, 4, 6, 13, 15, 16, 18];
  const squareTables = [2, 5, 14, 17, 19];
  const bigRectTables = [7, 8, 11, 12];
  const circleTables = [9, 10];

  tablePositions.forEach(pos => {
    let table = document.createElement("div");
    table.classList.add("table");
    table.textContent = "T" + pos.id;
    table.dataset.id = pos.id;
    table.style.left = pos.x + "px";
    table.style.top = pos.y + "px";

    if (bookedTables.includes(pos.id)) {
      table.classList.add("booked");
    }
    if (smallRectTables.includes(pos.id)) {
      table.classList.add("small-rect");
    } else if (squareTables.includes(pos.id)) {
      table.classList.add("square");
    } else if (bigRectTables.includes(pos.id)) {
      table.classList.add("big-rect");
    } else if (circleTables.includes(pos.id)) {
      table.classList.add("circle");
    }


    table.onclick = () => selectTable(pos.id, table);
    restaurant.appendChild(table);
  });
}

function selectTable(id, table) {
  selectedTableId = id;
  selectedTable.textContent = "T" + id;
  bookingForm.style.display = "block";
}

function confirmBooking() {
  let table = document.querySelector(`.table[data-id='${selectedTableId}']`);
  if (!table.classList.contains("booked")) {
    table.classList.add("booked");
    let bookedTables = loadBookings();
    bookedTables.push(selectedTableId);
    saveBookings(bookedTables);
    alert("Table " + selectedTableId + " booked successfully!");
  }
  bookingForm.style.display = "none";
}

function unbookTable() {
  let table = document.querySelector(`.table[data-id='${selectedTableId}']`);
  if (table.classList.contains("booked")) {
    table.classList.remove("booked");
    let bookedTables = loadBookings().filter(id => id !== selectedTableId);
    saveBookings(bookedTables);
    alert("Table " + selectedTableId + " unbooked successfully!");
  }
  confirmBooking.style.display = "none";
}
generateTables();


function initMap() {
  var location = { lat: 33.84595, lng: 35.48635 }; // New York City
  var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: location,
      styles: [
          { elementType: "geometry", stylers: [{ color: "#1e1e1e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#1e1e1e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] }
      ]
  });
  var marker = new google.maps.Marker({ position: location, map: map });
}

// smooth scroll
$(document).ready(function(){
  $(".navbar .nav-link").on('click', function(event) {

      if (this.hash !== "") {

          event.preventDefault();

          var hash = this.hash;

          $('html, body').animate({
              scrollTop: $(hash).offset().top
          }, 700, function(){
              window.location.hash = hash;
          });
      } 
  });
});

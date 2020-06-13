const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//Save selected Movie index and Price into LS:
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update totals and count:
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //copy selected seats into an array, map through an array, return a new array indexes:
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  //store in local storage:
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //totals and counting:
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from localStorage and populate the UI:
function populateUI() {
  //repopulate seat selections from LS:
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  //repopulate qty and price of seats from LS:
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie selector event:
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  //create data of which movie and price to be sent to LS:
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

//Click on seat to choose event:
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

//Initial count and total:
updateSelectedCount();
// index.js
const url = 'http://localhost:3000/ramens';
const ramenName = document.querySelector('.ramen-name');
const ramenImage = document.querySelector('.ramen-image');
const ramenRestaurant = document.querySelector('.ramen-restaurant');
const ramenRating = document.querySelector('#ramen-rating');
const ramenComment = document.querySelector('#ramen-comment');
const menuDiv = document.querySelector('#ramen-menu');

function displayRamens() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const ramenMenuDiv = document.querySelector('#ramen-menu');

        data.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.restaurant = ramen.restaurant;
        img.dataset.rating = ramen.rating;
        img.dataset.comment = ramen.comment;
        ramenMenuDiv.appendChild(img);
      });
    });
}

const handleClick = (ramen) => {
  //gets the ramen detailed elements
  const image = document.querySelector('.detail-image');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.querySelector('#rating-display');
  const commentDisplay = document.querySelector('#comment-display');

  //update the ramen with selected ramen details
  image.src = ramen.image;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

menuDiv.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    const selectedRamen = {
      image: event.target.src,
      name: event.target.alt,
      restaurant: event.target.dataset.restaurant,
      rating: event.target.dataset.rating,
      comment: event.target.dataset.comment
    };
    handleClick(selectedRamen);
  }
});

// Create the new ramen 
const addSubmitListener = () => {
  const form = document.querySelector('#new-ramen');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const name = document.querySelector('#new-name').value;
    const restaurant = document.querySelector('#new-restaurant').value;
    const image = document.querySelector('#new-image').value;
    const rating = document.querySelector('#new-rating').value;
    const comment = document.querySelector('#new-comment').value;

    // new ramen 
    const newRamenElement = document.createElement('div');
    newRamenElement.innerHTML = `
      <img src="${image}" alt="${name}" data-restaurant="${restaurant}" data-rating="${rating}" data-comment="${comment}">
      <h4>${name}</h4>
      <p>Restaurant: ${restaurant}</p>
      <p>Rating: ${rating}</p>
      <p>Comment: ${comment}</p>
    `;
    // append the new ramen to the menu
  const ramenMenuDiv = document.querySelector('#ramen-menu');
  ramenMenuDiv.appendChild(newRamenElement);

  });
};
    
const main = () => {
  displayRamens(); //display original ramens
  addSubmitListener(); //add event listner for submission of new ramen
};
main();


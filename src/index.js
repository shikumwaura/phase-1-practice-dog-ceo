console.log('%c HI', 'color: firebrick')



const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener('DOMContentLoaded', () => {
  // 1. Fetch and display dog images
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      const dogImageContainer = document.getElementById('dog-image-container');
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = "Cute dog";
        img.style.width = "200px";
        img.style.margin = "10px";
        dogImageContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching dog images:', error));

  // Variables to store breeds and DOM elements
  const breedList = document.getElementById('dog-breeds');
  const dropdown = document.getElementById('breed-dropdown');
  let allBreeds = [];

  // 2. Fetch all dog breeds
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = Object.keys(data.message);
      renderBreeds(allBreeds);
    })
    .catch(error => console.error('Error fetching dog breeds:', error));

  // Render breeds helper function
  function renderBreeds(breeds) {
    breedList.innerHTML = '';
    breeds.forEach(breed => {
      const li = document.createElement('li');
      li.textContent = breed;
      breedList.appendChild(li);
    });
  }

  // 3. Change font color on click
  breedList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      event.target.style.color = 'blue';
    }
  });

  // 4. Filter breeds by dropdown selection
  dropdown.addEventListener('change', (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
    renderBreeds(filteredBreeds);
  });
});

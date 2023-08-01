import { hotelsData } from "./hotels.js";

function getFlagImageUrl(country) {
  const flagPath = `./assets/${country}-flag.png`;
  return flagPath;
}

function getPriceText(price) {
  return "$".repeat(price);
}

function showHoteles() {
  const containerElement = document.querySelector(".container--cards");

  hotelsData()
    .then((response) => response.json())
    .then((data) => {
      
      data.forEach((hotel) => {
        const articleElement = document.createElement("article");
        articleElement.classList.add("hotel"); 

        const nameElement = document.createElement("h2");
        nameElement.textContent = hotel.name;
        articleElement.appendChild(nameElement);
        
        const flagElement = document.createElement("img");
        flagElement.src = getFlagImageUrl(hotel.country);
        flagElement.alt = `Flag of ${hotel.country}`;
        flagElement.classList.add("img-flag");
        articleElement.appendChild(flagElement);

        const countryElement = document.createElement("p");
        countryElement.textContent = `${hotel.country}`;
        countryElement.classList.add("p-c");
        articleElement.appendChild(countryElement);

        const roomsElement = document.createElement("p");
        roomsElement.textContent = `${hotel.rooms} rooms`;
        roomsElement.classList.add("p-r");
        articleElement.appendChild(roomsElement);

        const priceElement = document.createElement("p");
        priceElement.textContent = getPriceText(hotel.price); 
        priceElement.classList.add("p-p");
        articleElement.appendChild(priceElement);

        const bookButton = document.createElement("button");
        bookButton.textContent = "Book it!";
        articleElement.appendChild(bookButton);

        const sizeElement = document.createElement("p");
        sizeElement.textContent = `Size: ${hotel.size}`;
        sizeElement.classList.add("p-s");
        articleElement.appendChild(sizeElement);

        const photoElement = document.createElement("img");
        photoElement.src = hotel.photo;
        photoElement.alt = hotel.name;
        photoElement.classList.add("img-hotel");
        articleElement.appendChild(photoElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = `Description: ${hotel.description}`;
        descriptionElement.classList.add("p-d");
        articleElement.appendChild(descriptionElement);

        containerElement.appendChild(articleElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching hotels data:", error);
    });
}

window.onload = showHoteles;

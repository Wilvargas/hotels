// index.js
import { hotelsData } from "./hotels.js";

function getFlagImageUrl(country) {
  const flagPath = `./assets/${country}-flag.png`;
  return flagPath;
}

function showHoteles() {
  const containerElement = document.querySelector(".container--cards");

  hotelsData()
    .then((response) => response.json())
    .then((data) => {
      // Iteramos sobre los datos para crear los elementos HTML para cada hotel
      data.forEach((hotel) => {
        // Creamos un elemento <article> para representar cada hotel
        const articleElement = document.createElement("article");
        articleElement.classList.add("hotel"); // Opcional: agregar una clase CSS "hotel" para estilos

        // Creamos y agregamos los elementos para mostrar la información del hotel
        const nameElement = document.createElement("h2");
        nameElement.textContent = hotel.name;
        articleElement.appendChild(nameElement);

        const countryElement = document.createElement("p");
        countryElement.textContent = `Country: ${hotel.country}`;
        articleElement.appendChild(countryElement);

        const priceElement = document.createElement("p");
        priceElement.textContent = `Price: ${hotel.price}`;
        articleElement.appendChild(priceElement);

        const sizeElement = document.createElement("p");
        sizeElement.textContent = `Size: ${hotel.size}`;
        articleElement.appendChild(sizeElement);

        const photoElement = document.createElement("img");
        photoElement.src = hotel.photo;
        photoElement.alt = hotel.name;
        articleElement.appendChild(photoElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = `Description: ${hotel.description}`;
        articleElement.appendChild(descriptionElement);

        const roomsElement = document.createElement("p");
        roomsElement.textContent = `Rooms: ${hotel.rooms}`;
        articleElement.appendChild(roomsElement);

        const flagElement = document.createElement("img");
        flagElement.src = getFlagImageUrl(hotel.country);
        flagElement.alt = `Flag of ${hotel.country}`;
        articleElement.appendChild(flagElement);

        // Agregamos el elemento <article> al contenedor (<div class="container--cards">)
        containerElement.appendChild(articleElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching hotels data:", error);
    });
}

window.onload = showHoteles;

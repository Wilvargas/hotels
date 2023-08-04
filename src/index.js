import { hotelsData } from "./hotels.js";

/* FLAGS */
function getFlagImageUrl(country) {
  const flagPath = `./assets/${country}-flag.png`;
  return flagPath;
}
/* PRICES SIMBOL $$$$ */
function getPriceText(price) {
  return "$".repeat(price);
}
/* FUNCTION - SHOW HOTELS  */
function showHotels() {
  const containerElement = document.querySelector(".container--cards");
  const allCountriesClick = document.getElementById("filter-countries");
  const allPricesClick = document.getElementById("filter-prices");
  const allSizesClick = document.getElementById("filter-sizes");
  const clearButton = document.getElementById("clearButton")
  
  const hotelSizes = (rooms) => {
    if (rooms <= 10) {
      return 1
    }
    if (rooms >10 && rooms <=20) {
      return 2
    }
    if (rooms >20) {
      return 3
    }
  } 

  /* LLAMADA A LA API PARA OBTENER LA INFO DE LOS HOTELES */
  hotelsData()
    .then((response) => response.json())
    .then((data) => {
      /* ITERAR SOBRE LA DATA Y CREAR ELEMENTOS */
      data.forEach((hotel) => {
        const articleElement = document.createElement("article");
        articleElement.classList.add("hotel"); 
        /* TITLE H2 - CARDS */
        const nameElement = document.createElement("h2");
        nameElement.textContent = hotel.name;
        articleElement.appendChild(nameElement);
        /* IMG FLAGS */
        const flagElement = document.createElement("img");
        flagElement.src = getFlagImageUrl(hotel.country);
        flagElement.alt = `Flag of ${hotel.country}`;
        flagElement.classList.add("img-flag");
        articleElement.appendChild(flagElement);
        /* COUNTRY PARAGRAPH */
        const countryElement = document.createElement("p");
        countryElement.textContent = `${hotel.country}`;
        countryElement.classList.add("p-c");
        articleElement.appendChild(countryElement);
        /* ROOMS PARAGRAPH */
        const roomsElement = document.createElement("p");
        roomsElement.textContent = `${hotel.rooms} rooms`;
        roomsElement.classList.add("p-r");
        articleElement.appendChild(roomsElement);
        /* PRICE PARAGRAPH */
        const priceElement = document.createElement("p");
        priceElement.textContent = getPriceText(hotel.price); 
        priceElement.classList.add("p-p");
        articleElement.appendChild(priceElement);
        /* BUTTON - BOOK IT! */
        const bookButton = document.createElement("button");
        bookButton.textContent = "Book it!";
        articleElement.appendChild(bookButton);
        /* HOTEL.SIZE */
        const sizeElement = document.createElement("p");
        sizeElement.textContent = `Size: ${hotel.size}`;
        sizeElement.classList.add("p-s");
        articleElement.appendChild(sizeElement);
        /* IMG HOTEL */
        const photoElement = document.createElement("img");
        photoElement.src = hotel.photo;
        photoElement.alt = hotel.name;
        photoElement.classList.add("img-hotel");
        articleElement.appendChild(photoElement);
        /* DESCRIPTION */
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = `Description: ${hotel.description}`;
        descriptionElement.classList.add("p-d");
        articleElement.appendChild(descriptionElement);
        /* ASIGNACIÓN DE PAÍS, PRECIO Y TAMAÑOS */
        articleElement.classList.add(`country-${hotel.country}`);
        articleElement.classList.add(`price-${hotel.price}`);
        articleElement.classList.add(`size-${hotelSizes(hotel.rooms)}`);
        containerElement.appendChild(articleElement);
      });
      
      /* CREACIÓN DE EVENTOS SOBRE FILTROS - FILTRAR HOTELES Y LIMPIAR BOTÓN */
      /* la función filterHotels se ejecutará cada vez que el Elemento contenido en allCountriesClick cambie */
      allCountriesClick.addEventListener("change", () => filterHotels());
      allPricesClick.addEventListener("change", () => filterHotels());
      allSizesClick.addEventListener("change", () => filterHotels());
      clearButton.addEventListener("click", () => clearFilters());

      filterHotels();
    })
    .catch((error) => {
      console.error("Error fetching hotels data:", error);
    });
}
/* FILTER HOTELS */
function filterHotels() {
  const selectedCountry = document.getElementById("filter-countries").value;
  const selectedPrice = document.getElementById("filter-prices").value;
  const selectedSize = document.getElementById("filter-sizes").value;
  const hotelCards = document.querySelectorAll(".hotel");

  console.log(hotelCards[0].classList);


  /* VERIFICO SI UNA CARD DEBE MOSTRARSE O NO */
  hotelCards.forEach(card => {
    const countryMatch = selectedCountry === "all" ? true : card.classList[1].includes(selectedCountry);
    const priceMatch = selectedPrice === "all" ? true : card.classList[2].includes(selectedPrice);
    const sizeMatch = selectedSize === "all" ? true : card.classList[3].includes(selectedSize);

    console.log(selectedCountry,selectedPrice,selectedSize);

    if (countryMatch && priceMatch && sizeMatch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    };
  });
};


function clearFilters() {
  document.getElementById("filter-countries").value = "all";
  document.getElementById("filter-prices").value = "all";
  document.getElementById("filter-sizes").value = "all";
  
  filterHotels();
}
window.onload = showHotels;
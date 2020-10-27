import * as number from "./number.js";

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const searchInput = document.querySelector("#searchInput");
const suggestions = document.querySelector(".suggestions");
let cities = [];

// Function to get all the places from the endpoint the cities array
async function getPlaces() {
  const response = await fetch(endpoint);
  const data = await response.json();
  cities = [...data];
  console.log(cities);
}

// Function to filter the main cities array
function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // figure out the matches
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.city.match(regex);
  });
}

// Function to bind the filtered array to the view
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const listElement = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${number.numberWithCommas(
        place.population
      )}</span>
    </li>
    `;
    })
    .join("");
  suggestions.innerHTML = listElement;
}

getPlaces();
searchInput.addEventListener("keyup", displayMatches);

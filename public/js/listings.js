const filterButton = document.getElementById("filter-button");
const unfilterButton = document.getElementById("unfilter-button");

filterButton.addEventListener("click", () => {
  const listings = document.querySelectorAll(".property-container");
  const bedroomFilter = document.getElementById("bedrooms");
  const bathroomFilter = document.getElementById("bathrooms");
  const rentFilter = document.getElementById("max-rent");

  if (!bedroomFilter.value && !bathroomFilter.value && !rentFilter.value)
    return;

  listings.forEach((listing) => {
    const numberOfBedrooms = +listing.childNodes[3].childNodes[3].innerHTML.trim()[0];
    const numberOfBath = +listing.childNodes[3].childNodes[3].innerHTML.trim()[0];
    const rent = +listing.childNodes[5].childNodes[1].innerHTML
      .trim()
      .split("/")[0]
      .slice(1);

    console.log(numberOfBedrooms)
    if (bedroomFilter.value && +bedroomFilter.value !== numberOfBedrooms) {
      listing.classList.add("undisplayed");
    }
    if (bathroomFilter.value && +bathroomFilter.value !== numberOfBath) {
      listing.classList.add("undisplayed");
    }
    if (rentFilter.value && rent - 1 >= +rentFilter.value) {
      listing.classList.add("undisplayed");
    }
  });

  filterButton.classList.add("undisplayed");
  unfilterButton.classList.remove("undisplayed");
});

export default class City {
  constructor(
    name,
    countryName,
    population,
    latitude,
    longitude,
    currentTemp = 0,
    attractions
  ) {
    this.name = name;
    this.countryName = countryName;
    this.population = population;
    this.latitude = latitude;
    this.longitude = longitude;
    this.currentTemp = currentTemp;
    this.attractions = {}; // populated after api call
    this.attractionPerCatLimit = 5; // how many attractions per category to collect in the pouplateAttractions function
    this.id = name + latitude;
  }
  // Collects the first 5 attraction names for each selected category
  populateAttractinos(apiData, selectedCategories) {
    if (apiData?.length > 0 && selectedCategories?.length > 0) {
      let catsToMatch = selectedCategories;
      // tested on GeoJSON format returned from the Placed API
      apiData.forEach((feature) => {
        if (catsToMatch.length > 0) {
          const matchingCat = catsToMatch.find((cat) =>
            feature.kinds.split(",").includes(cat)
          );
          if (feature.name) {
            this.attractions[matchingCat] = this.attractions[matchingCat] || [];
            if (
              this.attractions[matchingCat].length < this.attractionPerCatLimit
            ) {
              this.attractions[matchingCat].push(feature.name);
            } else {
              catsToMatch = catsToMatch.filter((item) => item !== matchingCat);
            }
          }
        }
      });
    }
  }
}

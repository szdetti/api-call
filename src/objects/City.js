export default class City {
  constructor(name, countryName, population, latitude, longitude, weather) {
    this.name = name;
    this.countryName = countryName;
    this.population = population;
    this.latitude = latitude;
    this.longitude = longitude;
    this.weather = weather;
    this.id = name + latitude;
  }
}

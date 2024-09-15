import * as fs from 'fs';
import * as path from 'path';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: number;

  constructor(name: string, id: number) {
      this.name = name;
      this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private historyFilePath: string;
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file

    constructor() {
        this.historyFilePath = path.join(__dirname, 'searchHistory.json');
    }

    public read(): any {
        try {
            const data = fs.readFileSync(this.historyFilePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading search history:', error);
            return null;
        }
    }
    public write(cities: City[]): void {
      try {
          const data = JSON.stringify(cities, null, 2);
          fs.writeFileSync(this.historyFilePath, data, 'utf-8');
      } catch (error) {
          console.error('Error writing search history:', error);
      }
  }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects

  public getCities(): City[] {
    const data = this.read();
    if (data) {
        return data.map((city: any) => new City(city.name, city.id));
    }
    return [];
}
  // TODO Define an addCity method that adds a city to the searchHistory.json file

  public addCity(city: string): void {
  const cities = this.getCities();
  const newCity = new City(city, cities.length + 1);
  cities.push(newCity);
  this.write(cities);
}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file

  public removeCity(id: number): void {
  let cities = this.getCities();
  cities = cities.filter(city => city.id !== id);
  this.write(cities);
}
}
export default HistoryService;
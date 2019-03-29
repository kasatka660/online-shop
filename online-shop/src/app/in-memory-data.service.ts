import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const shopItems = [
      { id: 1, name: 'Item number one', description: 'Lorem ipsum dolor sit amet', price: 10, inStock: 10},
      { id: 2, name: 'Item number two', description: 'Lorem ipsum dolor sit amet', price: 20, inStock: 2},
      { id: 3, name: 'Item number three', description: 'Lorem ipsum dolor sit amet', price: 25, inStock: 5},
      { id: 4, name: 'Item number four', description: 'Lorem ipsum dolor sit amet', price: 100, inStock: 10},
      { id: 5, name: 'Item number five', description: 'Lorem ipsum dolor sit amet', price: 120, inStock: 100},
    ]
    return { shopItems }
  }
}

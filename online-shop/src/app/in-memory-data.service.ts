import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const shopItems = [
      { id: 1, name: 'Item number one', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-1.jpg",  price: 10, inStock: 10},
      { id: 2, name: 'Item number two', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-2.jpg", price: 20, inStock: 2},
      { id: 3, name: 'Item number three', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-3.jpg", price: 25, inStock: 5},
      { id: 4, name: 'Item number four', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-4.jpg", price: 100, inStock: 10},
      { id: 5, name: 'Item number five', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-5.jpg", price: 120, inStock: 100},
      { id: 6, name: 'Item number one', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-6.jpg", price: 10, inStock: 10},
      { id: 7, name: 'Item number two', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-1.jpg", price: 20, inStock: 2},
      { id: 8, name: 'Item number three', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-2.jpg", price: 25, inStock: 5},
      { id: 9, name: 'Item number four', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-3.jpg", price: 100, inStock: 10},
      { id: 10, name: 'Item number five', description: 'Lorem ipsum dolor sit amet', imgSrc: "assets/images/img-4.jpg", price: 120, inStock: 100},
    ];
    const users = [];
    return { shopItems, users }
  }

  genId(users): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }


}

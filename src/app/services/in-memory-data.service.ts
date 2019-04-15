import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ShopItem } from '../models/shop-item.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const shopItems: ShopItem[] = [
      { id: 1, name: 'Item number one', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-1.jpg',  price: 10 },
      { id: 2, name: 'Item number two', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-2.jpg', price: 20 },
      { id: 3, name: 'Item number three', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-3.jpg', price: 25 },
      { id: 4, name: 'Item number four', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-4.jpg', price: 100 },
      { id: 5, name: 'Item number five', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-5.jpg', price: 120 },
      { id: 6, name: 'Item number six', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-6.jpg', price: 10 },
      { id: 7, name: 'Item number seven', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-1.jpg', price: 20 },
      { id: 8, name: 'Item number eight', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-2.jpg', price: 25 },
      { id: 9, name: 'Item number nine', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-3.jpg', price: 100 },
      { id: 10, name: 'Item number ten', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-4.jpg', price: 120 },
      { id: 11, name: 'Item number eleven', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-1.jpg',  price: 10 },
      { id: 12, name: 'Item number twelve', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-2.jpg', price: 20 },
      { id: 13, name: 'Item number thirteen', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-3.jpg', price: 25 },
      { id: 14, name: 'Item number fourteen', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-4.jpg', price: 100 },
      { id: 15, name: 'Item number fifteen', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-5.jpg', price: 120 },
      { id: 16, name: 'Item number sixteen', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-6.jpg', price: 10 },
      { id: 17, name: 'Item number seventeen', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-1.jpg', price: 20 },
      { id: 18, name: 'Item number eighteen', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-2.jpg', price: 25 },
      { id: 19, name: 'Item number nineteen', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-3.jpg', price: 100 },
      { id: 20, name: 'Item number twenty', description: 'Lorem ipsum dolor sit amet', imgSrc: 'assets/images/img-4.jpg', price: 120 },
    ];
    const users: User[] = [
      { id: 1, email: 'lenach241@gmail.com', password: '1234567'},
      { id: 2, email: 'test@test.com', password: 'test123'},
    ];
    return { shopItems, users };
  }

  genId(users): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }


}

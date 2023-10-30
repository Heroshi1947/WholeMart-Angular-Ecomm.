import { HttpClient } from '@angular/common/http';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html',
 
})
export class CartComponent implements OnInit{
cart: Cart = {items:[{
  product: 'https://via.placeholder.com/150',
  name: 'Snickers',
  price: 50,
  quantity: 1,
  id:1
},
{
  product: 'https://via.placeholder.com/150',
  name: 'Snickers',
  price: 50,
  quantity: 1,
  id:1
},

{
  product: 'https://via.placeholder.com/150',
  name: 'Snickers',
  price: 50,
  quantity: 1,
  id:1
}

]};

dataSource: Array<CartItem> = [];
displayedColumns: Array<string>= [
'product',
'name',
'price',
'quantity',
'total',
'action'
]


constructor(private cartService:CartService , private http: HttpClient){}

ngOnInit(): void {
  this.cartService.cart.subscribe((_cart: Cart) => {
    this.cart = _cart;
    this.dataSource = this.cart.items
    });
}

getTotal(items: Array<CartItem>): number{
  return this.cartService.getTotal(items)
}

onClearCart():void{
  this.cartService.clearCart();
}

onRemoveFromCart(item: CartItem): void{
  this.cartService.removeFromCart(item)
}

onAddQuantity(item: CartItem): void{
  this.cartService.addToCart(item)
}

onRemoveQuantity(item: CartItem): void{
  this.cartService.removeQuantity(item)
}

onCheckout(): void {
  this.http.post('/checkout', {
  items: this.cart.items
  }).subscribe(async (res: any) => {
  let stripe = await loadStripe('pk_test_51O6x9MSB83kpNroC7yNb4iEAdF2NOMWzev7ARXeS0apHHS84sTKVmny7JAEjsuqwnNaZYxo5z5MHIYZRrcOut8Mg00nFkEuEeA');
  stripe?.redirectToCheckout({
  sessionId: res.id
})
}); 
}
  

}

import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './assets/css/App.css';
import { Navbar } from './components/Navbar';
import { Cart } from './pages/Cart';
import { Catalog } from './pages/Catalog';
import { NotFound } from './pages/NotFound';
import { TCartItem, TProduct } from './types';
import request from './helpers/request';
import { withMinOrder } from './middleware/withMinOrder';
import { withBatch } from './middleware/withBatch';
import { withMaxQuantity } from './middleware/withMaxQuantity';
import { checkOrderAbility } from './middleware/checkOrderAbility';


function App() {
  const placeholderProduct = {
    id: 0,
    imageSrc: "/images/loading.svg",
    name: "Loading...",
    priceCents: 0,
    max: 0,
    batch: 1,
    minOrder: 0
  }

  const placeholderCartItem = {
    ...placeholderProduct,
    quantity: 0,
    productId: 0
  }

  const [products, setProducts] = useState<Array<TProduct>>([placeholderProduct]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<Array<TCartItem>>([placeholderCartItem]);
  const endCursor = useRef<string>('');
  const hasNextPage = useRef<boolean>(false);
  const catalogRef = useRef<Array<TProduct>>([]);

  async function loadCartId() {
    let savedId = localStorage.getItem('cartId');

    if(!savedId) {
      let cart = await request<any>('carts', 'POST', {});
      savedId = cart.id;
      localStorage.setItem('cartId', String(savedId))
    }
    setCartId(Number(savedId));
  }

  function loadProducts() {
    request<{data: Array<TProduct>, pageInfo: any}>('products')
    .then(products => {
      setProducts(products.data);
      catalogRef.current = products.data; // storing products with useRef
      endCursor.current = products.pageInfo.endCursor;
      hasNextPage.current = products.pageInfo.hasNextPage;
    });
  }

  function loadCart() {
    request<any>(`carts/${cartId}`)
    .then(data => {
      setCartItems(data.cartItems);
    })
    .catch(err => {
      console.log(err);
      setCartItems([]);
    });
  }
  
  function addToCart(productId: number, quantity: number) {
    const requestBody = {
      productId: productId,
      quantity: quantity,
    };

    request<any>(`carts/${cartId}/cart_items`, 'POST', requestBody)
      .then(function (data) {
        setCartItems(data.cartItems);
      })
      .catch(error => console.log(error));
  }


  function removeFromCart (cartItemId: number) {
    request<any>(`carts/${cartId}/cart_items/${cartItemId}`, 'DELETE')
      .then(function (data) {
        setCartItems(data.cartItems);
      })
      .catch(error => console.log(error));
  }


  function updateCartItem (cartItemId: number, quantity: number) {
    request<any>(`carts/${cartId}/cart_items/${cartItemId}`, 'PUT', {quantity})
      .then(function (data) {
        setCartItems(data.cartItems);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {loadCartId()}, []);

  useEffect(() => {
      if(cartId) {
        loadProducts();
        loadCart();
      }   
  }, [cartId]);

  const CartPageWithMinOrderMaxAndBatch = (
    withMaxQuantity(withBatch(withMinOrder(checkOrderAbility(Cart))))
  );

  const CatalogPageWithMinOrderMaxAndBatch = withMaxQuantity(withBatch(withMinOrder(Catalog)));

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar items={cartItems.length} amount={cartItems.reduce((a,b) => a+(b.priceCents*b.quantity), 0)} />
        </header>

        <div className="App-main">
          <Switch>
            <Route path="/cart">
              <CartPageWithMinOrderMaxAndBatch
                cartId={cartId}
                amount={cartItems.reduce((a,b) => a+(b.priceCents*b.quantity), 0)}
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateCartItem={updateCartItem}
               />
            </Route>
            <Route exact path="/">
              <CatalogPageWithMinOrderMaxAndBatch
                products={products}
                cart={cartItems.reduce((a: any,b) => {a[b.productId] = b.id;return a}, {})} // mapping product id to cart item id
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                setProducts={setProducts}
                hasNextPage={hasNextPage}
                endCursor={endCursor}
                catalogRef={catalogRef}
              />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

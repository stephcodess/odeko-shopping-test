import { useEffect, useState } from "react";
import { CartItemCard } from "../components/CartItemCard";
import { formatCentsToDollars } from "../helpers/formatCentsToDollars";
import request from "../helpers/request";
import { TCartItem } from "../types";

export interface CartProp {
  cartItems: Array<TCartItem>,
  removeFromCart(cartItemId: number): void,
  updateCartItem(cartItemId: number, quantity: number): void,
  cartId: number | null,
  amount: number,
  canOrder?: boolean;
}

/**
 * @function Cart
 * @param props {
 * cartItems: Array<TCartItem>,
 * removeFromCart(cartItemId: number): void,
 * updateCartItem(cartItemId: number, quantity: number): void,
 * cartId: number | null,
 * amount: number,
 * canOrder?: boolean;
 * }
 * @returns A component for displaying all items added to cart
 */
export function Cart(props: CartProp) {
  const cartItems = props.cartItems;
  const cartId = props.cartId;
  const totalCents = props.amount;

  const [loading, setLoading] = useState<boolean>(false);
 // a function to place the users order
  function placeOrder() {
    setLoading(true);
    request<any>(`orders`, 'POST', { cartId, totalCents })
      .then(function (data) {
        alert('Your order has been placed');
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        alert('Couldn\'t place your order at the moment');
        setLoading(false);
      });
  }

  return (
    <div className="App-row">
      <div className="App-product-catalog">
        {cartItems.map((cartItem: TCartItem) =>
          <CartItemCard
            cartItem={cartItem}
            removeFromCart={props.removeFromCart}
            updateCartItem={props.updateCartItem}
            key={cartItem.id}
          />
        )}
      </div>
      <div className="App-row">
        <div className="App-product-subtotal">
          <hr />
          <div className="App-righter">
            <div className="App-flex">
              <div className="App-flex-col App-product-subtotal-key">
                Subtotal:
              </div>
              <div className="App-flex-col App-product-subtotal-value">
                {formatCentsToDollars(totalCents)}
              </div>
            </div>
          </div>
          {
            props.canOrder ? <div className="App-product-proceed">
              <button className="" onClick={placeOrder} disabled={loading}>
                {loading ? 'Loading' : 'Proceed'}
              </button>
            </div> :
              <div className="App-product-error">
                Some items do not meet minimum order requirement
              </div>
          }

        </div>
      </div>
    </div>

  );
}

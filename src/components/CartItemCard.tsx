import { formatCentsToDollars } from "../helpers/formatCentsToDollars";
import HOST from "../helpers/HOST";
import '../assets/css/ProductCard.css'
import { CartIcon } from "./CartIcon";
import React, { useState } from "react";
import { TCartItem } from "../types";

export interface CartItemProp {
    cartItem: TCartItem,
    removeFromCart(cartItemId: number): void,
    updateCartItem(cartItemId: number, quantity: number): void
    /** Removed step and max as they are now part of product as batch and max */
}

export function CartItemCard({
    cartItem,
    removeFromCart,
    updateCartItem
    /** Removed step and max as they are now part of product as batch and max */
}: CartItemProp) {
    const [quantity, setQuantity] = useState<number>(cartItem["quantity"] || 1);

    function handleQuantityChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setQuantity(Number(e.currentTarget.value));
        updateCartItem(cartItem.id, Number(e.currentTarget.value));
    }

    return (
        <div className="App-product" key={cartItem["id"]}>
            <div className="App-product-content">
                <div className="App-product-icon">
                    <img src={`${HOST}${cartItem["imageSrc"]}`} alt="" />
                </div>
                <div className="App-product-info">
                    <h3 className="App-product-name">{cartItem["name"]}</h3>
                    <div className="App-product-price">
                        <span>
                            {formatCentsToDollars(cartItem["priceCents"])}
                        </span>
                        <span className="App-product-total">
                            {formatCentsToDollars(cartItem["priceCents"] * quantity)}
                            {
                                cartItem.minOrder ?
                                    ` / ${cartItem.minOrder ? formatCentsToDollars(cartItem["minOrder"]) : ''}`
                                    : ''
                            }

                        </span>
                    </div>
                    <div className="App-product-cart">
                        <button name="remove" className="warning" data-testid="removeFromCart" onClick={() => removeFromCart(cartItem["id"])}>
                            <CartIcon className={"App-product-cart-icon"} />
                            Remove from cart
                        </button>
                        <select data-testid="select" className="App-product-quantity" onChange={handleQuantityChange}>
                            {
                                Array(cartItem.max / cartItem.batch).fill(null).map((e, i) => (
                                    <option
                                        data-testid="select-option"
                                        value={(i + 1) * cartItem.batch}
                                        key={i}
                                        selected={(i + 1) * cartItem.batch === quantity ? true : false} //Should be selected if equal to quantity provided
                                    >
                                        {(i + 1) * cartItem.batch}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
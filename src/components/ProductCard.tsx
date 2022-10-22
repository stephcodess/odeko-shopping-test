import { formatCentsToDollars } from "../helpers/formatCentsToDollars";
import HOST from "../helpers/HOST";
import '../assets/css/ProductCard.css'
import { CartIcon } from "./CartIcon";
import { useState } from "react";
import { TProduct } from "../types";

export interface ProductCardProp {
    product: TProduct,
    addToCart(cartItemId: number, quantity?: number): void,
    removeFromCart(cartItemId: number): void,
    cartItemId?: number | undefined
}

/**
 * @function ProductCard This component is the card that display the products on the catalog
 * @param {
    product,
    addToCart,
    removeFromCart,
    cartItemId=undefined,
    /** Removed step as it is now part of product as batch 
* }
 * @returns 
 */
export function ProductCard({
    product,
    addToCart,
    removeFromCart,
    cartItemId = undefined,
    /** Removed step as it is now part of product as batch */
}: ProductCardProp) {
    return (
        <div className="App-product" key={product["id"]}>
            <div className="App-product-content">
                <div className="App-product-icon">
                    <img src={`${HOST}${product["imageSrc"]}`} alt="" />
                </div>
                <div className="App-product-info">
                    <h3 className="App-product-name">{product["name"]}</h3>
                    <div className="App-product-price">
                        <span>
                            {formatCentsToDollars(product["priceCents"])}
                        </span>
                        {
                            product.batch > 1 ? <span className="App-product-total">
                                (min order: {product.batch})
                            </span> : null
                        }

                    </div>
                    <div className="App-product-cart">
                        {
                            cartItemId ? (
                                <button className="warning" onClick={() => removeFromCart(cartItemId)}>
                                    <CartIcon className={"App-product-cart-icon"} />
                                    Remove from cart
                                </button>
                            ) : (
                                <button onClick={() => addToCart(product["id"], product.batch)}>
                                    <CartIcon className={"App-product-cart-icon"} />
                                    Add {product.batch > 1 ? product.batch : ''} to cart
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
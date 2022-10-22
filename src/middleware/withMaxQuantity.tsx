import { CartProp } from "../pages/Cart";
import { CatalogProp } from "../pages/Catalog";
import { TCartItem, TProduct } from "../types";
/**
 * @function withMaxQuantity
 * @param Component 
 * @description checks if max quantity is present in the response or not and return a component.
 * @returns a new component that matches the condition
 */
export const withMaxQuantity = (Component: any) => (props: CartProp | CatalogProp) => {
    let items = (props as CartProp).cartItems || (props as CatalogProp).products;
    let itemsWithBatch = items.map((c :TCartItem | TProduct) => {
        if('AEIOU'.includes(c.name.charAt(0))) return {...c, max: 25}
        else return {...c, max: 10};
    })
    if((props as CartProp).cartItems) {
        return <Component {...props} cartItems={itemsWithBatch} /> // if the product is in cart
    } else {
        return <Component {...props} products={itemsWithBatch} /> // if the product is not in cart
    }
}
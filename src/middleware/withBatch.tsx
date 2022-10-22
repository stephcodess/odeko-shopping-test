import { CartProp } from "../pages/Cart";
import { CatalogProp } from "../pages/Catalog";
import { TCartItem, TProduct } from "../types";

export const withBatch = (Component: any) => (props: CartProp | CatalogProp) => {
    let items = (props as CartProp).cartItems || (props as CatalogProp).products;
    let itemsWithBatch = items.map((c :TCartItem | TProduct) => {
        if('AEIOU'.includes(c.name.charAt(0))) return {...c, batch: 5}
        else return {...c, batch: 1};
    })
    if((props as CartProp).cartItems) {
        return <Component {...props} cartItems={itemsWithBatch} />
    } else {
        return <Component {...props} products={itemsWithBatch} />
    }
}
import { CartProp } from "../pages/Cart";
import { CatalogProp } from "../pages/Catalog";
import { TCartItem, TProduct } from "../types";

/**
 * @function withMinOrder
 * @param Component The new component to pass the logic to
 * @returns A new component taht satisfues the condition
 */
export const withMinOrder = (Component: any) => (props: CartProp | CatalogProp) => {
    let items = (props as CartProp).cartItems || (props as CatalogProp).products;
    let itemsWitMinOrder = items.map((c :TCartItem | TProduct) => {
        if(c.name.charAt(0) > 'N') return {...c, minOrder: 50000}
        else return { ...c, minOrder: 100000}
    })
    if((props as CartProp).cartItems) {
        return <Component {...props} cartItems={itemsWitMinOrder} />
    } else {
        return <Component {...props} products={itemsWitMinOrder} />
    }    
}
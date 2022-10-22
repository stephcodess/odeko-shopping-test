import { useEffect, useState } from "react";
import { CartProp } from "../pages/Cart";
/**
 * @function checkOrderAbility
 * @description Higher order Component which takes in a component and returns another component
 * @param Component The passed commponent to share logic with
 * @returns A new component with the passed logics
 */
export const checkOrderAbility = (Component: any) => (props: CartProp) => {
    const [ canOrder, setCanOrder ] = useState(true); // determines if an order can be placed
    
    useEffect(() => {
        setCanOrder(true);
        let items = props.cartItems
        for (let item of items) {
            // console.log(item.minOrder, item.priceCents, item.quantity)
            if(item.minOrder > (item.priceCents * item.quantity)) {
                setCanOrder(false);
                break;
            }
        }
    }, props.cartItems)
    

    return <Component {...props} canOrder={canOrder} /> // the new component
}
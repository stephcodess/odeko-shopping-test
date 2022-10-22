import React from 'react';
import { findByTestId, fireEvent, getAllByTestId, getByTestId, render, screen } from '@testing-library/react';
import { CartItemCard } from './CartItemCard';
test("The cart item card renders successfully", async () => {
    const product = {
        "id": 14732,
        "name": "Neat laminated knives",
        "priceCents": 3221,
        "imageSrc": "/images/3274.svg",
        "createdAt": "2022-09-21T18:08:26Z",
        "updatedAt": "2022-09-21T18:08:26Z",
        "max": 10,
        "batch": 10,
        "productId": 14732,
        "quantity": 10,
        "minOrder": 10
    }
    function updateCartItem(a: number, b: number): void {
        return
    }
    function removeFromCart(a: number): void {
        return
    }
    render(<CartItemCard updateCartItem={updateCartItem} cartItem={product} removeFromCart={removeFromCart} />)
    expect(await screen.findByText(/Neat laminated knives/i)).toBeInTheDocument();
    const allres = await screen.findAllByTestId("removeFromCart");
    expect(allres[0]).toBeInTheDocument()
    
})


test("Tests the quantity dropdown select", async () => {
    const product = {
        "id": 14732,
        "name": "Neat laminated knives",
        "priceCents": 3221,
        "imageSrc": "/images/3274.svg",
        "createdAt": "2022-09-21T18:08:26Z",
        "updatedAt": "2022-09-21T18:08:26Z",
        "max": 10,
        "batch": 2,
        "productId": 14732,
        "quantity": 4,
        "minOrder": 1
    }
    function updateCartItem(a: number, b: number): void {
        return
    }
    function removeFromCart(a: number): void {
        return
    }
    render(<CartItemCard updateCartItem={updateCartItem} cartItem={product} removeFromCart={removeFromCart} />)
    fireEvent.change(await screen.findByTestId("select"), { target: { value: 4 } })
    let options: Array<HTMLOptionElement> = screen.getAllByTestId('select-option')
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
})


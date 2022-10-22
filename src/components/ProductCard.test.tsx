import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
test("The product card renders successfully", async() => {
    const product = {
        "id": 14732,
        "name": "Neat laminated knives",
        "priceCents": 3221,
        "imageSrc": "/images/3274.svg",
        "createdAt": "2022-09-21T18:08:26Z",
        "updatedAt": "2022-09-21T18:08:26Z",
        "max": 10,
        "batch": 10,
        "minOrder": 10
    }
    function addToCart(a: number, b:number): void{
        return
    }
    function removeFromCart(a: number): void{
        return
    }
    render(<ProductCard addToCart={addToCart} product={product} removeFromCart={removeFromCart}/>)

    expect(await screen.findByText(/Neat laminated knives/i)).toBeInTheDocument();
})
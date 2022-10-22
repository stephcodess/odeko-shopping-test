export interface TProduct {
    id: number,
    name: string,
    priceCents: number,
    imageSrc: string,
    max: number,
    batch: number,
    minOrder: number;
}

export interface TCartItem extends TProduct {
    productId: number,
    quantity: number;
}
import { EffectCallback, SetStateAction, useEffect, useRef, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import request from "../helpers/request";
import SearchProductInCatalog from "./productSearch";
import { TProduct } from "../types";

export interface CatalogProp {
  products: Array<TProduct>,
  addToCart(cartItemId: number, quantity?: number): void,
  removeFromCart(cartItemId: number): void,
  setProducts(products: Array<TProduct>): void,
  hasNextPage: any,
  endCursor: any,
  catalogRef: any,
  cart: any;
}

/**
 * @function Catalog
 * @param props {
 * products: Array<TProduct>,
  addToCart(cartItemId: number, quantity?: number): void,
  removeFromCart(cartItemId: number): void,
  setProducts(products: Array<TProduct>): void,
  hasNextPage: any,
  endCursor: any,
  catalogRef: any,
  cart: any;
}
 * @returns A component to display all the products
 */
export function Catalog(props: CatalogProp) {

  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResponse, setSearchResponse] = useState<TProduct[]>([]);

  useEffect(()=>{
    if (searchTerm !== "") {
      setSearchResponse(props.products.filter((prod) => prod.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1))
    }else{
      setSearchResponse(props?.products)
    }
  },[props.products, searchTerm])

  useEffect((): ReturnType<EffectCallback> => {
    const infinteScroll = async () => {
      if (props.hasNextPage.current && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
        setLoading(true);
        request<{ data: Array<TProduct>, pageInfo: any }>('products?after=' + props.endCursor.current)
          .then(products => {
            props.catalogRef.current = [...props.catalogRef.current, ...products.data];
            props.setProducts([...props.catalogRef.current]);
            props.endCursor.current = products.pageInfo.endCursor;
            props.hasNextPage.current = products.pageInfo.hasNextPage;
            setLoading(false);
          });
      }
    }
    window.onscroll = infinteScroll;

    return (): void => { window.onscroll = null; }
  }, [])
  
  return (
    <div>
      <SearchProductInCatalog setSearchTerm={(val: SetStateAction<string>)=>setSearchTerm(val)} />
      <div className="App-product-catalog">
        {searchResponse?.map((product) =>
          (product.priceCents * product.max) < product.minOrder ? null : // Hide items that are impossible to order
            <ProductCard
              product={product}
              addToCart={props.addToCart}
              removeFromCart={props.removeFromCart}
              cartItemId={(props.cart[product.id])}
            />
        )}
      </div>
      {
        (searchTerm !== "" && searchResponse.length === 0) && <div className="App-product-catalog-loading"> No Product match your search.</div>
      }
      {loading ? <div className="App-product-catalog-loading">Loading new items...</div> : null}
    </div>
  );
}
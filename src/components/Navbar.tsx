import { Link } from "react-router-dom";
import { formatCentsToDollars } from "../helpers/formatCentsToDollars";
import '../assets/css/Navbar.css';
import { CartIcon } from "./CartIcon";

interface NavbarProp {
  items: number,
  amount: number
}

export function Navbar({items = 0, amount = 0}: NavbarProp) {
    return (
        <div className="App-nav">
            <div className="App-logo">
              <Link to="/">ODEKO</Link>
            </div>
            <nav>
              <ul>
                <li><Link to="/">Catalog</Link></li>
                <li>
                  <Link to="/cart">
                    <CartIcon className={"App-nav-cart-icon"} />
                    <span className={'cart-badge' + (amount<1? ' warning': '')}>{items}</span>
                    <span className="cart-amount">{formatCentsToDollars(amount)}</span>                    
                  </Link>
                </li>
              </ul>
            </nav>            
        </div>
    )
}
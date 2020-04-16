import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( pdKey => {
            const product = fakeData.find( pd => pd.key === pdKey);
            product.quantity = savedCart[pdKey];
            return product; 
        })
        setCart(previousCart);
    }, [])
    const handleAddProduct = (product) =>{
        const toBeAddedeKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedeKey);
        let count = 1;
        let newCart;
        if (sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedeKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}>

                        </Product>)
                }
                
            </div>
            <div className="cart-container">
            <Cart cart={cart}>
                <Link to="/review">
                    <button className="main-button">Review Order</button>
                </Link>
            </Cart>
                
            </div>
           
        </div>
    );
};

export default Shop;
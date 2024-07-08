import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = storedCart.map(item => {
            return { ...item, quantity: item.quantity || 1 };
        });
        setCart(updatedCart);
    }, []);

    const getTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const incrementQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decrementQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className={styles.cart}>
            <h1>Cart</h1>
            {cart.map((product, index) => (
                <div key={product._id} className={styles.cartItem}>
                    <img src={product.imageUrl} alt={product.name} />
                    <h2>{product?.name?.slice(0, 10)}...</h2>
                    <p>₹{product.price}</p>
                    <div className={styles.quantity}>
                        <button onClick={() => decrementQuantity(index)}>-</button>
                        <span>{product.quantity}</span>
                        <button onClick={() => incrementQuantity(index)}>+</button>
                    </div>
                </div>
            ))}
            <h2>Total: ₹{getTotal().toFixed(2)}</h2>
            <Link to="/checkout"><button>Checkout</button></Link>
        </div>
    );
}

export default Cart;

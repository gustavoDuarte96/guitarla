import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db';

export const useCart = () => {
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);



    const MAX_QUANTITY = 5;
    const MIN_QUANTITY = 1;

    function addToCart(item) {
        const itemExists = cart.findIndex((i) => i.id === item.id);
        if (itemExists >= 0) {
            const updateCart = [...cart];
            updateCart[itemExists].quantity += 1;
            setCart(updateCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter((guitar) => guitar.id !== id));
    }

    function incressQuantity(id) {
        const updateCart = [...cart];
        const itemExists = cart.findIndex((i) => i.id === id);
        if (updateCart[itemExists].quantity < MAX_QUANTITY) {
            updateCart[itemExists].quantity += 1;
            setCart(updateCart);
        }
    }

    function decressQuantity(id) {
        const updateCart = [...cart];
        const itemExists = cart.findIndex((i) => i.id === id);
        if (updateCart[itemExists].quantity > MIN_QUANTITY) {
            updateCart[itemExists].quantity -= 1;
            setCart(updateCart);
        }
    }

    function clearCart() {
        setCart([]);
    }

    const isEmpy = useMemo(() => cart.length === 0, [cart]);
    const cartTotal =useMemo(() => cart.reduce((total, guitar) => total + (guitar.price * guitar.quantity), 0), [cart]);

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        incressQuantity,
        decressQuantity,
        clearCart,
        isEmpy,
        cartTotal
    };
}
import React, { useCallback, useEffect, useState } from 'react';
import { useCart } from '../store';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const { cart, getCartData, incrementProductQuantity, decrementProductQuantity, removeProductFromCart, setShowModal } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const notify = () => toast("Please add products to cart!");


    useEffect(() => {
        const data = getCartData();
        setCartItems(data);
    }, [getCartData]);

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const handleIncrementQuantity = useCallback((id) => {
        incrementProductQuantity(id);
    }, [incrementProductQuantity]);

    const handleDecrementQuantity = useCallback((id) => {
        decrementProductQuantity(id);
    }, [decrementProductQuantity]);

    const handleRemoveItem = useCallback((id) => {
        removeProductFromCart(id);
    }, [removeProductFromCart]);

    const calculateSubtotal = () => {
        return cartItems?.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
    };

    const viewCartHandler = (data) => {
        // if (location.pathname === "/cart") {
        //     setShowModal(false);
        // } else {
        //     navigate('/cart');
        // }
        if (data == "checkout" && cart.length > 0) {
            navigate("/cart", { state: { checkout: true } })
        } else {
            cart.length > 0 ? navigate('/cart') : notify();
        }
    }

    useEffect(() => {
        if (location.pathname === "/cart") {
            setShowModal(false);
        }
    }, [location.pathname, setShowModal]);



    return (
        <div className="cart-container">
            <ToastContainer />
            <div className="cart-items">
                {cartItems.length ? cartItems.map(item => (<>

                    <div className="cart-item mb-3" key={item.id}>
                        <img src={item.imgA} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <div className="item-info">
                                <span className="item-name">{item.name}</span>
                                <IoIosCloseCircleOutline size={23} onClick={() => handleRemoveItem(item.id)} className="remove-item" />

                            </div>
                            <div className="quantity-price">
                                <div className="quantity-controls">
                                    <button className='button' onClick={() => handleDecrementQuantity(item.id)}>-</button>
                                    <span className=''>{item.quantity}</span>
                                    <button className='button' onClick={() => handleIncrementQuantity(item.id)}>+</button>
                                </div>
                                <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </>
                )) : <div>
                    <p>No products in the cart.</p>
                </div>}
            </div>
            <div className='footer_cart'>
                <div className="cart-summary">
                    <span>Subtotal:</span>
                    <span>${calculateSubtotal()}</span>
                </div>
                <div className="cart-actions">
                    <button onClick={() => viewCartHandler("view_cart")}>VIEW CART</button>
                    <button onClick={() => viewCartHandler("checkout")}>CHECKOUT</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

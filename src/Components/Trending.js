import React, { useCallback, useState } from 'react';
import { FaEye, FaShoppingBasket } from 'react-icons/fa';
import BounceLoader from "react-spinners/BounceLoader";
import { useCart } from '../store';

import pd1a from '../assets/images/home/bracelet-01-a.jpg';
import pd1b from '../assets/images/home/bracelet-01-b.jpg';
import pd2a from '../assets/images/home/earrings-04-a.jpg';
import pd2b from '../assets/images/home/earrings-04-b.jpg';
import pd3a from '../assets/images/home/earrings-05-a.jpg';
import pd3b from '../assets/images/home/earrings-05-b.jpg';
import pd4a from '../assets/images/home/earrings-06-a.jpg';
import pd4b from '../assets/images/home/earrings-06-b.jpg';

const imageData = [
    { id: 1, imgA: pd1a, imgB: pd1b, price: '495.00', name: "Diamond Bracelet", category: "Bracelet", quantity: 0 },
    { id: 2, imgA: pd2a, imgB: pd2b, price: '1700.00', name: "Earcuffs", category: "Earings", quantity: 0 },
    { id: 3, imgA: pd3a, imgB: pd3b, price: '400.00', name: "Jhumkas", category: "Earings", quantity: 0 },
    { id: 4, imgA: pd4a, imgB: pd4b, price: '350.00', name: "Hooks", category: "Earings", quantity: 0 },
];

const Trending = () => {
    const [loadingStates, setLoadingStates] = useState({ cart: {}, view: false });

    const { addProductToCart, setShowModal, setProduct } = useCart();

    const handleAddToCart = useCallback((product) => {
        setLoadingStates((prev) => ({ ...prev, cart: { ...prev.cart, [product.id]: true } }));
        setTimeout(() => {
            addProductToCart(product);
            setLoadingStates((prev) => ({ ...prev, cart: { ...prev.cart, [product.id]: false } }));
        }, 1000);
    }, [addProductToCart]);

    const viewProduct = useCallback((product) => {
        setLoadingStates((prev) => ({ ...prev, view: true }));
        setProduct(product);
        setTimeout(() => {
            setLoadingStates((prev) => ({ ...prev, view: false }));
            setShowModal(true);
        }, 1000);
    }, [setProduct, setShowModal]);

    return (
        <section className='text-center'>
            <div>
                <h6 className='heading-1'>Popular Products</h6>
                <p className='heading-5'>Trending Now</p>
                <hr className='w-25 mx-auto' />
            </div>
            <div className='product-grid'>
                {loadingStates.view && (
                    <div className="loading-overlay position-relative py-5">
                        <BounceLoader size={48} color={'#000'} className='position-absolute top-50 start-50 translate-middle' />
                    </div>
                )}
                {imageData.map((image) => (
                    <div key={image.id} className="hover-container">
                        <div className="image-wrapper">
                            <img src={image.imgA} alt={`img${image.id}a`} className='image' />
                            <img src={image.imgB} alt={`img${image.id}b`} className="hover-image image" />
                            <div className="icons">
                                <FaEye className="icon" onClick={() => viewProduct(image)} />
                                {loadingStates.cart[image.id] ? (
                                    <BounceLoader size={24} color={"#000"} />
                                ) : (
                                    <FaShoppingBasket className="icon" onClick={() => handleAddToCart(image)} />
                                )}
                            </div>
                        </div>
                        <div>
                            <p>{image.name}</p>
                            <p>${image.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Trending;

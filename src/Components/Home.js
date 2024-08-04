import React from 'react';
import Trending from './Trending';
import BrandCarousel from './BrandsCarousel'
import BestSelling from './BestSelling';
import BestBusiness from './BestBusiness';
import Brand from './Brand';
import Background from './background';
import Footer from './Footer';

const HomePage = () => {

    return (
        <>
            <Background />
            <BrandCarousel />
            <Trending />
            <BestSelling />
            <Brand />
            <BestBusiness />
            <Footer />
        </>
    );
}

export default HomePage;

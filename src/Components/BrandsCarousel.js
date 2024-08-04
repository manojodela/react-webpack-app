import Slider from "react-slick";
import img1 from '../assets/images/carousel/logo-001.png';
import img2 from '../assets/images/carousel/logo-002.png';
import img3 from '../assets/images/carousel/logo-003.png';
import img4 from '../assets/images/carousel/logo-004.png';
import img5 from '../assets/images/carousel/logo-005.png';
import img6 from '../assets/images/carousel/logo-006.png';
import img7 from '../assets/images/carousel/logo-007.png';
import img8 from '../assets/images/carousel/logo-008.png';

const BrandCarousel = () => {
    const imageArray = [
        { src: img1, alt: 'img1' },
        { src: img2, alt: 'img2' },
        { src: img3, alt: 'img3' },
        { src: img4, alt: 'img4' },
        { src: img5, alt: 'img5' },
        { src: img6, alt: 'img6' },
        { src: img7, alt: 'img7' },
        { src: img8, alt: 'img8' }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (<>
        <section className='mb-5'>
            <div className="slider-container">
                <Slider {...settings}>
                    {imageArray.map((image, index) => (
                        <div key={index} className='carousel-slide'>
                            <div className='card m-3'>
                                <img src={image.src} alt={image.alt} className='img-fluid' />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    </>)
}
export default BrandCarousel;
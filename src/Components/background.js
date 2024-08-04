import hero from '../assets/images/hero.jpg';

const Background = () => {
    return (<>
        <section className="position-relative">
            <img src={hero} alt='hero' className='img-fluid w-100' />
            <div className="overlay-text position-absolute top-50 start-0 translate-middle-y">
                <h6 className='heading-1'>New Collection</h6>
                <p className='heading-2'>The New Ring</p>
                <p className='heading-2'>Sensation</p>
                <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                <button className="btn btn-primary">SHOP NOW</button>
            </div>
        </section>
    </>)
}

export default Background;
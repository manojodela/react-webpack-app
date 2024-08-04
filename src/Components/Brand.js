import bg from '../assets/images/bg-02.jpg';
import bg1 from '../assets/images/bg-01.jpg';

const Brand = () => {
    return (<>
        <section className='row '>
            <div className="overlay-text col-12 col-md-4 ps-5 my-auto">
                <h6 className='heading-1'>Unique pieces</h6>
                <p className='heading-3'>Be</p>
                <p className='heading-3'>always</p>
                <p className='heading-3'>on</p>
                <p className='heading-3'>trend</p>
                <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                <button className="btn btn-primary">SHOP NOW</button>
            </div>
            <div className='col-12 col-md-3 p-0 my-auto'>
                <img src={bg} alt='hero' className='img-fluid bg-img' />
            </div>
            <div className='col-12 col-md-5 p-0'>
                <img src={bg1} alt='hero' className='img-fluid bg-img1' />
            </div>

        </section>
    </>)
}
export default Brand;
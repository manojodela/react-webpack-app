import percent from '../assets/images/icons/icon-04.png'
import location from '../assets/images/icons/icon-03.png'
import purse from '../assets/images/icons/icon-02.png'
import truck from '../assets/images/icons/icon-01.png'

const BestBusiness = () => {
    return (<>
        <section className='row text-center'>
            <div className="overlay-text my-auto ">
                <p className=''>best in business</p>
                <h6 className='heading-3'>Why choose us</h6>
                <p className='text-center p-text  mx-auto'>Cras malesuada dolor sit amet est egestas ullamcorper. Nullam in tortor mi. Maecenas vulputate libero</p>
            </div>
            <hr className='w-25 mx-auto' />

            <br />
            <div className='row justify-content-start my-5  p-5 text-start'>
                <div className='col-3'>
                    <img src={percent} alt='percentage' />
                    <p className='sub'>Big Discounts</p>
                    <p className='sub-1'>Integer euismod blandit nunc sit amet sollicitudin. Fusce quis orci viverra, cursus justo.</p>
                </div>
                <div className='col-3'>
                    <img src={location} alt='percentage' />
                    <p className='sub'>Free Shipping</p>
                    <p className='sub-1'>Integer euismod blandit nunc sit amet sollicitudin. Fusce quis orci viverra, cursus justo.</p>
                </div>
                <div className='col-3'>
                    <img src={purse} alt='percentage' />
                    <p className='sub'>Secure Payments</p>
                    <p className='sub-1'>Integer euismod blandit nunc sit amet sollicitudin. Fusce quis orci viverra, cursus justo.</p>
                </div>
                <div className='col-3'>
                    <img src={truck} alt='percentage' />
                    <p className='sub'>Order Tracking</p>
                    <p className='sub-1'>Integer euismod blandit nunc sit amet sollicitudin. Fusce quis orci viverra, cursus justo.</p>
                </div>
            </div>
        </section>
    </>)
}
export default BestBusiness;
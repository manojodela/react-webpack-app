import hero from '../assets/images/hero.jpg';
import Footer from '../Components/Footer';
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import NavBar from '../Components/Navbar';
import { Link } from 'react-router-dom';


const Contact = () => {
    return (<>
        <NavBar />
        <section className="position-relative">
            <img src={hero} alt='hero' className='img-fluid w-100 img-fade' />
            <div className="overlay-text position-absolute top-50 start-50 translate-middle text-center">
                <h6 className='heading-1'>Get in touch</h6>
                <p className='heading-3'>CONTACT US</p>
            </div>
        </section>
        <section>
            <div className='row justify-content-center align-items-center px-5'>
                <div className='col-6 '>
                    <div className='w-75'>
                        <p className='heading-3'>MESSAGE Us</p>
                        <p>Fusce egestas mi urna, id pulvinar ipsum dictum eget. Mauris in dolor velit.</p>
                        <hr className='w-25 ' />
                        <p><FaLocationDot /> &nbsp; Krishna nagar Jagtial Telangana 505327</p>
                        <p><MdEmail />  &nbsp; manojhtc08@gmail.com</p>
                        <p><FaPhone /> &nbsp; 8019425119</p>
                    </div>
                </div>
                <div className='col-6 p-3 '>
                    <form className='form '>
                        <div className='row g-3 mb-3'>
                            <div className='form-group col'>
                                <input type='text' placeholder='First name' class="form-control" />
                            </div>
                            <div className='form-group col'>
                                <input type='text' placeholder='Last name' class="form-control" />
                            </div>
                        </div>

                        <div className='row g-0 mb-3'>
                            <div className='form-group col'>
                                <input type='email' placeholder='Email Address' class="form-control" />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div class="form-group">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>

                        <Link to="#" className="btn btn-primary px-4">SEND</Link>

                    </form>
                </div>
            </div>


        </section>

        <Footer />
    </>)
}

export default Contact;
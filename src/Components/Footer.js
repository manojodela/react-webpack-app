import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'

const Footer = () => {
    return (<>
        <footer className="footer">
            <div className=" row justify-content-start my-5  p-5 text-start ">
                <div className="col-3 ">
                    <img src={logo} alt='logo' />
                </div>
                <div className='col-3'>
                    <strong>About us</strong>
                    <ul className='nav'>
                        <Link to="/" className='nav-link'>
                            Home
                        </Link>
                        <Link to="/about"  className='nav-link'>
                            About
                        </Link>
                        <Link to="/contact"  className='nav-link'>
                            Contact
                        </Link>
                    </ul>
                </div>
                <div className='col-3'>
                    <strong>Shop</strong>
                    <ul className='nav'>
                        <Link  className='nav-link'>
                            Rings
                        </Link>
                        <Link  className='nav-link'>
                            Bracelets
                        </Link>
                        <Link  className='nav-link'>
                            Earings
                        </Link>
                        <Link  className='nav-link'>
                            Necklaces
                        </Link>
                    </ul>
                </div>
                <div className='col-3'>
                    <strong>Address</strong>
                    <ul className='nav'>
                        <Link  className='nav-link'>
                            Kukatpally, Hyderabad 
                            Telangana
                            manojhtc08@gmail.com
                        </Link>

                    </ul>
                </div>
            </div>
            <hr />

            <p className="text-center pb-4">Copyright © 2024 Blingg Jewelry | Powered by Blingg Jewelry</p>
        </footer>
    </>)
}
export default Footer;
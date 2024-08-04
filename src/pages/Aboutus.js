import hero from '../assets/images/hero.jpg';
import founder from '../assets/images/manoj.jpg'
import bg from '../assets/images/bg-03.jpg'
import Footer from '../Components/Footer';
import NavBar from '../Components/Navbar';

const Aboutus = () => {
    return (<>
        <NavBar />
        <section className="position-relative">
            <img src={hero} alt='hero' className='img-fluid w-100 img-fade' />
            <div className="overlay-text position-absolute top-50 start-50 translate-middle text-center">
                <h6 className='heading-1'>A few words</h6>
                <p className='heading-3'>ABOUT US</p>
            </div>
        </section>
        <section>
            <div className='row justify-content-center align-items-center p-3 my-4'>
                <div className='col-6 '>
                    <div className='w-75'>
                        <p>Mattis velit eget</p>
                        <p className='heading-3'>ABOUT THE</p>
                        <p className='heading-2'>FOUNDER</p>
                        <p>Fusce egestas mi urna, id pulvinar ipsum dictum eget. Mauris in dolor velit.</p>
                        <hr className='w-25 ' />
                        <p>
                            Sed ut fringilla dolor. Morbi suscipit a nunc eu finibus. Nam rutrum mattis velit eget volutpat. Fusce egestas mi urna, id pulvinar ipsum dictum eget. Mauris in dolor velit. Vestibulum finibus felis non massa commodo molestie at id justo. Quisque sollicitudin elit sit amet facilisis euismod. Fusce at arcu sed.
                        </p>
                        <p>Nam rutrum mattis velit eget volutpat. Fusce egestas mi urna, id pulvinar ipsum dictum eget.</p>
                    </div>
                </div>
                <div className='col-5 p-2'>
                    <img src={founder} alt='founder' className='img-fluid' />
                </div>
            </div>

            <div className='row'>
                <img src={bg} alt='imagebg' className='img-fluid p-5' />
            </div>
        </section>


        <section>
            <div className='row justify-content-center align-items-start p-3 my-4'>
                <div className='col-6 '>
                    <div className='w-75'>
                        <p>About us</p>
                        <p className='heading-2'>HOW IT ALL</p>
                        <p className='heading-2'>STARTED</p>
                    </div>
                </div>
                <div className='col-5 p-2'>
                    <div className=''>
                        <p className='heading-3 mb-0'>Etiam venenatis mattis mauris, et tempor erat ultricies non. </p>
                        <p className='heading-1'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus eget enim eget tincidunt. In finibus nisi ex, eu interdum urna euismod sit amet. Morbi sollicitudin in magna sed tristique. Nulla pharetra sapien eros, sit amet bibendum nibh consectetur quis.

                        </p>
                        <p>Nam rutrum mattis velit eget volutpat. Fusce egestas mi urna, id pulvinar ipsum dictum eget.</p>
                    </div>

                    <div className=''>
                        <p className='heading-3 mb-0'>1924 - Established</p>
                        <p className='heading-1'>
                            Curabitur ac tortor ut est porta efficitur non sed ante. Donec vel gravida dolor. Donec dictum non elit vel congue. Proin at nunc ut velit rutrum ornare. Vivamus elementum congue porta.
                        </p>
                    </div>
                    <div className=''>
                        <p className='heading-3 mb-0'>1950 - Vivamus Elementum</p>
                        <p className='heading-1'>
                            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eu erat bibendum mauris accumsan suscipit vitae eu ante. In tristique placerat libero vel maximus. Quisque justo lorem, faucibus a augue ac, condimentum varius mi. Vivamus pulvinar sapien eget vulputate pharetra.                        </p>
                    </div>

                    <div className=''>
                        <p className='heading-3 mb-0'>1975 - Magnis Parturient</p>
                        <p className='heading-1'>
                            Curabitur scelerisque mi ut lectus mattis viverra. Morbi volutpat suscipit dolor. Donec vel libero in elit luctus pretium sed id risus. Phasellus non interdum mauris. Ut auctor eros mi, at rhoncus dolor rhoncus sed. Donec congue dolor aliquet ante porta consequat. Duis pellentesque fermentum lorem in commodo                        </p>
                    </div>
                    <div className=''>
                        <p className='heading-3 mb-0'>2010 - Interdum Mauris</p>
                        <p className='heading-1'>
                            Magnis dis parturient montes, nascetur ridiculus mus. Nunc eu erat bibendum mauris accumsan suscipit vitae eu ante. In tristique placerat libero vel maximus.                        </p>
                    </div>
                </div>
            </div>

        </section>

        <Footer />
    </>)
}

export default Aboutus;
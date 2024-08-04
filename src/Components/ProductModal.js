
import { Modal } from 'react-bootstrap';
import { useCart } from '../store';


const ProductModal = () => {
    const { setShowModal, showModal, product } = useCart();

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <Modal show={showModal} onHide={handleClose} className="custom-modal">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className='col-6 pe-4'>
                    <img src={product.imgA} alt='product' />
                </div>
                <div className='col'>
                    <p>{product.category}</p>
                    <h5>{product.name}</h5>
                    <p className='price' style={{color:"#c60c30"}}>{product.price}</p>
                    <p>Ut non elit lorem. Duis pharetra odio vitae nisl luctus, at volutpat arcu lacinia. Aliquam id ullamcorper augue. Fusce feugiat nibh et nisl mollis hendrerit. Mauris sit amet nulla in augue laoreet lobortis ac eleifend nunc. Quisque eleifend sollicitudin nulla, et consequat eros. Donec pellentesque dapibus massa ut cursus.</p>
                    <p>Quisque ut augue eu dui semper eleifend. Aliquam imperdiet nisl libero, vitae vulputate lectus fringilla eget.</p>
                    <hr />
                    <p><strong>Category</strong>: {product.category}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;

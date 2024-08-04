import '../Cart.css';
import React, { useCallback, useEffect, useState } from "react";
import { useCart } from '../store';
import Footer from '../Components/Footer';
import NavBar from '../Components/Navbar';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Bs3Circle, Bs2Circle, Bs1Circle } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import OrderConfirmation from '../Components/OrderConfirmation';
import { clearCart } from '../common/storage';
import { AiOutlineShoppingCart } from "react-icons/ai";

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  companyName: yup.string().required('Company Name is required'),
  country: yup.string().required('Country/Region is required'),
  address: yup.string().required('Street Address is required'),
  city: yup.string().required('Town/City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('ZIP Code is required'),
  phone: yup.string().required('Phone is required'),
  paymentMethod: yup.string().required('Payment method is required'),
});

const CartPage = () => {
  const { getCartData, incrementProductQuantity, decrementProductQuantity, removeProductFromCart, getTotalCartPrice } = useCart();
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("shoppingCart");
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  const { handleSubmit, control, formState: { errors }, register } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (location.state?.checkout) {
      setActiveTab("checkout");
    }
  }, [location]);

  useEffect(() => {
    const cartData = getCartData();
    console.log("Cart data retrieved:", cartData); // Debug output
    setCart(cartData);
  }, [getCartData]);

  const handleIncrementQuantity = useCallback((id) => {
    incrementProductQuantity(id);
    setCart(getCartData()); // Update cart after increment
  }, [incrementProductQuantity, getCartData]);

  const handleDecrementQuantity = useCallback((id) => {
    decrementProductQuantity(id);
    setCart(getCartData()); // Update cart after decrement
  }, [decrementProductQuantity, getCartData]);

  const handleRemoveItem = useCallback((id) => {
    removeProductFromCart(id);
    setCart(getCartData()); // Update cart after removal
  }, [removeProductFromCart, getCartData]);

  const handleTabClick = useCallback((tabName) => {
    if (orderData) {
      clearCart();
      setOrderData(null);
    }
    setActiveTab(tabName);
  }, [orderData]);

  const onSubmit = (data) => {
    const order = {
      ...data,
      number: Math.floor(Math.random() * 9000),
      date: new Date().toLocaleDateString(),
      total: getTotalCartPrice(),
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      subtotal: getTotalCartPrice(),
      billingAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}, ${data.country}`
    };
    setOrderData(order);
    setCheckoutCompleted(true);

    handleTabClick("orderComplete");
  };


  return (
    <>
      <NavBar />
      <div className="container-m">
        <div className="header-nav fixed">
          <ul>
            <li
              className={`m-0 nav-item ${activeTab === "shoppingCart" ? "active" : ""}`}
              onClick={() => handleTabClick("shoppingCart")}
            >
              <span className='circle'><Bs1Circle /></span> <span className='lh-2'>SHOPPING CART</span>
            </li>
            <li className='m-0'> <FaChevronRight /></li>
            <li
              className={` m-0 nav-item ${activeTab === "checkout" ? "active" : ""}`}
            >
              <span className='circle'><Bs2Circle /></span> CHECKOUT DETAILS
            </li>
            <li className='m-0'> <FaChevronRight /></li>
            <li
              className={` m-0 nav-item ${activeTab === "orderComplete" ? "active" : ""} ${!checkoutCompleted ? "disabled" : ""}`}
            >
              <span className='circle'><Bs3Circle /></span> ORDER COMPLETE
            </li>
          </ul>
        </div>
      </div>

      {activeTab === "shoppingCart" && (
        <div className='row justify-content-around'>
          <div className='col-8'>
            <div className="shopping-cart border">
              <CartItems
                cart={cart}
                handleIncrementQuantity={handleIncrementQuantity}
                handleDecrementQuantity={handleDecrementQuantity}
                handleRemoveItem={handleRemoveItem}
              />
            </div>
          </div>

          <div className='col-3'>
            <CartTotals getTotalCartPrice={getTotalCartPrice} handleTabClick={handleTabClick} cart={cart}/>
          </div>
        </div>
      )}

      {activeTab === "checkout" && (
        <CheckoutForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          control={control}
          errors={errors}
          register={register}
          cart={cart}
          getTotalCartPrice={getTotalCartPrice}
        />
      )}

      {activeTab === "orderComplete" && orderData && (
        <OrderConfirmation order={orderData} />
      )}

      <Footer />
    </>
  );
};

const CartItems = ({ cart, handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem }) => (
  <div className="cart-items">
    <div className='d-flex table-header px-1 fw-bold'>
      <div className='col-1'></div>
      <div className='col-5'>Product</div>
      <div className='col-2'>Price</div>
      <div className='col-3'>Quantity</div>
      <div className='col-2'>Subtotal</div>
    </div>
    {cart.length ? cart.map((item) => (
      <React.Fragment key={item.id}>
        <div className="d-flex">
          <div className='col-1'>
            <IoIosCloseCircleOutline size={23} onClick={() => handleRemoveItem(item.id)} className="remove-item" style={{ width: "30px" }} />
          </div>
          <div className="col-5 ">
            <img src={item.imgA} alt={item.imgA} width="90px" height="90px" /> <br />
            {item.name}
          </div>
          <div className="price col-2 ">${item.price}</div>
          <div className="col-3 ">
            <div className="quantity-controls">
              <button className='button' onClick={() => handleDecrementQuantity(item.id)}>-</button>
              <span className=''>{item.quantity}</span>
              <button className='button' onClick={() => handleIncrementQuantity(item.id)}>+</button>
            </div>
          </div>
          <div className="subtotal col-2 ">${(item.price * item.quantity)}</div>
        </div>
        <hr />
      </React.Fragment>
    )) : <>
      <p className='py-3'> <AiOutlineShoppingCart /> &nbsp;Your cart is currently empty.</p>
      <Link className="btn btn-primary" to="/" >RETURN TO SHOP</Link>
    </>}
  </div>
);

const CartTotals = ({ getTotalCartPrice, handleTabClick, cart }) => (
  <div className="border">
    <div className='table-header fw-bold'>
      <div>&nbsp; &nbsp;CART TOTALS</div>
    </div>
    <div className='p-4'>
      <div className='row '>
        <span className='col'>SubTotal</span>
        <span className='col'>${getTotalCartPrice()}</span>
      </div>
      <hr />
      <div className='row '>
        <span className='col'>Total</span>
        <span className='col'>${getTotalCartPrice()}</span>
      </div>
      <hr />
      <a href='#' className='nav-link'>Have a coupon? </a>
      <button className="btn btn-primary mt-3 px-4" onClick={() => handleTabClick("checkout")} disabled={!cart.length}>PROCEED TO CHECKOUT</button>
    </div>
  </div>
);

const CheckoutForm = ({ handleSubmit, onSubmit, control, errors, register, cart, getTotalCartPrice }) => (
  <div className="checkout">
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2 className='text-style'>Customer Information</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label="Email address"
              name="email"
              control={control}
              type="email"
              placeholder="Enter email"
              error={errors.email}
            />
            <h2 className='text-style'>Billing Details</h2>
            <div className="form-row row">
              <FormField
                label="First Name"
                name="firstName"
                control={control}
                type="text"
                placeholder="First Name"
                error={errors.firstName}
                className="col-6"
              />
              <FormField
                label="Last Name"
                name="lastName"
                control={control}
                type="text"
                placeholder="Last Name"
                error={errors.lastName}
                className="col-6"
              />
            </div>
            <FormField
              label="Company Name"
              name="companyName"
              control={control}
              type="text"
              placeholder="Company Name"
              error={errors.companyName}
            />
            <FormField
              label="Country/Region"
              name="country"
              control={control}
              type="select"
              options={[
                { value: "India", label: "India" },
                { value: "United States", label: "United States" },
                { value: "Canada", label: "Canada" },
                { value: "Other", label: "Other" },
              ]}
              error={errors.country}
            />
            <FormField
              label="Street Address"
              name="address"
              control={control}
              type="text"
              placeholder="Apartment, suite, unit, etc. (optional)"
              error={errors.address}
            />
            <div className="form-row row">
              <FormField
                label="Town/City"
                name="city"
                control={control}
                type="text"
                error={errors.city}
                className="col-md-6"
              />
              <FormField
                label="State"
                name="state"
                control={control}
                type="select"
                options={[
                  { value: "California", label: "California" },
                  { value: "Texas", label: "Texas" },
                  { value: "Other", label: "Other" },
                ]}
                error={errors.state}
                className="col-md-4"
              />
              <FormField
                label="ZIP Code"
                name="zip"
                control={control}
                type="text"
                error={errors.zip}
                className="col-md-2"
              />
            </div>
            <FormField
              label="Phone"
              name="phone"
              control={control}
              type="text"
              error={errors.phone}
            />
            <h2 className='text-style'>Additional Information</h2>
            <FormField
              label="Order Notes"
              name="notes"
              control={control}
              type="textarea"
              placeholder="Notes about your order, e.g. special notes for delivery."
            />
            <h2 className='text-style'>Payment</h2>
            <div className="accordion" id="accordionExample">
              <PaymentOption
                label="Direct bank transfer"
                id="bankTransfer"
                register={register}
                error={errors.paymentMethod}
              />
              <PaymentOption
                label="Cash on delivery"
                id="cashOnDelivery"
                register={register}
                error={errors.paymentMethod}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3 mx-auto w-100">
              Place Order ${getTotalCartPrice()}
            </button>
          </form>
        </div>
        <div className="col-md-4">
          <h2 className='text-style'>Your Order</h2>
          <OrderSummary cart={cart} getTotalCartPrice={getTotalCartPrice} />
        </div>
      </div>
    </div>
  </div>
);

const FormField = ({ label, name, control, type, placeholder, error, className, options }) => (
  <div className={`form-group ${className}`}>
    <label htmlFor={name}>{label}</label>
    {type === "select" ? (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select {...field} className="form-control" id={name}>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}
      />
    ) : type === "textarea" ? (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea {...field} className="form-control" id={name} rows="3" placeholder={placeholder}></textarea>
        )}
      />
    ) : (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input {...field} type={type} className="form-control" id={name} placeholder={placeholder} />
        )}
      />
    )}
    {error && <p className='error'>{error.message}</p>}
  </div>
);

const PaymentOption = ({ label, id, register, error }) => (
  <div className="accordion-item">
    <h2 className="accordion-header" id={`heading${id}`}>
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="false" aria-controls={`collapse${id}`}>
        <input
          {...register("paymentMethod")}
          className="form-check-input"
          type="radio"
          name="paymentMethod"
          id={id}
          value={id}
        />
        &nbsp; {label}
      </button>
    </h2>
    <div id={`collapse${id}`} className="accordion-collapse collapse" aria-labelledby={`heading${id}`} data-bs-parent="#accordionExample">
      <div className="accordion-body">
        {label === "Direct bank transfer" ? (
          "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
        ) : (
          "Pay with cash upon delivery."
        )}
      </div>
    </div>
    {error && <p className='error'>{error.message}</p>}
  </div>
);

const OrderSummary = ({ cart, getTotalCartPrice }) => (
  <div className="shopping-cart border">
    <div className="cart-items">
      <div className='d-flex table-header px-1 fw-bold'>
        <div className='col-10'>Product</div>
        <div className='col-2'>Subtotal</div>
      </div>
      {cart.length ? cart.map((item) => (
        <React.Fragment key={item.id}>
          <div className="d-flex align-items-center">
            <div className="col-8">
              <img src={item.imgA} alt={item.imgA} width="90px" height="90px" />
              <span>  {item.name}</span>
            </div>
            <div className='col-2'>
              <span className=''>x&nbsp;{item.quantity}</span>
            </div>
            <div className="subtotal col-2 ">&nbsp; ${(item.price * item.quantity)}</div>
          </div>
          <hr />
        </React.Fragment>
      )) : (
        <div className='px-3'>
          <p>Your cart is empty.</p>
        </div>
      )}
      <div className='px-3'>
        <div className='row'>
          <span className='col-6'>SubTotal</span>
          <span className='col-6 text-end'>${getTotalCartPrice()}</span>
        </div>
        <hr />
        <div className='row mb-3'>
          <span className='col'>Total</span>
          <span className='col text-end'>${getTotalCartPrice()}</span>
        </div>
      </div>
    </div>
  </div>
);

export default CartPage;



// import '../Cart.css';
// import React, { useCallback, useEffect, useState } from "react";
// import { useCart } from '../store';
// import Footer from '../Components/Footer';
// import NavBar from '../Components/Navbar';
// import { IoIosCloseCircleOutline } from 'react-icons/io';
// import { Bs3Circle, Bs2Circle, Bs1Circle } from "react-icons/bs";
// import { FaChevronRight } from "react-icons/fa";
// import { Link, useLocation } from 'react-router-dom';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import OrderConfirmation from '../Components/OrderConfirmation';
// import { clearCart } from '../common/storage';
// import { AiOutlineShoppingCart } from "react-icons/ai";


// const schema = yup.object().shape({
//   email: yup.string().email('Invalid email format').required('Email is required'),
//   firstName: yup.string().required('First Name is required'),
//   lastName: yup.string().required('Last Name is required'),
//   companyName: yup.string().required('Company Name is required'),
//   country: yup.string().required('Country/Region is required'),
//   address: yup.string().required('Street Address is required'),
//   city: yup.string().required('Town/City is required'),
//   state: yup.string().required('State is required'),
//   zip: yup.string().required('ZIP Code is required'),
//   phone: yup.string().required('Phone is required'),
//   paymentMethod: yup.string().required('Payment method is required'),
// });

// const CartPage = () => {
//   const [cart, setCart] = useState([]);
//   const [orderData, setOrderData] = useState(null);
//   const [checkoutCompleted, setCheckoutCompleted] = useState(false);
//   const { getCartData, incrementProductQuantity, decrementProductQuantity, removeProductFromCart, getTotalCartPrice } = useCart();
//   const [activeTab, setActiveTab] = useState("shoppingCart");
//   const location = useLocation();


//   useEffect(() => {
//     return () => {
//       clearCart();
//       setOrderData(null);
//     };
//   }, []);

//   useEffect(() => {
//     if (location.state?.checkout) {
//       setActiveTab("checkout");
//     }
//   }, [location]);

//   useEffect(() => {
//     setCart(getCartData());
//   }, [getCartData]);

//   const { handleSubmit, control, formState: { errors }, register } = useForm({
//     resolver: yupResolver(schema),
//   });


//   const handleIncrementQuantity = useCallback((id) => {
//     incrementProductQuantity(id);
//   }, [incrementProductQuantity]);

//   const handleDecrementQuantity = useCallback((id) => {
//     decrementProductQuantity(id);
//   }, [decrementProductQuantity]);

//   const handleRemoveItem = useCallback((id) => {
//     removeProductFromCart(id);
//   }, [removeProductFromCart]);

//   const handleTabClick = useCallback((tabName) => {
//     if (orderData) {
//       clearCart();
//       setOrderData([]);
//     }
//     setActiveTab(tabName);
//   }, []);

//   const onSubmit = (data) => {
//     const order = {
//       ...data,
//       number: Math.floor(Math.random() * 9000),
//       date: new Date().toLocaleDateString(),
//       total: getTotalCartPrice(),
//       items: cart.map(item => ({
//         name: item.name,
//         quantity: item.quantity,
//         total: item.price * item.quantity
//       })),
//       subtotal: getTotalCartPrice(),
//       billingAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}, ${data.country}`
//     };
//     setOrderData(order);
//     setCheckoutCompleted(true);

//     handleTabClick("orderComplete");
//   };

 

//   return (
//     <>
//       <NavBar />
//       <div className="container-m">
//         <div className="header-nav fixed">
//           <ul>
//             <li
//               className={`m-0 nav-item ${activeTab === "shoppingCart" ? "active" : ""}`}
//               onClick={() => handleTabClick("shoppingCart")}
//             >
//               <span className='circle'><Bs1Circle /></span> <span className='lh-2'>SHOPPING CART</span>
//             </li>
//             <li className='m-0'> <FaChevronRight /></li>
//             <li
//               className={` m-0 nav-item ${activeTab === "checkout" ? "active" : ""}`}
//             >
//               <span className='circle'><Bs2Circle /></span> CHECKOUT DETAILS
//             </li>
//             <li className='m-0'> <FaChevronRight /></li>
//             <li
//               className={` m-0 nav-item ${activeTab === "orderComplete" ? "active" : ""} ${!checkoutCompleted ? "disabled" : ""}`}
//             >
//               <span className='circle'><Bs3Circle /></span> ORDER COMPLETE
//             </li>
//           </ul>
//         </div>
//       </div>

//       {activeTab === "shoppingCart" && (
//         <div className='row justify-content-around'>
//           <div className='col-8'>
//             <div className="shopping-cart border">
//               <CartItems
//                 cart={cart}
//                 handleIncrementQuantity={handleIncrementQuantity}
//                 handleDecrementQuantity={handleDecrementQuantity}
//                 handleRemoveItem={handleRemoveItem}
//               />
//             </div>
//           </div>

//           <div className='col-3'>
//             <CartTotals getTotalCartPrice={getTotalCartPrice} handleTabClick={handleTabClick} cart={cart}/>
//           </div>
//         </div>
//       )}

//       {activeTab === "checkout" && (
//         <CheckoutForm
//           handleSubmit={handleSubmit}
//           onSubmit={onSubmit}
//           control={control}
//           errors={errors}
//           register={register}
//           cart={cart}
//           getTotalCartPrice={getTotalCartPrice}
//         />
//       )}

//       {activeTab === "orderComplete" && orderData && (
//         <OrderConfirmation order={orderData} />
//       )}

//       <Footer />
//     </>
//   );
// };

// const CartItems = ({ cart, handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem }) => (
//   <div className="cart-items">
//     <div className='d-flex table-header px-1 fw-bold'>
//       <div className='col-1'></div>
//       <div className='col-5'>Product</div>
//       <div className='col-2'>Price</div>
//       <div className='col-3'>Quantity</div>
//       <div className='col-2'>Subtotal</div>
//     </div>
//     {cart && cart?.length ? cart?.map((item) => (
//       <React.Fragment key={item.id}>
//         <div className="d-flex">
//           <div className='col-1'>
//             <IoIosCloseCircleOutline size={23} onClick={() => handleRemoveItem(item.id)} className="remove-item" style={{ width: "30px" }} />
//           </div>
//           <div className="col-5 ">
//             <img src={item.imgA} alt={item.imgA} width="90px" height="90px" /> <br />
//             {item.name}
//           </div>
//           <div className="price col-2 ">${item.price}</div>
//           <div className="col-3 ">
//             <div className="quantity-controls">
//               <button className='button' onClick={() => handleDecrementQuantity(item.id)}>-</button>
//               <span className=''>{item.quantity}</span>
//               <button className='button' onClick={() => handleIncrementQuantity(item.id)}>+</button>
//             </div>
//           </div>
//           <div className="subtotal col-2 ">${(item.price * item.quantity)}</div>
//         </div>
//         <hr />
//       </React.Fragment>
//     )) : <>
//       <p className='py-3'> <AiOutlineShoppingCart /> &nbsp;Your cart is currently empty.</p>
//       <Link className="btn btn-primary" to="/" >RETURN TO SHOP</Link>
//     </>}
//   </div>
// );

// const CartTotals = ({ getTotalCartPrice, handleTabClick, cart }) => (
//   <div className="border">
//     <div className='table-header fw-bold'>
//       <div>&nbsp; &nbsp;CART TOTALS</div>
//     </div>
//     <div className='p-4'>
//       <div className='row '>
//         <span className='col'>SubTotal</span>
//         <span className='col'>${getTotalCartPrice()}</span>
//       </div>
//       <hr />
//       <div className='row '>
//         <span className='col'>Total</span>
//         <span className='col'>${getTotalCartPrice()}</span>
//       </div>
//       <hr />
//       <a href='#' className='nav-link'>Have a coupon? </a>
//       <button className="btn btn-primary mt-3 px-4" onClick={() => handleTabClick("checkout")} disabled={!cart.length}>PROCEED TO CHECKOUT</button>
//     </div>
//   </div>
// );

// const CheckoutForm = ({ handleSubmit, onSubmit, control, errors, register, cart, getTotalCartPrice }) => (
//   <div className="checkout">
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-8">
//           <h2 className='text-style'>Customer Information</h2>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <FormField
//               label="Email address"
//               name="email"
//               control={control}
//               type="email"
//               placeholder="Enter email"
//               error={errors.email}
//             />
//             <h2 className='text-style'>Billing Details</h2>
//             <div className="form-row row">
//               <FormField
//                 label="First Name"
//                 name="firstName"
//                 control={control}
//                 type="text"
//                 placeholder="First Name"
//                 error={errors.firstName}
//                 className="col-6"
//               />
//               <FormField
//                 label="Last Name"
//                 name="lastName"
//                 control={control}
//                 type="text"
//                 placeholder="Last Name"
//                 error={errors.lastName}
//                 className="col-6"
//               />
//             </div>
//             <FormField
//               label="Company Name"
//               name="companyName"
//               control={control}
//               type="text"
//               placeholder="Company Name"
//               error={errors.companyName}
//             />
//             <FormField
//               label="Country/Region"
//               name="country"
//               control={control}
//               type="select"
//               options={[
//                 { value: "India", label: "India" },
//                 { value: "United States", label: "United States" },
//                 { value: "Canada", label: "Canada" },
//                 { value: "Other", label: "Other" },
//               ]}
//               error={errors.country}
//             />
//             <FormField
//               label="Street Address"
//               name="address"
//               control={control}
//               type="text"
//               placeholder="Apartment, suite, unit, etc. (optional)"
//               error={errors.address}
//             />
//             <div className="form-row row">
//               <FormField
//                 label="Town/City"
//                 name="city"
//                 control={control}
//                 type="text"
//                 error={errors.city}
//                 className="col-md-6"
//               />
//               <FormField
//                 label="State"
//                 name="state"
//                 control={control}
//                 type="select"
//                 options={[
//                   { value: "California", label: "California" },
//                   { value: "Texas", label: "Texas" },
//                   { value: "Other", label: "Other" },
//                 ]}
//                 error={errors.state}
//                 className="col-md-4"
//               />
//               <FormField
//                 label="ZIP Code"
//                 name="zip"
//                 control={control}
//                 type="text"
//                 error={errors.zip}
//                 className="col-md-2"
//               />
//             </div>
//             <FormField
//               label="Phone"
//               name="phone"
//               control={control}
//               type="text"
//               error={errors.phone}
//             />
//             <h2 className='text-style'>Additional Information</h2>
//             <FormField
//               label="Order Notes"
//               name="notes"
//               control={control}
//               type="textarea"
//               placeholder="Notes about your order, e.g. special notes for delivery."
//             />
//             <h2 className='text-style'>Payment</h2>
//             <div className="accordion" id="accordionExample">
//               <PaymentOption
//                 label="Direct bank transfer"
//                 id="bankTransfer"
//                 register={register}
//                 error={errors.paymentMethod}
//               />
//               <PaymentOption
//                 label="Cash on delivery"
//                 id="cashOnDelivery"
//                 register={register}
//                 error={errors.paymentMethod}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary mt-3 mx-auto w-100">
//               Place Order ${getTotalCartPrice()}
//             </button>
//           </form>
//         </div>
//         <div className="col-md-4">
//           <h2 className='text-style'>Your Order</h2>
//           <OrderSummary cart={cart} getTotalCartPrice={getTotalCartPrice} />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const FormField = ({ label, name, control, type, placeholder, error, className, options }) => (
//   <div className={`form-group ${className}`}>
//     <label htmlFor={name}>{label}</label>
//     {type === "select" ? (
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <select {...field} className="form-control" id={name}>
//             {options.map(option => (
//               <option key={option.value} value={option.value}>{option.label}</option>
//             ))}
//           </select>
//         )}
//       />
//     ) : type === "textarea" ? (
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <textarea {...field} className="form-control" id={name} rows="3" placeholder={placeholder}></textarea>
//         )}
//       />
//     ) : (
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <input {...field} type={type} className="form-control" id={name} placeholder={placeholder} />
//         )}
//       />
//     )}
//     {error && <p className='error'>{error.message}</p>}
//   </div>
// );

// const PaymentOption = ({ label, id, register, error }) => (
//   <div className="accordion-item">
//     <h2 className="accordion-header" id={`heading${id}`}>
//       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="false" aria-controls={`collapse${id}`}>
//         <input
//           {...register("paymentMethod")}
//           className="form-check-input"
//           type="radio"
//           name="paymentMethod"
//           id={id}
//           value={id}
//         />
//         &nbsp; {label}
//       </button>
//     </h2>
//     <div id={`collapse${id}`} className="accordion-collapse collapse" aria-labelledby={`heading${id}`} data-bs-parent="#accordionExample">
//       <div className="accordion-body">
//         {label === "Direct bank transfer" ? (
//           "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
//         ) : (
//           "Pay with cash upon delivery."
//         )}
//       </div>
//     </div>
//     {error && <p className='error'>{error.message}</p>}
//   </div>
// );

// const OrderSummary = ({ cart, getTotalCartPrice }) => (
//   <div className="shopping-cart border">
//     <div className="cart-items">
//       <div className='d-flex table-header px-1 fw-bold'>
//         <div className='col-10'>Product</div>
//         <div className='col-2'>Subtotal</div>
//       </div>
//       {cart &&  cart?.map((item) => (
//         <React.Fragment key={item.id}>
//           <div className="d-flex align-items-center">
//             <div className="col-8">
//               <img src={item.imgA} alt={item.imgA} width="90px" height="90px" />
//               <span>  {item.name}</span>
//             </div>
//             <div className='col-2'>
//               <span className=''>x&nbsp;{item.quantity}</span>
//             </div>
//             <div className="subtotal col-2 ">&nbsp; ${(item.price * item.quantity)}</div>
//           </div>
//           <hr />
//         </React.Fragment>
//       ))}
//       <div className='px-3'>
//         <div className='row'>
//           <span className='col-6'>SubTotal</span>
//           <span className='col-6 text-end'>${getTotalCartPrice()}</span>
//         </div>
//         <hr />
//         <div className='row mb-3'>
//           <span className='col'>Total</span>
//           <span className='col text-end'>${getTotalCartPrice()}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default CartPage;


// import '../Cart.css';
// import React, { useCallback, useEffect, useState } from "react";
// import { useCart } from '../store';
// import Footer from '../Components/Footer';
// import NavBar from '../Components/Navbar';
// import { IoIosCloseCircleOutline } from 'react-icons/io';
// import { Bs3Circle, Bs2Circle, Bs1Circle } from "react-icons/bs";
// import { FaChevronRight } from "react-icons/fa";
// import { Link, useLocation } from 'react-router-dom';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import OrderConfirmation from '../Components/OrderConfirmation';
// import { clearCart } from '../common/storage';
// import { AiOutlineShoppingCart } from "react-icons/ai";

// const schema = yup.object().shape({
//   email: yup.string().email('Invalid email format').required('Email is required'),
//   firstName: yup.string().required('First Name is required'),
//   lastName: yup.string().required('Last Name is required'),
//   companyName: yup.string().required('Company Name is required'),
//   country: yup.string().required('Country/Region is required'),
//   address: yup.string().required('Street Address is required'),
//   city: yup.string().required('Town/City is required'),
//   state: yup.string().required('State is required'),
//   zip: yup.string().required('ZIP Code is required'),
//   phone: yup.string().required('Phone is required'),
//   paymentMethod: yup.string().required('Payment method is required'),
// });

// const CartPage = () => {
//   const { getCartData, incrementProductQuantity, decrementProductQuantity, removeProductFromCart, getTotalCartPrice } = useCart();
//   const [cart, setCart] = useState([]);
//   const [activeTab, setActiveTab] = useState("shoppingCart");
//   const location = useLocation();
//   const [orderData, setOrderData] = useState(null);
  // const [checkoutCompleted, setCheckoutCompleted] = useState(false);

//   const { handleSubmit, control, formState: { errors }, register } = useForm({
//     resolver: yupResolver(schema),
//   });

//   useEffect(() => {
//     if (location.state?.checkout) {
//       setActiveTab("checkout");
//     }
//   }, [location]);

//   useEffect(() => {
//     setCart(getCartData());
//   }, [getCartData]);

//   const handleIncrementQuantity = useCallback((id) => {
//     incrementProductQuantity(id);
//   }, [incrementProductQuantity]);

//   const handleDecrementQuantity = useCallback((id) => {
//     decrementProductQuantity(id);
//   }, [decrementProductQuantity]);

//   const handleRemoveItem = useCallback((id) => {
//     removeProductFromCart(id);
//   }, [removeProductFromCart]);

//   const handleTabClick = useCallback((tabName) => {
//     if (orderData) {
//       clearCart();
//       setOrderData(null);
//     }
//     setActiveTab(tabName);
//   }, [orderData]);

//   const onSubmit = (data) => {
//     const order = {
//       ...data,
//       number: Math.floor(Math.random() * 9000),
//       date: new Date().toLocaleDateString(),
//       total: getTotalCartPrice(),
//       items: cart.map(item => ({
//         name: item.name,
//         quantity: item.quantity,
//         total: item.price * item.quantity
//       })),
//       subtotal: getTotalCartPrice(),
//       billingAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}, ${data.country}`
//     };
//     setOrderData(order);
//     setCheckoutCompleted(true);

//     handleTabClick("orderComplete");
//   };

  // useEffect(() => {
  //   return () => {
  //     clearCart();
  //     setOrderData(null);
  //   };
  // }, []);

//   return (
//     <>
//       <NavBar />
//       <div className="container-m">
//         <div className="header-nav fixed">
//           <ul>
//             <li
//               className={`m-0 nav-item ${activeTab === "shoppingCart" ? "active" : ""}`}
//               onClick={() => handleTabClick("shoppingCart")}
//             >
//               <span className='circle'><Bs1Circle /></span> <span className='lh-2'>SHOPPING CART</span>
//             </li>
//             <li className='m-0'> <FaChevronRight /></li>
//             <li
//               className={` m-0 nav-item ${activeTab === "checkout" ? "active" : ""}`}
//             >
//               <span className='circle'><Bs2Circle /></span> CHECKOUT DETAILS
//             </li>
//             <li className='m-0'> <FaChevronRight /></li>
//             <li
//               className={` m-0 nav-item ${activeTab === "orderComplete" ? "active" : ""} ${!checkoutCompleted ? "disabled" : ""}`}
//             >
//               <span className='circle'><Bs3Circle /></span> ORDER COMPLETE
//             </li>
//           </ul>
//         </div>
//       </div>

//       {activeTab === "shoppingCart" && (
//         <div className='row justify-content-around'>
//           <div className='col-8'>
//             <div className="shopping-cart border">
//               <CartItems
//                 cart={cart}
//                 handleIncrementQuantity={handleIncrementQuantity}
//                 handleDecrementQuantity={handleDecrementQuantity}
//                 handleRemoveItem={handleRemoveItem}
//               />
//             </div>
//           </div>

//           <div className='col-3'>
//           { cart && cart.length && <CartTotals getTotalCartPrice={getTotalCartPrice} handleTabClick={handleTabClick} cart={cart}/>}
//           </div>
//         </div>
//       )}

//       {activeTab === "checkout" && (
//         <CheckoutForm
//           handleSubmit={handleSubmit}
//           onSubmit={onSubmit}
//           control={control}
//           errors={errors}
//           register={register}
//           cart={cart}
//           getTotalCartPrice={getTotalCartPrice}
//         />
//       )}

//       {activeTab === "orderComplete" && orderData && (
//         <OrderConfirmation order={orderData} />
//       )}

//       <Footer />
//     </>
//   );
// };

// const CartItems = ({ cart, handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem }) => (
//   <div className="cart-items">
//     <div className='d-flex table-header px-1 fw-bold'>
//       <div className='col-1'></div>
//       <div className='col-5'>Product</div>
//       <div className='col-2'>Price</div>
//       <div className='col-3'>Quantity</div>
//       <div className='col-2'>Subtotal</div>
//     </div>
//     {cart && cart.length ? cart.map((item) => (
//       <React.Fragment key={item.id}>
//         <div className="d-flex">
//           <div className='col-1'>
//             <IoIosCloseCircleOutline size={23} onClick={() => handleRemoveItem(item.id)} className="remove-item" style={{ width: "30px" }} />
//           </div>
//           <div className="col-5 ">
//             <img src={item.imgA} alt={item.imgA} width="90px" height="90px" /> <br />
//             {item.name}
//           </div>
//           <div className="price col-2 ">${item.price}</div>
//           <div className="col-3 ">
//             <div className="quantity-controls">
//               <button className='button' onClick={() => handleDecrementQuantity(item.id)}>-</button>
//               <span className=''>{item.quantity}</span>
//               <button className='button' onClick={() => handleIncrementQuantity(item.id)}>+</button>
//             </div>
//           </div>
//           <div className="subtotal col-2 ">${(item.price * item.quantity)}</div>
//         </div>
//         <hr />
//       </React.Fragment>
//     )) : <>
//       <p className='py-3'> <AiOutlineShoppingCart /> &nbsp;Your cart is currently empty.</p>
//       <Link className="btn btn-primary" to="/" >RETURN TO SHOP</Link>
//     </>}
//   </div>
// );

// const CartTotals = ({ getTotalCartPrice, handleTabClick, cart }) => (
//   <div className="border">
//     <div className='table-header fw-bold'>
//       <div>&nbsp; &nbsp;CART TOTALS</div>
//     </div>
//     <div className='p-4'>
//       <div className='row '>
//         <span className='col'>SubTotal</span>
//         <span className='col'>${getTotalCartPrice()}</span>
//       </div>
//       <hr />
//       <div className='row '>
//         <span className='col'>Total</span>
//         <span className='col'>${getTotalCartPrice()}</span>
//       </div>
//       <hr />
//       <a href='#' className='nav-link'>Have a coupon? </a>
//       <button className="btn btn-primary mt-3 px-4" onClick={() => handleTabClick("checkout")} disabled={cart && !cart.length}>PROCEED TO CHECKOUT</button>
//     </div>
//   </div>
// );

// const CheckoutForm = ({ handleSubmit, onSubmit, control, errors, register, cart, getTotalCartPrice }) => (
//   <div className="checkout">
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-8">
//           <h2 className='text-style'>Customer Information</h2>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <FormField
//               label="Email address"
//               name="email"
//               control={control}
//               type="email"
//               placeholder="Enter email"
//               error={errors.email}
//             />
//             <h2 className='text-style'>Billing Details</h2>
//             <div className="form-row row">
//               <FormField
//                 label="First Name"
//                 name="firstName"
//                 control={control}
//                 type="text"
//                 placeholder="First Name"
//                 error={errors.firstName}
//                 className="col-6"
//               />
//               <FormField
//                 label="Last Name"
//                 name="lastName"
//                 control={control}
//                 type="text"
//                 placeholder="Last Name"
//                 error={errors.lastName}
//                 className="col-6"
//               />
//             </div>
//             <FormField
//               label="Company Name"
//               name="companyName"
//               control={control}
//               type="text"
//               placeholder="Company Name"
//               error={errors.companyName}
//             />
//             <FormField
//               label="Country/Region"
//               name="country"
//               control={control}
//               type="select"
//               options={[
//                 { value: "India", label: "India" },
//                 { value: "United States", label: "United States" },
//                 { value: "Canada", label: "Canada" },
//                 { value: "Other", label: "Other" },
//               ]}
//               error={errors.country}
//             />
//             <FormField
//               label="Street Address"
//               name="address"
//               control={control}
//               type="text"
//               placeholder="Apartment, suite, unit, etc. (optional)"
//               error={errors.address}
//             />
//             <div className="form-row row">
//               <FormField
//                 label="Town/City"
//                 name="city"
//                 control={control}
//                 type="text"
//                 error={errors.city}
//                 className="col-md-6"
//               />
//               <FormField
//                 label="State"
//                 name="state"
//                 control={control}
//                 type="select"
//                 options={[
//                   { value: "California", label: "California" },
//                   { value: "Texas", label: "Texas" },
//                   { value: "Other", label: "Other" },
//                 ]}
//                 error={errors.state}
//                 className="col-md-4"
//               />
//               <FormField
//                 label="ZIP Code"
//                 name="zip"
//                 control={control}
//                 type="text"
//                 error={errors.zip}
//                 className="col-md-2"
//               />
//             </div>
//             <FormField
//               label="Phone"
//               name="phone"
//               control={control}
//               type="text"
//               error={errors.phone}
//             />
//             <h2 className='text-style'>Additional Information</h2>
//             <FormField
//               label="Order Notes"
//               name="notes"
//               control={control}
//               type="textarea"
//               placeholder="Notes about your order, e.g. special notes for delivery."
//             />
//             <h2 className='text-style'>Payment</h2>
//             <div className="accordion" id="accordionExample">
//               <PaymentOption
//                 label="Direct bank transfer"
//                 id="bankTransfer"
//                 register={register}
//                 error={errors.paymentMethod}
//               />
//               <PaymentOption
//                 label="Cash on delivery"
//                 id="cashOnDelivery"
//                 register={register}
//                 error={errors.paymentMethod}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary mt-3 mx-auto w-100">
//               Place Order ${getTotalCartPrice()}
//             </button>
//           </form>
//         </div>
//         <div className="col-md-4">
//           <h2 className='text-style'>Your Order</h2>
//           <OrderSummary cart={cart} getTotalCartPrice={getTotalCartPrice} />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const FormField = ({ label, name, control, type, placeholder, error, className, options }) => (
//   <div className={`form-group ${className}`}>
//     <label htmlFor={name}>{label}</label>
//     {type === "select" ? (
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <select {...field} className="form-control" id={name}>
//             {options.map(option => (
//               <option key={option.value} value={option.value}>{option.label}</option>
//             ))}
//           </select>
//         )}
//       />
//     ) : type === "textarea" ? (
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <textarea {...field} className="form-control" id={name} rows="3" placeholder={placeholder}></textarea>
//         )}
//       />
//     ) : (
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <input {...field} type={type} className="form-control" id={name} placeholder={placeholder} />
//         )}
//       />
//     )}
//     {error && <p className='error'>{error.message}</p>}
//   </div>
// );

// const PaymentOption = ({ label, id, register, error }) => (
//   <div className="accordion-item">
//     <h2 className="accordion-header" id={`heading${id}`}>
//       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="false" aria-controls={`collapse${id}`}>
//         <input
//           {...register("paymentMethod")}
//           className="form-check-input"
//           type="radio"
//           name="paymentMethod"
//           id={id}
//           value={id}
//         />
//         &nbsp; {label}
//       </button>
//     </h2>
//     <div id={`collapse${id}`} className="accordion-collapse collapse" aria-labelledby={`heading${id}`} data-bs-parent="#accordionExample">
//       <div className="accordion-body">
//         {label === "Direct bank transfer" ? (
//           "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
//         ) : (
//           "Pay with cash upon delivery."
//         )}
//       </div>
//     </div>
//     {error && <p className='error'>{error.message}</p>}
//   </div>
// );

// const OrderSummary = ({ cart, getTotalCartPrice }) => (
//   <div className="shopping-cart border">
//     <div className="cart-items">
//       <div className='d-flex table-header px-1 fw-bold'>
//         <div className='col-10'>Product</div>
//         <div className='col-2'>Subtotal</div>
//       </div>
//       { cart && cart.length > 0 && cart.map((item) => (
//         <React.Fragment key={item.id}>
//           <div className="d-flex align-items-center">
//             <div className="col-8">
//               <img src={item.imgA} alt={item.imgA} width="90px" height="90px" />
//               <span>  {item.name}</span>
//             </div>
//             <div className='col-2'>
//               <span className=''>x&nbsp;{item.quantity}</span>
//             </div>
//             <div className="subtotal col-2 ">&nbsp; ${(item.price * item.quantity)}</div>
//           </div>
//           <hr />
//         </React.Fragment>
//       ))}
//       <div className='px-3'>
//         <div className='row'>
//           <span className='col-6'>SubTotal</span>
//           <span className='col-6 text-end'>${getTotalCartPrice()}</span>
//         </div>
//         <hr />
//         <div className='row mb-3'>
//           <span className='col'>Total</span>
//           <span className='col text-end'>${getTotalCartPrice()}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default CartPage;


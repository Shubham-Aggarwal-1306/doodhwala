import React, { useEffect } from 'react'
import "./Checkout.css";
import FormInput from '../FormInput/FormInput';
import { useDispatch, useSelector } from 'react-redux';
// import CheckoutFoot from './CheckoutFoot';
import OrderItem from '../OrderItem/OrderItem';
import { updateUserProfile } from '../../Actions/User';
import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { applyPromoCode, getCart, removeFromCart, removePromoCode } from '../../Actions/Cart';
import { toast } from 'react-toastify';
import { createOrder } from '../../Actions/Order';

const trailingActions = (dispatch, id) => (
    <TrailingActions >
        <SwipeAction
            onClick={() => dispatch(removeFromCart(id))}
            destructive={true}
        >
            <div className='checkout__right--box--item--delete'>
                Delete
            </div>
        </SwipeAction>
    </TrailingActions>
);


const Checkout = () => {
    const user = useSelector(state => state.userReducer.user);
    const { cart, loading } = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();
    const userName = (user.displayName) ? (user.displayName) : (user.name);
    const userEmail = (user.email) ? (user.email) : (user.emailData);
    const addressDetails = user.address;
    const cityDetails = user.city;
    const zipDetails = user.zip;
    const countryDetails = user.country;
    const phoneDetails = (user.phoneNumber) ? (user.phoneNumber) : (user.phoneData);
    const [name, setName] = React.useState((userName) ? userName : '');
    const [email, setEmail] = React.useState((userEmail) ? userEmail : '');
    const [phone, setPhone] = React.useState((phoneDetails) ? phoneDetails : '');
    const [address, setAddress] = React.useState((addressDetails) ? addressDetails : '');
    const [city, setCity] = React.useState((cityDetails) ? cityDetails : '');
    const [zip, setZip] = React.useState((zipDetails) ? zipDetails : '');
    const [promo, setPromo] = React.useState(localStorage.getItem("promo") || '');
    const [isPromo, setIsPromo] = React.useState(cart?.discount ? true : false);
    const checkoutHandler = () => {
        if (cart?.items?.length > 0) {
            if (phone=== "") {
                toast.error("Enter Phone Number");
                return;
            }
            if (address==="" || city==="" || zip==="" ) {
                toast.error("Enter Address Details");
                return;
            }
            if (zip.length !== 6) {
                toast.error("Enter Valid Zip Code");
                return;
            }
            dispatch(updateUserProfile({ name: name || "", address: address || "", altAddress: user.altAddress || "", phoneData: phone || "", alternatePhone: user.alternatePhone || "", emailData: email || "", zip: zip || "", city: city || "" }));
            const addressLine = `${address}, ${city}, ${zip}`;
            dispatch(createOrder(phone, addressLine))
        } else {
            toast.error("Cart is Empty");
        }
    }

    const promoHandler = () => {
        if (promo !== '') {
            console.log("I was Here");
            console.log("")
            dispatch(applyPromoCode(promo, cart._id));
        } else {
            toast.error("Enter Promo Code");
        }
    }

    const removePromoHandler = () => {
        dispatch(removePromoCode(cart._id));
    }

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch, user]);
    useEffect(() => {
        setIsPromo(cart?.discount ? true : false)
    }, [dispatch, cart])
    return (
        <div className='checkout'>
            <div className='checkout__title'>
                Checkout
            </div>
            <div className='checkout__container'>
                <div className='checkout__left'>
                    <div className='checkout__left--title'>
                        Personal Details
                    </div>

                    <div className='checkout__left--form'>
                        <div className='checkout__left--form--item'>
                            <FormInput label='Full Name' type='text' id='fullName' value={name} setInputValue={setName} isDisabled={(user.displayName) ? true : false} />
                        </div>
                        <div className='checkout__left--form--item'>
                            <FormInput label='Email' type='email' id='email' value={email} setInputValue={setEmail} isDisabled={(user.email) ? true : false} />
                        </div>
                        <div className='checkout__left--form--item'>
                            <FormInput label='Phone Number' type='text' id='phone' value={phone} setInputValue={setPhone} isDisabled={(user.phoneNumber) ? true : false} />
                        </div>
                    </div>
                    <div className='checkout__left--title'>
                        Shipping Details
                    </div>
                    <div className='checkout__left--form'>
                        <div className='checkout__left--form--item'>
                            <FormInput label='Street Address' type='text' id='address' value={address} setInputValue={setAddress} />
                        </div>
                        <div className='checkout__left--form--item cp'>
                            <div className='checkout__left--form--cp--city'>
                                <FormInput label='City' type='text' id='city' value={city} setInputValue={setCity} />
                            </div>
                            <div className='checkout__left--form--cp--zip'>
                                <FormInput label='Zip Code' type='text' id='zip' value={zip} setInputValue={setZip}  pattern="^[0-9]{0,6}$" />
                            </div>
                        </div>
                        {/* <div className='checkout__left--form--item'>
                            <FormInput label='Country' type='text' id='country' value={country} setInputValue={setCountry} />
                        </div> */}
                    </div>
                </div>
                <div className='checkout__right'>
                    <div className='checkout__right--title'>
                        Order Summary
                    </div>
                    <div className='checkout__right--box'>
                        <SwipeableList fullSwipe={false}>
                            {loading ? <div className="loading"><div className='loading__circle'></div></div> :
                                cart?.items?.map((item, index) => {
                                    return (

                                        <SwipeableListItem
                                            trailingActions={trailingActions(dispatch, item.product_id._id)}
                                            key={item.product_id._id}
                                        >
                                            <OrderItem
                                                img={item.product_id.images[0]}
                                                productName={item.product_id.title}
                                                size={item.product_id.size}
                                                orderType={item.order_type}
                                                quantity={item.quantity}
                                                price={item.total_amount}
                                            />
                                        </SwipeableListItem>

                                    )
                                })
                            }
                        </SwipeableList>
                    </div>
                    <div className='checkout__right--note'>
                        Note: Swipe left to remove item from the cart.
                    </div>
                    <div className='checkout__right--promo'>
                        <div className='checkout__right--promo--title'>
                            Apply Promocode
                        </div>
                        <div className='checkout__right--promo--form'>
                            <div className='checkout__right--promo--input'>
                                <FormInput label='Promotion or Discount code' type='text' id='promo' value={promo} setInputValue={setPromo} disabled={isPromo} />
                            </div>
                            {isPromo ? <button className='checkout__right--promo--button' style={{ backgroundColor: "red" }} onClick={removePromoHandler}>
                                Remove
                            </button> :
                                <button className='checkout__right--promo--button' onClick={promoHandler}>
                                    Apply Code
                                </button>
                            }
                        </div>
                    </div>
                    <div className='checkout__right--bill'>
                        <div className='checkout__right--bill--item'>
                            <div className='checkout__right--bill--item--title'>
                                Subtotal
                            </div>
                            <div className='checkout__right--bill--item--price'>
                                {cart.sub_total}₹
                            </div>
                        </div>
                        <div className='checkout__right--bill--item'>
                            <div className='checkout__right--bill--item--title'>
                                GST
                            </div>
                            <div className='checkout__right--bill--item--price'>
                                {cart.gst}₹
                            </div>
                        </div>
                        <div className='checkout__right--bill--item'>
                            <div className='checkout__right--bill--item--title'>
                                Total
                            </div>
                            <div className='checkout__right--bill--item--price'>
                                {(!isPromo) ? `${cart.total}₹` : `${cart.total + cart.discount}₹`}
                            </div>
                        </div>
                        {isPromo && <>
                            <div className='checkout__right--bill--item'>
                                <div className='checkout__right--bill--item--title'>
                                    Promo Discount
                                </div>
                                <div className='checkout__right--bill--item--price'>
                                    {cart.discount}₹
                                </div>
                            </div>
                            <div className='checkout__right--bill--item'>
                                <div className='checkout__right--bill--item--title'>
                                    Grand Total
                                </div>
                                <div className='checkout__right--bill--item--price'>
                                    {cart.total}₹
                                </div>
                            </div>
                        </>
                        }
                        <button className='checkout__right--bill--button' onClick={checkoutHandler}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            {/* <CheckoutFoot /> */}
        </div>
    )
}

export default Checkout;
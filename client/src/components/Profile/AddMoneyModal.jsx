import React, { useEffect, useState } from 'react'
import ModalContainer from '../ModalContainer/ModalContainer'
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from 'react-redux';
import { walletCheckout } from '../../Actions/Wallet';
import { toast } from 'react-toastify';
import './AddMoneyModal.css';

const AddMoneyModal = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { loading, success, order_id } = useSelector(state => state.walletReducer);
    const { user } = useSelector(state => state.userReducer);
    const Razorpay = useRazorpay();
    const [amount, setAmount] = useState(0);
    const description = "Add Money to Wallet";
    useEffect(() => {
        if (success) {
            setOpen(false);
            toast.success("Money Added Successfully");
        }
    }, [dispatch, success])
    const submitHandler = async (e) => {
        e.preventDefault();
        if (amount <= 0) {
            toast.error("Amount should be greater than 0");
            return;
        }
        dispatch(walletCheckout(amount, Razorpay, description, user.name || "", user.emailData || "", user.phoneData || ""));
    }

    const handleAmountChange = (e) => {
        if (e.target.value.match("^\\d*$") != null) {
            setAmount(e.target.value);
        }
    }

    return (
        <ModalContainer open={open} setOpen={setOpen} lock={loading}>
            {order_id ? <div className="add-money-process"> Processing Payment </div> : loading ?
                <div className="loading"><div className='loading__circle'></div></div> :
                <div className="add-money-modal">
                    <div className="add-money-modal__header">
                        Add Money
                    </div>
                    <div className="add-money-modal__body">
                        <form onSubmit={submitHandler}>
                            <div className="add-money-modal__body--input">
                                <label htmlFor="amount">Enter Amount</label>
                                <div className="add-money-modal__body--input--amount">
                                    <button type="button" onClick={() => (amount >=100 ) && setAmount(amount - 100)}>-</button>
                                    <input type="text" name="amount" id="amount" value={amount} onChange={handleAmountChange} />
                                    <button type="button" onClick={() => setAmount(amount + 100)}>+</button>
                                </div>
                            </div>
                            <button type="submit" className="add-money-modal__body--button">Add Money</button>
                        </form>
                    </div>
                </div>
            }
        </ModalContainer>

    )
}

export default AddMoneyModal;
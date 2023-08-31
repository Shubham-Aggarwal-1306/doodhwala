import React, { useState } from 'react'
import ModalContainer from '../ModalContainer/ModalContainer';
import { useDispatch, useSelector } from 'react-redux';
import './TryModal.css';
import { addToCart } from '../../Actions/Cart';

const TryModal = ({ open, setOpen, product}) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.cartReducer);
    const [amount, setAmount] = useState(parseInt(process.env.REACT_APP_TRY_MIN));
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(addToCart(product._id, amount, "trial",setOpen));
    }

    const handleAmountChange = (e) => {
        if (e.target.value.match("^\\d*$") != null) {
            setAmount(e.target.value);
        }
    }

    return (
        <ModalContainer open={open} setOpen={setOpen} lock={loading}>
            {loading ?
                <div className="loading"><div className='loading__circle'></div></div> :
                <div className="try-modal">
                    <div className="try-modal__header">
                        Try {product.title}
                    </div>
                    <div className="try-modal__body">
                        <form onSubmit={submitHandler}>
                            <div className="try-modal__body--input">
                                <label htmlFor="amount">Enter Days</label>
                                <div className="try-modal__body--input--amount">
                                    <button type="button" onClick={() => (amount >(parseInt(process.env.REACT_APP_TRY_MIN))) && setAmount(amount - 1)}>-</button>
                                    <input type="text" name="amount" id="amount" value={amount} onChange={handleAmountChange} disabled/>
                                    <button type="button" onClick={() => (amount<(parseInt(process.env.REACT_APP_TRY_MAX)) ) && setAmount(amount + 1)}>+</button>
                                </div>
                            </div>
                            <button type="submit" className="try-modal__body--button">Try</button>
                        </form>
                    </div>
                </div>
            }
        </ModalContainer>

    )
}

export default TryModal;
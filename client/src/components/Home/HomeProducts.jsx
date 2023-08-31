import React, { useEffect } from 'react';
import './HomeProducts.css';
import HomeProductCard from './HomeProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory } from '../../Actions/Product';

const HomeProducts = () => {
    const dispatch = useDispatch();
    const { productsByCategory, loading } = useSelector(state => state.productReducer);
    const { isAuthenticated } = useSelector(state => state.userReducer);
    useEffect(() => {
        dispatch(getProductByCategory("Dairy"));
    }, [dispatch, isAuthenticated]);
    return (
        <div className='home-products'>
            {/* Raw Milk */}
            <div className='home-products__list'>
                <div className='home-products__list--title'>
                    Dairy
                </div>
                <div className='home-products__list--items'>

                    {loading ? <div className="loading">
                        <div className="loading__circle"></div>
                    </div> :
                        productsByCategory.map((product) => {
                            return (
                                <div className='home-products__list--items--item' key={product._id}>
                                    <HomeProductCard product={product} />
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default HomeProducts

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../Actions/Users';
import { Descriptions, Spin } from 'antd';


const UserDetails = () => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state) => state.userReducer);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getUserDetails(id))
    }, [dispatch, id])
    return (
        <>
            <div className="header">
                <div className="heading">
                    User Details
                </div>
                <div className="header__button">
                    <button onClick={() => window.location.href = '/users'}>
                        Back
                    </button>
                </div>
            </div>
            {loading ? <Spin /> :
                <Descriptions layout="vertical" bordered>
                    <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{(user?.email)?(user?.email):(user?.emailData)}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{(user?.phone)?(user?.phone):(user?.phoneData)}</Descriptions.Item>
                    <Descriptions.Item label="Address">{user?.address}</Descriptions.Item>
                    <Descriptions.Item label="City">{user?.city}</Descriptions.Item>
                    <Descriptions.Item label="State">{user?.state}</Descriptions.Item>
                    <Descriptions.Item label="Zip Code">{user?.zip}</Descriptions.Item>
                    <Descriptions.Item label="First Trial">{(user?.first_trial)?("Yes"):("No")}</Descriptions.Item>
                    <Descriptions.Item label="VIP">{(user?.vip)?("Yes"):("No")}</Descriptions.Item>
                    <Descriptions.Item label="Alternate Phone Number">{user?.altPhone}</Descriptions.Item>
                    <Descriptions.Item label="Alternate Address">{user?.altAddress}</Descriptions.Item>
                </Descriptions>
            }
        </>
    )
}

export default UserDetails
import { Badge, Descriptions, Modal, Spin, Table } from 'antd';
import ProductItem from '../ProductItem/ProductItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { acceptOrder, declineOrder, getOrderDetails } from '../../Actions/Orders';
const OrderDetails = () => {
    const dispatch = useDispatch();
    const { order, loading } = useSelector((state) => state.orderReducer);
    console.log(order);
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("subscribe")
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    }
    const handleApprove = () => {
        dispatch(acceptOrder(id));
    }
    const handleReject = () => {
        dispatch(declineOrder(id));
    }
    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);
    return (
        <>
            <div className="header">
                <div className="heading">
                    Order Details
                </div>
                <div className="header__button">
                    <button onClick={() => window.location.href = '/orders'}>
                        Back
                    </button>
                </div>
            </div>
            {loading ? <Spin /> :
                <Descriptions layout="vertical" bordered>
                    <Descriptions.Item label="Product">
                        <ProductItem
                            title={order?.product_id?.title}
                            image={order?.product_id?.images[0]}
                            size={order?.product_id?.size}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Order Type">{order?.order_type?.charAt(0)?.toUpperCase() + order?.order_type?.slice(1)}</Descriptions.Item>
                    <Descriptions.Item label="Order Time">{new Date(order.cart && order?.cart[0].createdAt).toLocaleString()}</Descriptions.Item>
                    {order?.order_type === 'buy' ?
                        <Descriptions.Item label="Delivery Time" span={2}>
                            {new Date(order?.delivery_date).toLocaleString()}
                        </Descriptions.Item>
                        : order?.order_type === 'subscribe' ?
                            <Descriptions.Item label="Subscription Details">
                                <div className="action__buttons">
                                    <div className="action__button">
                                        <button onClick={() => { setIsModalOpen(true); setModalType("subscribe") }}>
                                            Open To View
                                        </button>
                                    </div>
                                </div>
                            </Descriptions.Item>
                            : <Descriptions.Item label="Trial Details">
                                <div className="action__buttons">
                                    <div className="action__button">
                                        <button onClick={() => { setIsModalOpen(true); setModalType("trial") }}>
                                            Open To View
                                        </button>
                                    </div>
                                </div>
                            </Descriptions.Item>
                    }

                    <Descriptions.Item label="Amount">₹{order?.final_price}</Descriptions.Item>
                    <Descriptions.Item label="Quantity">{order?.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Category">{order?.product_id?.category}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        {order?.status === 'pending' ?
                            <>
                                <div className="action__button--group">
                                    <div className="action__button green">
                                        <button onClick={handleApprove}>
                                            Approve
                                        </button>
                                    </div>
                                    <div className="action__button red">
                                        <button onClick={handleReject}>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </>
                            : (order?.status === 'approved') ?
                                <Badge status="success" text="Approved" />
                                : (order?.status === 'cancelled') ?
                                    <Badge status="error" text="Cancelled" />
                                    : (order?.status === 'completed') ?
                                        <Badge status="success" text="Completed" />
                                        : "Error On Status"
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="User Details">
                        Name: {order?.user_id?.name}
                        <br />
                        Email: {(order?.user_id?.email) ? order?.user_id?.email : order?.user_id?.emailData}
                        <br />
                        Phone: {(order?.user_id?.phone) ? order?.user_id?.phone : order?.user_id?.phoneData}
                        <br />
                        Address: {order?.user_id?.address}
                        <br />
                        City: {order?.user_id?.city}
                        <br />
                        State: {order?.user_id?.state}
                        <br />
                    </Descriptions.Item>
                </Descriptions>
            }
            <Modal title="Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{modalType === "subscribe" ? "Months: " + order?.subscribe_id?.months : "Days: " + order?.trial_id?.days}</p>
                <p>{modalType === "subscribe" ? "Start Date: " + new Date(order?.subscribe_id?.start_date).toLocaleDateString() : "Start Date: " + new Date(order?.trial_id?.start_date).toLocaleDateString()}</p>
                <p>{modalType === "subscribe" ? "End Date: " + new Date(order?.subscribe_id?.end_date).toLocaleDateString() : "End Date: " + new Date(order?.trial_id?.end_date).toLocaleDateString()}</p>
                <Table
                    dataSource={modalType === "subscribe" ? order?.subscribe_id?.deliveries : order?.trial_id?.deliveries}
                    columns={[
                        {
                            title: "Date",
                            dataIndex: "date",
                            key: "date",
                            render: (text) => new Date(text).toLocaleDateString(),
                        },
                        {
                            title: "Status",
                            dataIndex: "delivery_status",
                            key: "delivery_status",
                            render: (_, record) => (
                                <>
                                    {record.delivery_status === true ? (
                                        <Badge status="success" text="Delivered" />
                                    ) : (
                                        <Badge status="error" text="Not Delivered" />
                                    )}
                                </>
                            ),
                        },
                        {
                            title: "User Need",
                            dataIndex: "user_need",
                            key: "user_need",
                            render: (_, record) => (
                                <>
                                    {record.user_need === true ? (
                                        <Badge status="success" text="Yes" />
                                    ) : (
                                        <Badge status="error" text="No" />
                                    )}
                                </>
                            ),
                        }
                    ]}
                    scroll={{ y: 240 }}
                />
            </Modal>
        </>

    )
};
export default OrderDetails;
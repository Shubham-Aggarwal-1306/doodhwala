import React, { useEffect } from 'react';
import { Modal, Table } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { deleteCoupon, getCoupons } from '../../Actions/Coupons';
const Coupons = () => {
  const dispatch = useDispatch();
  const { coupons, loading } = useSelector((state) => state.couponReducer);
  const dataWithKey = coupons?.map((item) => {
    return {
      ...item,
      key: item._id,
    }
  });
  const handleDelete = () => {
    dispatch(deleteCoupon(couponId));
    setIsModalOpen(false);
  }
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [couponId, setCouponId] = React.useState("");
  const columns = [
    {
      title: 'Coupon Code',
      dataIndex: 'coupon_code',
      key: 'coupon_code',
      sorter: (a, b) => a.coupon_code > b.coupon_code,
    },
    {
      title: 'Discount Type',
      dataIndex: 'discount_type',
      key: 'discount_type',
      sorter: (a, b) => a.discount_type > b.discount_type,
      render: (text, record) => (
        <div className="discount__type">
          {(record.discount_type === "percent") ? "Percentage" : "Fixed"}
        </div>
      ),
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount',
      key: 'discount',
      sorter: (a, b) => a.discount > b.discount,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity > b.quantity,
      render: (text, record) => (
        <div className="quantity__text">
          {(record.quantity) ? record.quantity : "Not Specified"}
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price > b.price,
      render: (text, record) => (
        <div className="price__text">
          {(record.price) ? record.price : "Not Specified"}
        </div>
      ),
    },
    {
      title: 'First Order',
      dataIndex: 'first_order',
      key: 'first_order',
      sorter: (a, b) => a.first_order > b.first_order,
      render: (text, record) => (
        <div className="first__order">
          {(record.first_order) ? "Yes" : "No"}
        </div>
      ),
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry',
      key: 'expiry',
      sorter: (a, b) => a.expiry > b.expiry,
      render: (text, record) => (
        <div className="expiry__date">
          {(record.expiry) ?
            new Date(record.expiry).toLocaleDateString() : "No Expiry"}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <div className="action__buttons">
          <div className="action__button" onClick={() => { setCouponId(record._id); setIsModalOpen(true) }}>
            <button>Delete</button>
          </div>
        </div>
      ),
    }
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.title,
    }),
  };
  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);
  return (
    <>
      <div className="coupons">
        <div className="header">
          <div className="heading">
            Coupons
          </div>
          <div className="header__button">
            <button onClick={() => { window.location.href = "/coupons/add" }}>
              Add Coupon<span>+</span>
            </button>
          </div>
        </div>
        <div className="table">
          <Table
            dataSource={dataWithKey}
            columns={columns}
            loading={loading}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            pagination={{
              position: ['bottomRight'],
            }}
            sticky={true}
            sortDirections={['descend', 'ascend']}
            scroll={{ x: 1250, y: 430 }}

          />
        </div>
      </div>
      <Modal title="Delete Coupon" open={isModalOpen} onOk={handleDelete} onCancel={() => { setIsModalOpen(false); setCouponId("") }}>
        <p>Do you want to proceed deleting your Coupon?</p>
      </Modal>
    </>
  )
}

export default Coupons;

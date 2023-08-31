import React, { useEffect } from 'react';
import { products } from '../../SampleData/products';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getPayments } from '../../Actions/Payments';

const Payments = () => {
  const dispatch = useDispatch();
  const {payments, loading} = useSelector((state) => state.paymentReducer);
  const dataWithKey = payments?.map((payment) => {
    return {
      ...payment,
      key: payment._id,
    };
  });
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name > b.name,
      render : (text, record) => (
        <>
          {record.user_id && record.user_id.name}
        </>
      )
    },
    {
      title: 'Order Type',
      dataIndex: 'order_type',
      key: 'order_type',
      sorter: (a, b) => a.order_type > b.order_type,
      render : (text, record) => (
        <>
          {/* Uppercase First Letter */}
          {record.order_type && record.order_type.charAt(0).toUpperCase() + record.order_type.slice(1)}
        </>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount > b.amount,
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transaction_type',
      key: 'transaction_type',
      sorter: (a, b) => a.transaction_type > b.transaction_type,
      render : (text, record) => (
        <>
          {/* Uppercase First Letter */}
          {record.transaction_type && record.transaction_type.charAt(0).toUpperCase() + record.transaction_type.slice(1)}
        </>
      )
    },
    {
      title: 'Payment Response',
      dataIndex: 'payment_response',
      key: 'payment_response',
      sorter: (a, b) => a.payment_response > b.payment_response,
      render : (text, record) => (
        <>
          {/* Uppercase First Letter */}
          {record.payment_response && record.payment_response.charAt(0).toUpperCase() + record.payment_response.slice(1)}
        </>
      )
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.title,
    }),
  };
  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);
  return (
    <div className="products">
      <div className="header">
        <div className="heading">
          Payments
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
          scroll={{ x: 1250, y: 450 }}
        />
      </div>
    </div>
  )
}

export default Payments;

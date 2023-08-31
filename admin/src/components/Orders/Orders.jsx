import React, { useEffect } from 'react';
import { products } from '../../SampleData/products';
import { Radio, Table } from 'antd';
import ProductItem from '../ProductItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Actions/Orders';
const Orders = () => {
  const dispatch = useDispatch();
  const {orders, loading} = useSelector((state) => state.orderReducer);
  const dataWithKey = orders?.map((order) => {
    return {
      ...order,
      key: order._id,
    };
  });
  const [selectedOption, setSelectedOption] = React.useState('all');
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      sorter: (a, b) => a.title > b.title,
      render: (text, record) => (
        <ProductItem title={record?.product_id?.title} image={record?.product_id?.images && record?.product_id?.images[0]} size={record?.product_id?.size} />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price > b.price,
      render: (text, record) => (
        <div className="price">
          {/* rupees symbol */}
          ₹{record?.product_id?.price}
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity > b.quantity,
    },
    {
      title: 'Type',
      dataIndex: 'order_type',
      key: 'order_type',
      sorter: (a, b) => a.order_type > b.order_type,
      render: (text, record) => (
        <>
          {/* Uppercase First Letter */}
          {record.order_type.charAt(0).toUpperCase() + record.order_type.slice(1)}
        </>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'delivery_date',
      key: 'delivery_date',
      sorter: (a, b) => a.delivery_date > b.delivery_date,
      defaultSortOrder: 'descend',
      render: (text, record) => (
        <>
          {new Date(record.delivery_date).toLocaleDateString()}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="action__button">
          <button onClick={() => window.location=`/orders/${record._id}`}>More</button>
        </div>
      ),
    }
  ];
  useEffect(() => {
    dispatch(getOrders(selectedOption));
  }, [selectedOption, dispatch]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.title,
    }),
  };
  return (
    <div className="products">
      <div className="header">
        <div className="heading">
          Orders
        </div>
      </div>
      <Radio.Group defaultValue="all" onChange={(e) => setSelectedOption(e.target.value)}>
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="buy">Buy</Radio.Button>
        <Radio.Button value="subscribe">Subscribe</Radio.Button>
        <Radio.Button value="trial">Trial</Radio.Button>
        <Radio.Button value="pending">Pending</Radio.Button>
        <Radio.Button value="approved">Approved</Radio.Button>
        <Radio.Button value="cancelled">Cancelled</Radio.Button>
        <Radio.Button value="completed">Completed</Radio.Button>
      </Radio.Group>
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
          scroll={{ x: 1250, y: 420 }}
        />
      </div>
    </div>
  )
}

export default Orders;


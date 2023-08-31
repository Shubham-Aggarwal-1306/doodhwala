import React, { useEffect } from 'react';
import { products } from '../../SampleData/products';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Actions/Users';


const Users = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userReducer);
  const dataWithKey = users?.map((user) => {
    return {
      ...user,
      key: user._id,
    };
  });
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name > b.name,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone > b.phone,
      render: (text, record) => (
        <>
          {record.phone ? record.phone : record.phoneData}
        </>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email > b.email,
      render: (text, record) => (
        <>
          {record.email ? record.email : record.emailData}
        </>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address > b.address,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="action__button">
          <button onClick={() => window.location.href = `/users/${record._id}`}>
            More
          </button>
        </div>
      ),
    }
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
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div className="products">
      <div className="header">
        <div className="heading">
          Users
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

export default Users;

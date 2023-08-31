import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../../Actions/Messages';

const Messages = () => {
  const dispatch = useDispatch();
  const {messages, loading} = useSelector((state) => state.messageReducer);
  const dataWithKey = messages?.map((item) => {  
    return {
      ...item,
      key: item._id,
    }
  });
  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name > b.name,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email > b.email,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: 600,
      sorter: (a, b) => a.message > b.message,
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // Enter Code Here
    },
    getCheckboxProps: (record) => ({
      name: record._id,
    }),
  };
  return (
    <div className="messages">
      <div className="header">
        <div className="heading">
          Messages
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

export default Messages;

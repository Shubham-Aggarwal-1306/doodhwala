import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newCoupon } from '../../Actions/Coupons';
import { Button, DatePicker, Form, Input, InputNumber, Select, Space, Switch } from 'antd';
const { Option } = Select;
const CouponDetails = () => {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(newCoupon(values));
    };
    const formItemLayout = {
        // labelCol: {
        //   span: 6,
        // },
        // wrapperCol: {
        //   span: 14,
        // },
    };
    const [type, setType] = useState("fixed");
    return (
        <>
            <div className="header">
                <div className="heading">
                    Add Coupon
                </div>
                <div className="header__button">
                    <button onClick={() => window.location.href = '/coupons'}>
                        Back
                    </button>
                </div>

            </div>
            <div className="coupon-details__form">
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{
                        'expiry': '',
                        'discount_type': 'fixed',
                        'discount': 1,
                        'quantity': 1,
                        'price': 1000,
                        'first_order': false,
                    }}
                >
                    <Form.Item name="expiry" label="Expiry" wrapperCol={{ span: 8 }}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="discount_type" label="Discount Type" wrapperCol={{ span: 8 }}>
                        <Select>
                            <Option value="fixed">Fixed</Option>
                            <Option value="percent">Percent</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="discount" label="Discount" wrapperCol={{ span: 8 }}>
                        <InputNumber
                            defaultValue={1}
                            formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity" wrapperCol={{ span: 8 }}>
                        <InputNumber
                            defaultValue={1}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item name="price" label="Price" wrapperCol={{ span: 8 }}>
                        <InputNumber
                            defaultValue={1000}
                            formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item name="first_order" label="First Order" wrapperCol={{ span: 8 }}>
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 12,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default CouponDetails
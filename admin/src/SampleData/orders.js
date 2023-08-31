import product1 from "../Assets/Images/product1.png";
import product2 from "../Assets/Images/product2.png";
import product3 from "../Assets/Images/product3.png";
import product4 from "../Assets/Images/product4.png";
import product5 from "../Assets/Images/product5.png";
export const orders = [
    {
        id: "1",
        userId: "1",
        cart: [
            {
                productId: "1",
                quantity: 1,
                type: "trial",
            },
        ],
        status: "pending",
        paymentStatus: "success",
        type: "trial",
        address: "53-B, MICO Street, New Delhi, India",
        altAddress: "56-B, MICO Street, New Delhi, India",
        phone: "9876543210",
        altPhone: "9876543210",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [{
            id: "1",
            title: "Cow Milk",
            image: product1,
            price: 50,
            size: "2 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        }],
    },

    {
        id: "2",
        userId: "1",
        cart: [
            {
                productId: "1",
                quantity: 1,
                type: "trial",
            },
            {
                productId: "2",
                quantity: 1,
                type: "buy",
            },
        ],
        status: "pending",
        paymentStatus: "success",
        address: "53-B, MICO Street, New Delhi, India",
        altAddress: "56-B, MICO Street, New Delhi, India",
        phone: "9876543210",
        altPhone: "9876543210",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [{
            id: "1",
            title: "Cow Milk",
            image: product1,
            price: 50,
            size: "2 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        },
        {
            id: "2",
            title: "Buffalo Milk",
            image: product2,
            price: 60,
            size: "2 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        }],
    },
    {
        id: "3",
        userId: "3",
        cart: [
            {
                productId: "1",
                quantity: 1,
                type: "trial",
            },
            {
                productId: "2",
                quantity: 1,
                type: "buy",
            },
            {
                productId: "3",
                quantity: 1,
                type: "subscription",
                subscriptionId: "1",
            },
        ],
        status: "pending",
        paymentStatus: "success",
        address: "1/6097 Street, New Delhi, India",
        altAddress: "1/6107 Street, New Delhi, India",
        phone: "9876543210",
        altPhone: "9876543210",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [{
            id: "1",
            title: "Cow Milk",
            image: product1,
            price: 50,
            size: "2 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        },
        {
            id: "2",
            title: "Buffalo Milk",
            image: product2,
            price: 60,
            size: "2 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        },
        {
            id: "3",
            title: "Fresh Buttermilk",
            image: product3,
            price: 20,
            size: "1 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        }],
    },
    {
        id: "4",
        userId: "4",
        cart: [
            {
                productId: "1",
                quantity: 1,
                type: "trial",
            },
            {
                productId: "2",
                quantity: 5,
                type: "buy",
            },
            {
                productId: "4",
                quantity: 1,
                type: "subscription",
                subscriptionId: "1",
            },
        ],
        status: "pending",
        paymentStatus: "success",
        address: "1/6097 Street, New Delhi, India",
        altAddress: "1/6107 Street, New Delhi, India",
        phone: "9876543210",
        altPhone: "9876543210",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [{
            id: "1",
            title: "Cow Milk",
            image: product1,
            price: 50,
            size: "2 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        },
        {
            id: "2",
            title: "Buffalo Milk",
            image: product2,
            price: 60,
            size: "2 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        },
        {
            id: "4",
            title: "Fresh Desi Cow Ghee",
            image: product4,
            price: 1000,
            size: "1 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        }],
    },
    {
        id: "5",
        userId: "5",
        cart: [
            {
                productId: "1",
                quantity: 1,
                type: "trial",
            },
            {
                productId: "2",
                quantity: 5,
                type: "buy",
            },
            {
                productId: "4",
                quantity: 1,
                type: "subscription",
                subscriptionId: "1",
            },
            {
                productId: "5",
                quantity: 1,
                type: "subscription",
                subscriptionId: "2",
            },
        ],
        status: "pending",
        paymentStatus: "success",
        address: "1/6097 Street, New Delhi, India",
        altAddress: "1/6107 Street, New Delhi, India",
        phone: "9876543210",
        altPhone: "9876543210",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [{
            id: "1",
            title: "Cow Milk",
            image: product1,
            price: 50,
            size: "2 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        },
        {
            id: "2",
            title: "Buffalo Milk",
            image: product2,
            price: 60,
            size: "2 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        },
        {
            id: "4",
            title: "Fresh Desi Cow Ghee",
            image: product4,
            price: 1000,
            size: "1 Litre",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        },
        {
            id: "5",
            title: "Fresh Paneer",
            image: product5,
            price: 200,
            size: "1 Kg",
            stock: 10,
            brandName: "AapkaDoodhwala",
            category: "Dairy",
        }],
    }
]
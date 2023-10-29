import React from 'react'
import Item from '../components/Items/ItemProducts'
import Pagingation from '../components/Pagingation'
import ItemCustomers from '../components/Items/ItemCustomers'

const Customers = () => {
    const itemCustomers = [

        {
            image: 'https://bizweb.dktcdn.net/100/415/697/products/1-a76844f8-43b5-4ba4-8f94-08ff2f36394a.jpg?v=1657108723990',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana123@gmail.com',
            location: 'Hà Nội',
            index: 1
        },
        {
            image: 'https://bizweb.dktcdn.net/100/415/697/products/1-a76844f8-43b5-4ba4-8f94-08ff2f36394a.jpg?v=1657108723990',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana123@gmail.com',
            location: 'Hà Nội',
            index: 2
        },
        {
            image: 'https://bizweb.dktcdn.net/100/415/697/products/1-a76844f8-43b5-4ba4-8f94-08ff2f36394a.jpg?v=1657108723990',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana123@gmail.com',
            location: 'Hà Nội',
            index: 3
        },
        {
            image: 'https://bizweb.dktcdn.net/100/415/697/products/1-a76844f8-43b5-4ba4-8f94-08ff2f36394a.jpg?v=1657108723990',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana123@gmail.com',
            location: 'Hà Nội',
            index: 4
        },
        {
            image: 'https://bizweb.dktcdn.net/100/415/697/products/1-a76844f8-43b5-4ba4-8f94-08ff2f36394a.jpg?v=1657108723990',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana123@gmail.com',
            location: 'Hà Nội',
            index: 5
        },
        {
            image: 'https://bizweb.dktcdn.net/100/415/697/products/1-a76844f8-43b5-4ba4-8f94-08ff2f36394a.jpg?v=1657108723990',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana123@gmail.com',
            location: 'Hà Nội',
            index: 6
        },
        {
            image: 'https://bizweb.dktcdn.net/100/415/697/products/1-a76844f8-43b5-4ba4-8f94-08ff2f36394a.jpg?v=1657108723990',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana123@gmail.com',
            location: 'Hà Nội',
            index: 7
        }
    ]
    return (
        <div className="selling">
            <p className="title-product">Product</p>

            <div className="title-table">
                <p>Index</p>
                <p>Image</p>
                <p>Name</p>
                <p>Email</p>
                <p>Location</p>
                <p>Action</p>
            </div>

            {
                itemCustomers.map((item, index) => (
                    <div key={index}>
                        <ItemCustomers customer={item} />
                    </div>
                ))
            }
            <Pagingation />


        </div>
    )
}

export default Customers
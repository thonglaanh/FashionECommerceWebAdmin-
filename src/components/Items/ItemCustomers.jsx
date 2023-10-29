import React from 'react'
import '../../styles/Item.css'
const ItemCustomers = ({ customer }) => {
    return (
        <div className='product-container'>
            <p className='product-index'>#{customer.index}</p>
            <>
                <img className='product-image' src={customer.image} />
                <p>{customer.name}</p></>
            <p className='product-price'>{customer.email}</p>
            <p className='product-quantity'>{customer.location}</p>
            <a href="" className='view-detail'>View detail</a>
        </div>
    )
}

export default ItemCustomers
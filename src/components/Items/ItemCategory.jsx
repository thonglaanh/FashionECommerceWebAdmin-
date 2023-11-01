import React from 'react'
import '../../styles/Item.css'
const ItemCategory = ({ category }) => {
    return (
        <div className='category-container' >
            <p className='product-index'>#{category.index}</p>
            <>
                <img className='product-image' src={category.image} />
                <p>{category.name}</p></>
            <div>
            <a href="" className='view-update'>Update</a>
            <a href="" className='view-delete'>Delete</a>
            </div>
        </div>
    )
}

export default ItemCategory
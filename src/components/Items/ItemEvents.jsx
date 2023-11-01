import React from 'react'
import '../../styles/Item.css'
const ItemEvents = ({ event }) => {
    return (
        <div className='product-container'>
            <p className='product-index'>#{event.index}</p>
            <>
                <img className='product-image' src={event.image} />
                <p>{event.name}</p></>
            <p className='product-price'>{event.start}</p>
            <p className='event-end'>{event.end}</p>
            <a href="" className='view-detail'>View detail</a>
        </div>
    )
}

export default ItemEvents
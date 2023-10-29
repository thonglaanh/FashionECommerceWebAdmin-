import React from 'react'
import Item from '../components/Items/ItemShop'
import Pagingation from '../components/Pagingation'
const Shop = () => {
    const itemProducts = [
        {
            image: 'https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/318068307_5817467454976182_3633574062683588495_n.jpg?1692958575148',
            name: 'Teelab',
            rate: '4/5',
            quantity: '100',
            index: 1
        },
        {
            image: 'https://localbrand.vn/wp-content/uploads/2021/07/levents-local-brand-1.jpg',
            name: 'Levent',
            rate: '4.5/5',
            quantity: '98',
            index: 2
        },
        {
            image: 'https://filebroker-cdn.lazada.vn/kf/Sc3c175e3adfd470aadd84b3107f1720dq.jpg',
            name: 'Coolmate',
            rate: '3/5',
            quantity: '85',
            index: 3
        },
        {
            image: 'https://img.ws.mms.shopee.vn/4464aa5f9ff3bd6ddd36f0f21fa1b3e9',
            name: 'Badhabits',
            rate: '5/5',
            quantity: '77',
            index: 4
        },
        {
            image: 'https://bizweb.dktcdn.net/100/369/010/themes/914385/assets/brand1.png?1697908711435',
            name: 'Dirty coin',
            rate: '4/5',
            quantity: '77',
            index: 5
        },

    ]
    return (
        <div className="selling">
            <p className="title-product">Product</p>

            <div className="title-table">
                <p>Index</p>
                <p>Image</p>
                <p>Name</p>
                <p>Quantity product</p>
                <p>Rate</p>
                <p>Action</p>
            </div>

            {
                itemProducts.map((item, index) => (
                    <div key={index}>
                        <Item shop={item} />
                    </div>
                ))
            }
            <Pagingation />


        </div>
    )
}

export default Shop
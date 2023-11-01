import React from 'react'
import Pagingation from '../components/Pagingation'
import ItemCategory from '../components/Items/ItemCategory'

const Categoties = () => {
    const itemProducts = [
        {
            image: 'https://toigingiuvedep.vn/wp-content/uploads/2022/04/ao-thun-in-hinh-1.jpg',
            name: 'Sweather',
            index: 1
        },
        {
            image: 'https://mcdn.coolmate.me/image/June2021/top-7-dia-chi-mua-giay-da-nam-cao-cap-ha-noi-11.jpg',
            name: 'Sport shoes',
            index: 2
        },
        {
            image: 'https://mcdn.coolmate.me/image/June2021/top-7-dia-chi-mua-giay-da-nam-cao-cap-ha-noi-11.jpg',
            name: 'T-shirt',
            index: 4
        }
       
    ]
    return (
        <div className="selling">
            <p className="title-product">Product</p>
            <div className='option-menu'>
                <button class="add-button">Thêm dữ liệu</button>
                <div class="filter-dropdown">
                    <select class="filter-dropdown-select">
                        <option value="all">Tất cả</option>
                        <option value="option1">Tùy chọn 1</option>
                        <option value="option2">Tùy chọn 2</option>
                        <option value="option3">Tùy chọn 3</option>
                    </select>
                </div>
            </div>
            

            <div className="title-table-category">
                <p>Index</p>
                <p>Image</p>
                <p>Name</p>
                <p>Action</p>
            </div>

            {
                itemProducts.map((item, index) => (
                    <div key={index}>
                        <ItemCategory category={item} />
                    </div>
                ))
            }
            <Pagingation />


        </div>
    )
}

export default Categoties
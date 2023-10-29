import React from 'react'
import '../styles/DashBroad.css'
const DashBroad = () => {
    const itemStatistical = [
        {
            background: '#FFCC99',
            icon: 'assets/people.png',
            title: 'Customers',
            statistical: '10,012'
        },
        {
            background: '#99FF33',
            icon: 'assets/category (2).png',
            title: 'Category',
            statistical: '12'
        },
        {
            background: '#97FFFF',
            icon: 'assets/products.png',
            title: 'Products',
            statistical: '300,328'
        },
        {
            background: '#EE82EE',
            icon: 'assets/storecolor.png',
            title: 'Stores',
            statistical: '120'
        },
        {
            background: '#D2B48C',
            icon: 'assets/bill.png',
            title: 'Bills',
            statistical: '6,444'
        },
    ]
    return (
        <div>
            <p className='title-home'>Trang chủ</p>
            <div className="statistical">
                <p className="title-block">Statistical</p>
                <div className="item-statistical">
                    {
                        itemStatistical.map((item, index) => (
                            <div className='contaner-statistical'>
                                <div className="statistical-icon" style={{ backgroundColor: `${item.background}` }}>
                                    <img src={require(`../${item.icon}`)} alt={item.name} />
                                </div>
                                <div>
                                    <div className="statistical-number">{item.statistical}</div>
                                    <div className="statistical-title">{item.title}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="selling">
                <p className="title-block">Top selling</p>
            </div>
        </div>
    )
}

export default DashBroad
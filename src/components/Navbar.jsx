import { Avatar, Button, Menu, Typography } from 'antd';
import React from 'react'
import {Link} from 'react-router-dom';
import icon from '../assets/cryptocurrency.png'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';



const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} />
        <Typography.Title level={2} className="logo" >
          <Link to='/'>Cryptic</Link>
        </Typography.Title>
        {/* <Button className="menu-control-container">
          
        </Button> */}
      </div>
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />} >
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />} >
          <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />} >
          <Link to='/exchanges'>Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />} >
          <Link to='/news'>News</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar

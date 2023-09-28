import React, { useState } from 'react';
import { Menu } from 'antd';


const items = [
    {
      label:  (
        <a href="/home">
          Search
        </a>
      ),
      key: 'mail',
     
    },
    {
      label:  (
        <a href="/home">
          Rated
        </a>
      ),
      key: 'app',
      
    
    },
   
    
  ];


const HeaderMenu = ()=> {
   
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;

}


export default HeaderMenu;
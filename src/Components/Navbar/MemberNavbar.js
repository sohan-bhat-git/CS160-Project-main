import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

import './Navbar.css';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
const MemberNavbar = (props) => {
  console.log(props)
  return  (
  <AppBar className = 'navbar' position="static" style = {{height: 70}}>
        <Toolbar className = 'navbar-body'>
          {/* <img 
            onClick = {() =>  {props.history.push("/main")}}
            className = 'navbar-logo' 
            id= 'admin-logo'
            src={process.env.PUBLIC_URL + '/LogoText.png'} />  */}
          <div className = 'navbar-links-container'>
            
            <ProfileDropdown {...props}/>
            
          </div>
        </Toolbar>
    </AppBar>
  )
}

export default MemberNavbar;
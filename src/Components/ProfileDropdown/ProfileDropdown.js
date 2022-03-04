import { Button, Divider } from '@material-ui/core';
import React from 'react';
import {AvatarMenu, MenuItem } from 'react-rainbow-components';
import {Link, Redirect} from "react-router-dom";

import './profile-dropdown.css'

const ProfileDropdown = (props) => {
  return (
    <React.Fragment>
            <AvatarMenu
                className='profile-menu'
                // id="avatar-menu"
                src={process.env.PUBLIC_URL + '/profile.png'}
                // assistiveText= ""
                // menuAlignment="right"
                // menuSize="small"
                avatarSize="large"
                // title="Tahimi Leon"
            >
              {(props.user) ? 
                <li className= "profile-drop-header">
                    <div>
                        <p>
                          {props.user.firstName + ' ' + props.user.lastName} 
                        </p>
                        <p className = 'profile-drop-email'>
                          {props.user.email}
                        </p>
                    </div>
                    <Divider/>
                </li> : null}


                {/* <MenuDivider variant="space" />
                {props.links.map((link, index) => {
                  return(
                    <Link key = {index} className ='admin-link' to = {link.to} onClick = {link.click}>
                      <MenuItem
                          className ='profile-menu-item'
                          label= {link.label}
                      />
                    </Link>
                  ) 
                })} */}
                {/* <Link className ='admin-link' to = 'upload'>
                  <MenuItem
                      className ='profile-menu-item'
                      label="Upload"
                      // iconPosition="left"
                  />
                </Link>
                */}
                <Button className = 'admin-link' onClick = {() =>  {props.history.push("/account")}} >
                 
                  Account
                </Button> 
                <Button className = 'admin-link'  to = '/' onClick = {props.handleLogout}>
                  {/* <MenuItem
                      className ='profile-menu-item'
                      label="Logout"
                  /> */}
                  Logout
                </Button> 
                
            </AvatarMenu>
    </React.Fragment>
  )
}

export default ProfileDropdown;
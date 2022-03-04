import React from 'react';
import DefaultNavbar from './DefaultNavbar';
import MemberNavbar from './MemberNavbar';

const NavbarWrapper = ({
  component: Component, ...appProps
}) => {
  const handleLogout = () => {
    appProps.setAuthenticated(false);
    window.localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  const getNavBar = (verified) =>{
    if(verified){
      return <MemberNavbar  {...appProps} handleLogout={handleLogout}/>;
    }else{
      return <DefaultNavbar handleLogout={handleLogout}/>;
    }
  }
  return (
    <React.Fragment>
      {(getNavBar(appProps.authenticated))}
      <Component {...appProps}></Component>
    </React.Fragment>
  )
}

export default NavbarWrapper;

import {Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function Main(props) {
  return (
    <React.Fragment>
      
      <div style = {{padding: 0 , width: '100%', textAlign: '-webkit-center'}}>
        

  
        <Grid container style = {{ width: '85%', justify: 'center', marginTop: 15}} spacing = {10}>
          <Grid item xs = {12}> 
            <Typography variant = 'h4' align = 'center'>

              Main Page
            </Typography>
          </Grid>
          
          
        </Grid>
      </div>
    </React.Fragment>
  );
}
import { Divider, Grid, Typography } from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { getUser } from '../../ApiFunctions/User';
import { getOneListing } from '../../ApiFunctions/Listing';

const Account = (props) => {
  const [listings, setListing] = useState([]);
  const [listingsBought, setListingBought] = useState([]);

  const getUserListings = async() => {
    let listingObjs = [];
    let listingBoughtObjs = [];
    let listingIds = await getUser(props.user.id);
    let boughtIds = listingIds.data.bought;

    console.log(boughtIds)
    listingIds = listingIds.data.listings
    

    
    const promise = listingIds.map(async(id) => {
      let listing = await getOneListing(id);
      
      listingObjs.push(listing);
    })
    const promise2 = boughtIds.map(async(id) => {
      let listing = await getOneListing(id);
      
      listingBoughtObjs.push(listing);
    })
    Promise.all(promise).then(() => {
      setListing(listingObjs);
    })
    Promise.all(promise2).then(() => {
      setListingBought(listingBoughtObjs);
    })


  }

  useEffect(async() => {
    await getUserListings();
    
  }, [])


  return(
    <div style = {{padding: 0 , width: '100%', textAlign: '-webkit-center'}}>
      <Grid container spacing = {5} style = {{ width: '85%', justify: 'center', marginTop: 15}}>
        <Grid item xs = {12} style = {{textAlign: 'left'}}>       
          <Typography variant="h4">My Account</Typography>
          <Divider/>
        </Grid>
        {/* {listings.map((listing, index) => {
          console.log(listing)
          return(<Grid item key = {listing.body.data._id} item xs = {12} sm  = {6} lg = {4}>
              <Listing
                {...listing.body.data}
                buy ={false}
              /> 
            </Grid>)
        })}
        

        <Grid item xs = {12} style = {{textAlign: 'left'}}>      
          <Typography variant="h4">Listings Bought</Typography>
          <Divider/>
        </Grid>
        {listingsBought.map((listing, index) => {
          console.log(listing)
          return(<Grid item key = {listing.body.data._id} item xs = {12} sm  = {6} lg = {4}>
              <Listing
                {...listing.body.data}
                buy ={false}
              /> 
            </Grid>)
        })}
         */}
      </Grid>
    </div>
  )
}

export default Account
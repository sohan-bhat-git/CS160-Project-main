import axios from 'axios';


export const getListings = async() => {
  let response = {error: false, body: null};
  await axios
    .get('http://localhost:5000/listing/getListings')
    .then((res) => {
      response.body = res;
    })
    .catch(error => {
      response.error = true;
      response.body = error;
    })

  return response;
}

export const createListing = async(listing) => {
  let response = {error: false, body: null};
  await axios
    .post('http://localhost:5000/listing/createListing', {...listing})
    .then((res) => {
      response.body = res;
    })
    .catch(error => {
      response.error = true;
      response.body = error;
    })
  return response;
}

export const getOneListing = async(id) => {
  let response = {error: false, body: null};
  await axios
    .post('http://localhost:5000/listing/getOneListing', {id})
    .then((res) => {
      response.body = res;
    })
    .catch(error => {
      response.error = true;
      response.body = error;
    })
  return response;
}

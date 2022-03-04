import axios from 'axios';


export async function createUser(user){
  let response = {error: false, body: null};
  await axios
    .post("http://localhost:5000/user/createUser", user)
    .then((res) => {
      response.body = res;
    })
    .catch(error =>  {
      response.error = true;
      response.body = error;

    })
  return response
}

export async function login(user){
  let response = {error: false, body: null};
  await axios
    .post("http://localhost:5000/user/login", user)
    .then((res) => {
      response.body = res;
    })
    .catch(error =>  {
      response.error = true;
      response.body = error;

    })
  return response
}

export const checkIfUserIsSignedIn = async() => {
  const token = window.localStorage ? window.localStorage.getItem('jwtToken'):'';
  if(!token){
    return token;
  }
  const response = await axios
    .post('http://localhost:5000/user/verify', { token })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
  return response;
}

export const getUser = async(id) => {
  const token = window.localStorage ? window.localStorage.getItem('jwtToken'):'';
  if(!token){
    return token;
  }
  const response = await axios
    .post('http://localhost:5000/user/getUser', { id })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
  return response;
}
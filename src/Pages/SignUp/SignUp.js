import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Alert} from '@material-ui/lab/';
import {createUser} from '../../ApiFunctions/User';

import $ from 'jquery'; 

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert:{
    width: '100%',
    margin: theme.spacing(2,0,0)
  }
}));
export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [address, setAddress] = useState('hi');
  const [payment, setPayment] = useState('bye');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)
  const submitHandler = async(user) => {
    
    createUser(user)
      .then(res => {
        setError(res.error);
        setSuccess(!res.error);
      })
    return false;
  }
 
  $('#signup-form').submit(async function (e) {
    e.preventDefault() 
    // await submitHandler({email,firstName,lastName,password, address,payment});
    return false;
   });
  return (
    <Container component="main" maxWidth="xs">
     

      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h4">
          Sign up
        </Typography>
        {(error) ? <Alert className={classes.alert} severity="error">Account Creation Unsuccessful</Alert> : null}
         {(success) ? <Alert className={classes.alert} severity="success">Account Creation Successful</Alert> : null}
        <form id = 'signup-form' className={classes.form} onSubmit = {() => submitHandler({email,firstName,lastName,password, address,payment})} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                // autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                // id="firstName"
                label="First Name"
                onChange = {(e) => {setFirstName(e.target.value)}}

                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange = {(e) => {setLastName(e.target.value)}}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {(e) => {setEmail(e.target.value)}}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {(e) => {setPassword(e.target.value)}}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" to ='/Login'>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}


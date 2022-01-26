//import { Form, Button } from "react-bootstrap";
import React, { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Button
} from '@chakra-ui/react'
import classes from './UserProfile.module.css'

const UserProfile: React.FC = () => {

    const newPasswordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const history = useHistory()

    

    const authCtx = useContext(AuthContext)

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    
        const enteredNewPassword = newPasswordInputRef.current!.value;
        const enteredConfirmPassword = confirmPasswordRef.current!.value;
        
    
        axios('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB89swc_F8hFkPq8xqnZVhKGmv0MrXMkP4', {
          method: 'POST',
          data: {
            idToken: authCtx.token,
            password: enteredNewPassword,
            returnSecureToken: false
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.status === 200) {
          if(enteredNewPassword === enteredConfirmPassword) {
            history.replace('/')
          } else {
            throw new Error('Password must be the same')
          }
        }
        else {
          throw new Error('Authentification Fail!')
        }
        console.log(response.data)
        })
        .catch(error => {
          console.log(error)
          alert(error.message)
        })
      };

    return (
      <Container maxW='xl' centerContent>
      <form onSubmit={submitHandler} className={classes.form}>
        <h1>Change Password</h1>  
        <FormControl>
            <FormLabel htmlFor='password'>New Password</FormLabel>
            <Input id='password' type="password" placeholder="New password" ref={newPasswordInputRef} />
        </FormControl>
        <FormControl>
            <FormLabel htmlFor='confrim-password'>Confirm Password</FormLabel>
            <Input id='confirm-password' type="password" placeholder="Confirm password" ref={confirmPasswordRef} />
        </FormControl>
        <Button colorScheme='blue' type="submit" className={classes.btn}>
            Submit
        </Button>
      </form>
      </Container>
    )
}

export default UserProfile;
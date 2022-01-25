import { Form, Button } from "react-bootstrap";
import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {

    const newPasswordInputRef = useRef();
    const confirmPasswordRef = useRef()
    const history = useHistory()

    

    const authCtx = useContext(AuthContext)

    const submitHandler = (event) => {
        event.preventDefault();
    
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;
        
    
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
      <Form onSubmit={submitHandler}>
        <h1>Change Password</h1>  
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="New password" ref={newPasswordInputRef} minLength='6'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" ref={confirmPasswordRef} minLength='6'/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        
      </Form>
    )
}

export default UserProfile;
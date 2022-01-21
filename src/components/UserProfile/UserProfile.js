import { Form, Button } from "react-bootstrap";
import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from "react-router-dom";

const UserProfile = () => {

    const newPasswordInputRef = useRef();
    const confirmPasswordRef = useRef()
    const history = useHistory()

    

    const authCtx = useContext(AuthContext)

    const submitHandler = (event) => {
        event.preventDefault();
    
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;
        
        // add validation
    
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB89swc_F8hFkPq8xqnZVhKGmv0MrXMkP4', {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredNewPassword,
            returnSecureToken: false
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          // assumption: Always succeeds!
          if(res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data)
              let errorMessage = 'Authentification fail!'
              if (data && data.error && data.error.message) {
                 errorMessage = data.error.message;
              } 
              throw new Error(errorMessage);
            })
          }
        }).then((data) => {
            if(enteredNewPassword === enteredConfirmPassword) {
                history.replace('/')
            } else {
                throw new Error('Password must be the same')
            }
            console.log(data)
          })
          .catch((err) => {
            alert(err.message);
          });
      };

    return (
      <Form onSubmit={submitHandler}>
        <h1>Change Password</h1>  
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="New password" ref={newPasswordInputRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" ref={confirmPasswordRef}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        
      </Form>
    )
}

export default UserProfile;
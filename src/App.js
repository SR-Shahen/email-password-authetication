
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const auth = getAuth(app);


function App() {
  const [validated, setValidated] = useState(false);
  const [registird, setRegisterd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handelEmailAdd = event => {
    setEmail(event.target.value);

  }
  const handelPasswordAdd = event => {
    setPassword(event.target.value);

  }
  const handelChangeRegisterd = event => {
    setRegisterd(event.target.checked);
  }

  const handelSubmitFrom = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Please should contain at least one specialist character ')
      return;
    }

    setValidated(true);
    setError('');
    if (registird) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {

          setError(error.message)
        })

    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifyEmail();
        })
        .catch(error => {
          console.log(error)
          setError(error.message)
        })
    }
    const verifyEmail = () => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('verify email sent')
        })
    }


    event.preventDefault();
  }
  const handelResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('reset password email sent')
      })

  }

  return (


    <div className="registration w-50 mx-auto mt-4">
      <h1 className='text-primary '>Please {registird ? "Log In" : "Register"}!!</h1>
      <Form noValidate validated={validated} onSubmit={handelSubmitFrom}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handelEmailAdd} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handelPasswordAdd} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group onChange={handelChangeRegisterd} className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Already have an account" />
        </Form.Group>
        <h6 className='text-danger'>{error}</h6>
        <Button onClick={handelResetPassword} variant="link">Forget Password</Button> <br />
        <Button variant="primary" type="submit">
          {registird ? "Log In" : "Register"}
        </Button>
      </Form>



      {/* <form onSubmit={handelSubmitFrom}>
      //   <input onBlur={handelEmailAdd} type="email" /> <br />
      //   <input onBlur={handelPasswordAdd} type="password" /><br />
      //   <input type="submit" value="login" />
      // </form> */}
    </div>
  );
}

export default App;

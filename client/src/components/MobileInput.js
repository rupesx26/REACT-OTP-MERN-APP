import React, {useState, useEffect} from 'react';
import {Form, Container, Row, Col, Button } from 'react-bootstrap';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import firebase from '../firebase'
const MobileInput = (props) => {
    //initial state
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useHistory();

    //after submit mobile number
    const login = () => {
        console.log('No errors, login successfully');
    }

    //validate mobile number
    const validate = (values) => {
        let errors = {};
        if (!values.mobile) {
          errors.mobile = 'mobile is required';
        } else if(/^[6-9]\d{9}$/.test(values.mobile)){
            errors = {}
        } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
          errors.mobile = 'mobile is invalid';
        } 
        return errors;
    }

    //after mobile number submitting called
    useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
        login();        
    }
    }, [errors]);

    //set re-captcha from firebase
    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function (response) {
              console.log("Captcha Resolved");
             // this.onSignInSubmit();
            },
            defaultCountry: "IN",
          }
        );
      };

    //handle submit button
    const handleSubmit = (e) => {  
        console.log('handleSubmit', values)     
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
        setUpRecaptcha();
        let phoneNumber = '+91' + values.mobile;

        let appVerifier = window.recaptchaVerifier;
            firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // console.log(confirmationResult);
                console.log("OTP is sent");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //handle otp submit button
    const onSubmitOtp = (e) => {
        e.preventDefault();
        let otpInput = values.otp;
        let optConfirm = window.confirmationResult;
        
        optConfirm
          .confirm(otpInput)
          .then(function (result) {
            // User signed in successfully.
            history.push({  
             pathname: "/userdetails",
             state: { message: values.mobile },
             })
          })
          .catch(function (error) {
            console.log(error);
            alert("Incorrect OTP");
          });
      };

   //handle input on change value
    const handleChange = (e) => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
      };

    return (
        <div>
            <h3>Sign Up with mobile number</h3>
            <Container>
                <Row>
                <Col md={{ span: 6, offset: 3 }}>
                <form onSubmit={handleSubmit}>
                <div id="recaptcha-container"></div>
                    <div className="form-group"> 
                        <label>Enter mobile number: </label>
                        <input  type="text"
                        name = "mobile"
                        className="form-control"
                        value={values.text}
                        onChange={handleChange}
                        />
                    </div>
                    <Button variant="primary" type="submit">Submit</Button>
                    {errors.mobile && (
                    <p className="help is-danger">{errors.mobile}</p>
                  )}
                    </form>
                </Col>
                </Row>
                {
                    isSubmitting && <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={5}>
                      <h2 className="mb-3">Enter OTP</h2>
                      <Form className="form" onSubmit={onSubmitOtp}>
                        <Form.Group>
                          <Form.Control
                            id="otp"
                            type="number"
                            name="otp"
                            placeholder="OTP"
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit" >submit</Button>
                      </Form>
                    </Col>
                  </Row>
                }
                </Container>
        </div>
    )
}


export default MobileInput;
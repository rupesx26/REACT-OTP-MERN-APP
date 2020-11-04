import React, {useState, useEffect} from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const UserDetails = (props) => {
    //initial state
    const [values, setValues] = useState({});
    const [userStatus, setUserStatus] = useState(false)
    const [errors, setErrors] = useState({});
    const enteredNumber = props.location.state.message;

    //after form submit
    const formSubmit = () => {
        console.log('Data pushed to DB');
    }

    //validate input field
    const validate = (values) => {
        let errors = {};
        if (!values.mobile) {
            errors.mobile = 'mobile is required';
        } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
            errors.mobile = 'mobile is invalid';
        } 

        if (!values.email) {
            errors.email = 'Email address is required';
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
          }

        if(!values.name) {
            errors.name = 'name is required';
        }else if(!/[a-zA-Z]/.test(values.name)){
            errors.name = 'name is not valid'
        }

        return errors;
    }

    //for formsubmit called
    useEffect(() => {
    if (Object.keys(errors).length === 0 && userStatus) {
        formSubmit();
    }
    }, [errors]);

    //handle submit
    const handleSubmit = (e) => { 
        e.preventDefault();
        setErrors(validate(values));
        setUserStatus(true);

        const newUser = {
            user_name : values.name,
            user_email : values.email,
            user_mobile : values.mobile,
            user_status : userStatus
        }
        //POST request
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        };
        if(values.id) {
            fetch('http://localhost:5000/users/update/'+ values.id, requestOptions)
            .then(res => console.log(res.data))
        }  else {
            fetch('http://localhost:5000/users/add', requestOptions)
            .then(res => console.log(res.data))
        }
       //after submitting mange state
        setValues({})
    }

    //handle input change
    const onChangeInput = (e) => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    }

    //Check if mobile number already registared
    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('http://localhost:5000/users/'+enteredNumber)
        .then(res => res.json())
        .then(res => {
            console.log('res==>',res)
            setValues({
                id: res[0]._id || null,
                name : res[0].user_name,
                email : res[0].user_email,
                mobile : res[0].user_mobile
            })   
        })
        .catch(function (error) {
            console.log(error);
        })
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <div>
            <h3>Add your details</h3>
           
            <Container>
                <Row>
                <Col md={{ span: 6, offset: 3 }}>
               {values.id && 
                <p>Welcome you are registared user you can edit your details</p>
               }
                <Form onSubmit={handleSubmit}>

                <Form.Group controlId="formBasicEmail"> 
                <Form.Label>Name</Form.Label>
                    <Form.Control 
                        name="name"
                        type="text" 
                        placeholder="name"
                        value={values.name || ''}
                        onChange={onChangeInput}
                    />
                    {errors.name && (
                    <p className="help is-danger">{errors.name}</p>)}
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        name="email"
                        type="email" 
                        placeholder="Enter email"
                        value={values.email || ''}
                        onChange={onChangeInput}
                    />
                    {errors.email && (
                    <p className="help is-danger">{errors.email}</p>)}
                    <Form.Label>Mobile number</Form.Label>
                    <Form.Control 
                        name="mobile"
                        type="text" 
                        placeholder="Mobile"
                        value={values.mobile = enteredNumber || ''}
                        onChange={onChangeInput}
                    />
                    {errors.mobile && (
                    <p className="help is-danger">{errors.mobile}</p>)}

                    <Button type="submit">Submit form</Button>

                </Form.Group>
                        </Form>
                </Col>
                </Row>
                </Container>
        </div>
    )
}


export default UserDetails;
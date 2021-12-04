import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import UserContext from "../../context/user-context";

const initialState = {
    username: '',
    password: ''
}

const LoginForm = (props) => {


    const [inputs, setInputs] = useState(initialState);
    const context = useContext(UserContext);

    const navigate = useNavigate();

    const formUpdate = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const goRegister = (e) => {
        e?.stopPropagation();
        navigate('/register');
    }

    const formSubmit = (e) => {
        e.preventDefault();
        context.login(inputs);
    }

    return <Container>
        <Row>
            <h1>Login</h1>
        </Row>
        <Form onSubmit={formSubmit}>
            <Row>
                <Col xs={12}>
                    <FormGroup>
                        <Label>Username:</Label>
                        <Input type="text" name="username" value={inputs.username} onChange={formUpdate} required maxLength={50}/>
                    </FormGroup>
                </Col>
                <Col xs={12}>
                    <FormGroup>
                        <Label>Password:</Label>
                        <Input type="password" name="password" value={inputs.password} onChange={formUpdate} required minLength={6}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={3}>
                    <Button type="submit">Login</Button>
                </Col>
                <Col xs={6} md={3}>
                    <Button type="button" onClick={goRegister}>Registrarse</Button>
                </Col>
            </Row>
        </Form>
    
        </Container>;
}

// export  SESSION_USER;

export default LoginForm;

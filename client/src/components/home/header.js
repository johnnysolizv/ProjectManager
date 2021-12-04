import { useContext } from "react";
import { BiLogOutCircle } from 'react-icons/bi';
import { Col, Row } from "reactstrap";
import UserContext from "../../context/user-context";

const Header = (props) => {
    const context = useContext(UserContext);

    const logout = e => {
        context.logout();
    }

    return <Row>
        <Col xs={10}>
            <h2>{context.user?.name}</h2>
        </Col>
        <Col xs={2}>
            <BiLogOutCircle onClick={logout}/>
        </Col>
    </Row>
}

export default Header;
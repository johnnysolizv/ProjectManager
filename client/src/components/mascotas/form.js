import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Row, Form, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';

const initialState = {
    project: '',
    duedate: '',
    status: 'Backlog',
}

const ProjectForm = props => {

    const [inputs, setInputs] = useState(initialState);

    const navigate = useNavigate();
    const { id } = useParams();

    const actualizarValor = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value 
        });
    }

    const volver = e => {
        e.stopPropagation();
        navigate('../')
    }

    const guardar = e => {
        e.preventDefault();
        const data = {...inputs};
        data._id = id;
        props.accion(data);
    }

    useEffect(() => {
        if(id) {
            axios.get(`/api/project/${id}`)
            .then(resp => setInputs(resp.data.data))
            .catch(error => Swal.fire('Error', 'Error al obtener el proyecto, inténtelo mas tarde', 'error'));
        }
    }, [])

    return <Row>
        <h1>{props.edicion?'Editando el proyecto:' + inputs?.project: props.ver?'Visualizando el proyecto' + inputs?.project :'Creando una nuevo proyecto'}</h1>

        <Form onSubmit={guardar}>
            <Row>
                <Col xs={12}>
                    <FormGroup>
                        <Label>Project</Label>
                        <Input type="text" name="project" value={inputs.name} onChange={actualizarValor} required minLength={3} disabled={props.ver}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Due Date</Label>
                        <Input type="Date" name="duedate" value={inputs.raza} onChange={actualizarValor} required disabled={props.ver}/>
                    </FormGroup>                    
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                   {props.accion && <Button type="submit">Plan Project</Button>}
                </Col>
                <Col xs={3}>
                    <Button type="button" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Form>
    </Row>

}

export default ProjectForm;
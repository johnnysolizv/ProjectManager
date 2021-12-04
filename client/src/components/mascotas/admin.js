import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import Header from '../home/header';
import ProjectForm from './form';
import ProjectList from './list';

const ProjectAdmin = (props) => {

    const [list, setList] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        listarTodosLosProject(null);
    }, [actualizar]);

    const listarProjectUsuario = (e) =>{
        e.stopPropagation();
        axios.get('/api/project/user')
        .then(resp => setList(resp.data.data))
        .catch(error => 
            swal.fire('Error', error.message, 'error'));
    }

    const listarTodosLosProject = e => {
        e?.stopPropagation();
        axios.get('/api/project')
        .then(resp => setList(resp.data.data))
        .catch(error => 
            swal.fire('Error', error.message, 'error'));
    }

    const agregar = (data) => {
        axios.post('/api/project', data)
        .then(resp => {
            // Se agrega elemento creado al listado directamente evitando realizar una llamada al backend para recargar el listado
            setList([
                ...list,
                resp.data.data
            ]);
            navigate('./')
        }).catch(error => {
            console.log(error); // Revisar el mensaje de error
            Swal.fire('Error al crear el project', error?.message, 'error')
        });
    }

    const editar = (data) => {
        axios.put(`/api/project/${data._id}`, data)
            .then(resp => {
                setActualizar(!actualizar)
                navigate('./');
            })
            .catch(error => Swal.fire('Error al actualizar el project', error?.message, 'error'));
    }

    const update = (data) => {
        axios.put(`/api/project/${data._id}`, data)
            .then(resp => {
                setActualizar(!actualizar)
                navigate('./');
            })
            .catch(error => Swal.fire('Error al actualizar el project', error?.message, 'error'));
    }


    const eliminar = id => {
        if(id) {
            Swal.fire({
                title:'Eliminar el proyecto',
                text: '¿Esta seguro que desea eliminar el proyecto',
                icon:'question',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar!!!',
                cancelButtonText: 'No'
            }).then(resp => {
                if(resp.isConfirmed){
                    axios.delete(`/api/project/${id}`)
                    .then(resp => {
                        const lista = [...list];
                        lista.splice(lista.findIndex(e => e._id === id), 1);
                        setList(lista);
                    }).catch(error => Swal.fire('Error al eliminar el proyecto', error?.message, 'error'));
                }
            })
        }
    }

    return <Container>
            <Header />
            <Row>
                <Link to={"./"}> Listado </Link>
                <Link to={"add"}> Agregar </Link>

            </Row>
            <Routes>
                <Route index element={<ProjectList  list={list} update={update} eliminar={eliminar}/>}/>
                <Route path="add" element={<ProjectForm accion={agregar}  />}/>

            </Routes>
    </Container>;
}

export default ProjectAdmin;
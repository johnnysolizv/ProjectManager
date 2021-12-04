const Project = require('../models/project.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports.create = (req, res) => {
    const payload = jwt.decode(req.cookies.usertoken, secret);
    if(payload) {
        const project = req.body;
        project.userId = payload.id;
        Project.create(project)
            .then(data => {
                Project.findById(data._id).populate('user')
                    .then(user =>res.json({ ok: true, message: 'Se agregó el proyecto', data: user }))
                    .catch(error => {
                        if(error.name == 'ValidationError')
                            res.status(200).json({ ok: false, message: error.message, error: error });
                        else {
                            res.status(200).json({ok: false, message: 'Error al guardar el proyecto'});
                        }
                    });
            })
            .catch(error => {
                if(error.name == 'ValidationError')
                    res.status(200).json({ ok: false, message: error.message, error: error });
                else {
                    res.status(200).json({ok: false, message: 'Error al guardar el proyecto'});
                }
            });
    } else {
        res.status(200).json({ok: false, message: 'Error al guardar la proyecto'});
    }
}

module.exports.edit = (req, resp) => {
    const project = req.body;
    Project.findOneAndUpdate({_id: req.params.id }, project)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó el proyecto', data: project}))
        .catch(error => {
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{ 
                resp.status(500).json({ok: false, message: 'Error al guardar el proyecto'})    
            }
        });
}

module.exports.get = (req, res) => {
    Project.findById(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'project', data: data}))
        .catch(error => {
            console.log('GET', error);
            res.status(500).json({ok: false, message: 'Error al obtener el proyecto'})
        });
}

module.exports.list = (req, res) => {
    Project.find()
        .then(data => res.status(200).json({ ok: true, message: 'project', data: data}))
        .catch(error => {
            console.log('LIST', error);
            res.status(500).json({ok: false, message: 'Error al obtener el proyecto'})
        });
}


module.exports.listUserProject = (req, res) => {
    const payload = jwt.decode(req.cookies.usertoken, secret);
    if(payload) {
        Project.find({userId: payload.id}).populate('user')
            .then(data => res.status(200).json({ ok: true, message: 'Project', data: data}))
            .catch(error => {
                console.log('LIST', error);
                res.status(200).json({ok: false, message: 'Error al obtener los proyectos'})
            });
    } else {
        res.status(200).json({ok: false, message: 'Error al obtener los proyectos del usuario'})
    } 
}

module.exports.del = (req, res) => {
    Project.findByIdAndRemove(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'Se eliminó  el proyecto', data: data}))
        .catch(error => {
            console.log('DELETE', error);
            res.status(500).json({ok: false, message: 'Error al eliminar el proyecto'})
        });
}


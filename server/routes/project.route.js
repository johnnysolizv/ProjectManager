const ProjectController = require('../controllers/project.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/project', authenticate, ProjectController.list);
    app.get('/api/project/user', authenticate, ProjectController.listUserProject);
    app.get('/api/project/:id', authenticate, ProjectController.get);
    app.post('/api/project', authenticate, ProjectController.create);
    app.put('/api/project/:id', authenticate, ProjectController.edit);
    app.delete('/api/project/:id', authenticate, ProjectController.del);
}
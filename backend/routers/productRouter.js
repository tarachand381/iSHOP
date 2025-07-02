const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const fileUpload = require('express-fileupload');

productRouter.get('/:id', (req, res) => {
    new productController().get(req.params.id, req.query)
        .then(success => res.status(200).send(success))
        .catch(error => res.status(error.status === 0 ? 404 : 500).send(error));
});

productRouter.get('/', (req, res) => {
    new productController().get(null, req.query)
        .then(success => res.status(200).send(success))
        .catch(error => res.status(500).send(error));
});

productRouter.post('/create',
    fileUpload({ createParentPath: true }),
    (req, res) => {
        new productController().create(req.body, req.files?.thumbnail)
            .then(success => res.status(201).send(success))
            .catch(error => res.status(400).send(error));
    }
);

productRouter.patch('/status-update', (req, res) => {
    new productController().status(req.body.id, req.body.flag)
        .then(success => res.status(200).send(success))
        .catch(error => res.status(400).send(error));
});

productRouter.delete('/delete/:id', (req, res) => {
    new productController().delete(req.params.id)
        .then(success => res.status(200).send(success))
        .catch(error => res.status(400).send(error));
});

productRouter.put('/update/:id',
    fileUpload({ createParentPath: true }),
    (req, res) => {
        new productController().update(req.params.id, req.body, req.files?.thumbnail)
            .then(success => res.status(200).send(success))
            .catch(error => res.status(400).send(error));
    }
);

productRouter.post('/multiple-images/:id',
    fileUpload({ createParentPath: true }),
    (req, res) => {
        new productController().multipleImage(req.params.id, req.files?.images)
            .then(success => res.status(200).send(success))
            .catch(error => res.status(400).send(error));
    }
);

module.exports = productRouter;

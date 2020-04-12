const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
db.select('*')
    .from('posts')
    .then(dbData => {
        res.status(200).json({ data: dbData })
    })
    .catch(err => res.status(500).json({message: 'could not get data.'}));
});

router.get('/:id', (req, res) => {
    db('posts')
    .where({ id: req.params.id })
    .first()
    .then(dbData => {
        dbData
        ?res.status(200).json({ data: dbData })
        :res.status(404).json({ message: 'Could not find that post.'})
    })
    .catch(err => res.status(500).json({ message: 'could not get data.' }));
});

router.post('/', (req, res) => {
    db('posts')
    .insert(req.body, 'id')
        .then(ids => res.status(201).json( {results: ids} ))
        .catch(err => res.status(500).json({ message: 'could not post data.'}));
});

router.put('/:id', (req, res) => {
    db('posts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        count > 0
        ?res.status(200).json({ message: 'Post successfuly updated.' })
        :res.status(404).json({ message: 'could not find that post to delete. '})
    })
    .catch(err => res.status(500).json({ message: 'error trying to delete that post.' }));
});

router.delete('/:id', (req, res) => {
    db('posts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        count > 0
        ?res.status(200).json({ message: 'Post successfuly deleted.' })
        :res.status(404).json({ message: 'could not find that post to delete. '})
    })
    .catch(err => res.status(500).json({ message: 'error trying to delete that post.' }));
});

module.exports = router;
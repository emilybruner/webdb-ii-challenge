const express = require('express');
const knex = require('knex');

const knexConfiguration = {
  // client answers: which type (slite, postgres, mysql, oracle) of database
  client: 'sqlite3', // the db driver
  // the rest will depend on the type of database
  // could be a string or an object
  connection: {
    filename: './data/cars.db3'
  },
  useNullAsDefault: true, // ONLY needed for SQLite
}

// db represents a connection to the database


const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/cars.db3'
  },
  useNullAsDefault: true
});

const router = express.Router();

router.get('/', (req, res) => {
db
.select('*')
.from('cars')
.then(data => {
    res.status(200).json(data)
})
.catch(error => {
    console.log(error);
    res.status(500).json({errorMessage: 'Could not get car data'})
})
})

router.post('/', (req, res) => {
    const data = req.body;
    db('cars')
    .insert(data, 'id')
    .then(newId => {
        const id = newId[0];
        return db('cars')
        .select('VIN', 'make', 'model', 'mileage', 'transmission', 'title')
        .where({id})
        .first()
        .then(car => {
            res.status(201).json(car)
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: `Error updating car information`})
    })
})

router.delete('/:id', (req, res) => {

    db('cars')
    .where({ id: req.params.id})
    .del()
    .then(deleted => {
        res.status(200).json({message: `${deleted} deleted`})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "Error deleting"})
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const update = req.body;

    db('cars')
    .where({id})
    .update(update)
    .then(updated => {
        updated > 0 ? res.status(200).json({message: 'Update successful'}) 
        : res.status(404).jason({message: 'Update failed'});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage: "Error while updating"})
    })
})
module.exports = router;
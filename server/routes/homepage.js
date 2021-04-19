const express = require('express')
const connection = require('../config')

const router = express.Router()

router.get('/', (request, res) => {
  connection.query('SELECT * from slider', (err, results) => {
    if (err) {
      res.status(500).send(`Error retrieving data`)
    } else {
      res.status(200).json(results)
    }
  })
})

router.get('/:id', (req, res) => {
  const idUser = req.params.id
  connection.query(
    'SELECT * from slider WHERE id = ?',
    [idUser],
    (err, results) => {
      if (err) {
        res.status(500).send(`Error retrieving data`)
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.post('/', (req, res) => {
  connection.query('INSERT INTO slider SET ?', req.body, err => {
    if (err) {
      res.status(500).send('Error saving a profile')
    } else {
      res.status(200).send('Successfully saved')
    }
  })
})

router.put('/:id', (req, res) => {
  const idUser = req.params.id
  const newUser = req.body

  connection.query(
    'UPDATE slider SET ? WHERE id = ?',
    [newUser, idUser],
    err => {
      if (err) {
        res.status(500).send('Error updating a profile')
      } else {
        res.status(200).send('Profile updated successfully 🎉')
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  const idUser = req.params.id

  connection.query('DELETE FROM slider WHERE id = ?', [idUser], err => {
    if (err) {
      res.status(500).send('Error deleted a profile')
    } else {
      res.status(200).send('Profile deleted successfully 🎉')
    }
  })
})

module.exports = router

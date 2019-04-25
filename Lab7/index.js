const express = require('express')

require('./db/mongoose')
const Person = require('./models/person')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // parsea a json

app.post('/persons', function(req, res){
  const person = new Person(req.body);
  person.save().then(function() {
    return res.send(person)
  }).catch(function(error) {
    return res.status(400).send(error)
  })
})

app.get('/persons/:id', function(req, res) {
  const _id = req.params.id
  Person.findById(_id).then(function(person) {
    if(!person){
      return res.status(404).send()
    }
    return res.send(person)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.get('/persons', function(req, res) {
  Person.find({}).then(function(persons) {
    res.send(persons)
  }).catch(function(error){
    res.status(500).send(error)
  })
})

app.patch('/persons/:id', function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'father', 'mother']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  Person.findByIdAndUpdate(_id, req.body ).then(function(person) {
    if (!person) {
      return res.status(404).send()
    }
    return res.send(person)
  }).catch(function(error) {
    res.status(500).send(error)
  })
})

app.delete('/persons/:id', function(req, res) {
  const _id = req.params.id
  Person.findByIdAndDelete(_id).then(function(person){
    if(!person) {
      return res.status(404).send()
    }
    return res.send(person)
  }).catch(function(error) {
    res.status(505).send(error)
  })
})

app.listen(port, function() {
  console.log('Server up and running on port ' + port)
})
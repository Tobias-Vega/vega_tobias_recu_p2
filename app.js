const express = require('express')
const students = require('./db')

const app = express()

app.use(express.json())
app.use(express.text())

app.get('/students', (req,res) => {
    if(students.length === 0){
        return res.status(204).send()
    }

    res.json(students)

})

app.get('/students/:id', (req,res) => {

})

app.post('/students', (req,res) => {

})

app.put('/students', (req,res) => {

})

app.delete('/students', (req,res) => {

})



app.listen(4321, () => console.log('Servidor corriendo en el puerto 4321'))
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
    const id = parseInt(req.params.id)

    const getStudent = students.find((student) => student.id === id)

    if(!getStudent) {
        return res.status(204).send()
    }

    res.json(getStudent)
})

app.post('/students', (req,res) => {
    const newId = new Date().getTime()

    let { fullName, age, curse } = req.body

    fullName = fullName.trim()
    age = parseInt(age)
    curse = curse.trim()

    if(Number.isNaN(age)) {
        return res.status(400).send('El año debe ser un número')
    }

    if(age < 0 || age < 6) {
        return res.status(400).send('Ingrese un año válido para la edad de un estudiante')
    }

    if(!fullName || !age || !curse) {
        return res.status(400).send('Faltan completar datos')
    }

    const repeatName = students.find((student) => student.fullName === fullName)

    if(repeatName) {
        return res.status(401).send('Ya existe un estudiante con dicho nombre')
    }

    students.push({
        id: newId,
        fullName: fullName,
        age: age,
        curse: curse
    })

    res.send('Datos del estudiante creados existosamente')

})

app.put('/students/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const { fullName, age, curse } = req.body

    if(Number.isNaN(age)) {
        return res.status(400).send('El año debe ser un número')
    }

    if(age < 0 || age < 6 || age > 65) {
        return res.status(400).send('Ingrese un año válido para la edad de un estudiante')
    }

    const studentIndex = students.findIndex((student) => student.id === id)

    if(studentIndex === -1) {
        return res.status(204).send()
    }

    students[studentIndex].fullName = fullName.trim()
    students[studentIndex].age = parseInt(age)
    students[studentIndex].curse = curse.trim()

    res.send('Datos del estudiante actualizados')
})

app.delete('/students/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const studentIndex = students.findIndex((student) => student.id === id)

    if(studentIndex === -1) {
        return res.status(204).send()
    } else {
        students.splice(studentIndex, 1)
        res.send('Datos del estudiante eliminado')
    }
})

app.listen(4321, () => console.log('Servidor corriendo en el puerto 4321'))
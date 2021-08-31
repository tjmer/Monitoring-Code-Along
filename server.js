const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'bf1d4ede430d4e13b8b742c64b9f0dcd',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const students =[]
const app = express()
const port = process.env.PORT || 4545


app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req,res)=> {
    const{name}=req.body
    name = name.trim()
    
    students.push(name)
    
    rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
    
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

app.listen(port, ()=> console.log(`up on ${port}`))
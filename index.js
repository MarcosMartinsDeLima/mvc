const express = require('express')
const hbs = require('express-handlebars')
const handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const Task = require('./models/Task')

const app = express()

const conne = require('./db/conne')

const tasksRoutes = require('./routes/taskRoutes')

app.engine('handlebars',hbs.engine({handlebars:allowInsecurePrototypeAccess(handlebars)}))
app.set('view engine','handlebars')

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

app.use(express.static('public'))

app.use('/tasks',tasksRoutes)

conne.sync().then(()=>{
    app.listen(3000)
}
)
.catch(function(error){
    console.error(error)
})
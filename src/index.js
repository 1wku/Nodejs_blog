const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')

const route = require('./routes')
const db = require('./config/db')

//contect to DB

db.connect()
app.use(express.static(path.join(__dirname, 'public')))
    //HTTP logger
app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    //method override
app.use(methodOverride('_method'))

//Templates engine [handlebar]
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => {
                return a + b
            },
            dateFormat: (a) => {
                return a.toString().split('').splice(8, 15).join('')
            }
        }
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

//route init
route(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 5600
const urlencodedParser = bodyParser.urlencoded({ extended: false})
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'ejs');
app.set('views',viewsPath);


//Including routers 

const ageGroupRoute = require('./routers/ageGroup.js')

app.get('/', (req, res)=>{
	res.render('home')
})
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json())
app.use(ageGroupRoute)

app.listen(port, ()=>{
	console.log("Server is on port " + port)
})
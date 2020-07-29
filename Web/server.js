const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/styles",express.static(__dirname + "/styles"));
app.use(express.static("public"));


var connectionString = 'mongodb+srv://ggallant:333central@nonprofitsforrefugees.zg2mj.azure.mongodb.net/UNHCR?retryWrites=true&w=majority'
app.listen(3000, function() {
    console.log('listening on 3000')
})

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
      var category = null
      var state = null
    console.log('Connected to Database')
    const db = client.db('UNHCR')
   
    app.get('/', (req, res) => {
        const collection = db.collection('CharityNavigator')
        collection.find().toArray()
        .then(results => {
            res.render('index.ejs', {nonprofit : results})
        })
    })

})
.catch(error => console.error(error))
var express = require("express"),
    app = express(),
    axios = require("axios"),
    bodyParser = require("body-parser")

app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
    res.redirect('/global');
})

app.get('/global', function(req, res) {
    axios.get('https://api.covid19api.com/summary')
        .then(function(response) {
            res.render('global', { data: response.data });
        })
        .catch(function(err) {
            if (err)
                console.log(err);
        });
});

app.get('/global/:country', function(req, res) {

    var c = req.params.country.charAt(0).toUpperCase() + req.params.country.slice(1);
    axios.get('https://api.covid19api.com/summary')
        .then(function(response) {
            res.render('result', { data: response.data, c: c });
        })
        .catch(function(err) {
            if (err)
                console.log(err);
        });
})

app.post('/global', function(req, res) {
    res.redirect('/global/' + req.body.country);
})
const PORT = process.env.PORT || 3000;
app.listen(PORT);
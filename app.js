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
    axios.get('https://api.covid19api.com/dayone/country/' + req.params.country)
        .then(function(response) {
            res.render('result', { data: response.data });
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
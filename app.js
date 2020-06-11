var express = require("express");
app = express();
axios = require("axios");
app.set("view engine", 'ejs');
app.use(express.static("public"));

app.get('/', function(req, res) {
    axios.get('https://api.covid19api.com/summary')
        .then(function(response) {
            res.render('index', { data: response.data });
        })
        .catch(function(err) {
            if (err)
                console.log(err);
        });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT);
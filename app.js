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
                res.render('err');
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
                res.render('err');
        });
})


app.get('/india', function(req, res) {
    axios.get('https://api.covid19india.org/data.json')
        .then(function(response) {
            res.render('india', { data: response.data.statewise });
        })
        .catch(function(err) {
            if (err)
                res.render('err');
        });
})

app.get('/india/:state', function(req, res) {
    // axios.get('https://api.covid19india.org/data.json')
    //     .then(function(response) {
    //         res.render('state', { data: response.data.statewise, st: req.params.state });
    //     })
    //     .catch(function(err) {
    //         if (err)
    //             res.render('err');
    st = req.params.state;
    st = st.slice(0, st.length - 1);
    // console.log(st.length);
    var state = axios({ url: 'https://api.covid19india.org/data.json' })
    var table = axios({ url: 'https://api.covid19india.org/state_district_wise.json' })
    axios.all([state, table]).then(function(response) {

            var userData = response[0].data;
            var tableData = response[1].data;
            res.render('state', { data: userData.statewise, tableData: tableData[st].districtData, st: st });

        })
        .catch(function(error) {
            if (error)
                res.render('err');
        });


});

app.post('/global', function(req, res) {
    res.redirect('/global/' + req.body.country);
})

app.get("/state", function(req, res) {
    res.redirect("/india/" + req.query.state);
})
const PORT = process.env.PORT || 3000;
app.listen(PORT);
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient;
var db;


mongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    db = client.db('test');
});

app.use(cors());


app.get("/add", async (req, res) => {

    const api_url = `https://raw.githubusercontent.com/attainu-falcon/falcon-course-module/master/coding-challenges/data/cities.json`
    try {
        const result = await fetch(api_url).then(res => res.json());
        // const json = await result
        // console.log(result);

        let states = [];
        let statesObj = {};
        for (let i = 0; i < result.length; i++) {

            if (!statesObj[result[i].state]) {
                states.push({ state: result[i].state, cities: [] })
                statesObj[result[i].state] = true;
            }

        }

        for (let j = 0; j < states.length; j++) {
            for (let i = 0; i < result.length; i++) {
                if (states[j].state === result[i].state) {
                    states[j].cities.push(result[i].name)
                }
            }
        }

        db.collection('states').insertMany(states, (err, result) => {
            if (err) throw err;
            return res.send("inserted" + result);
        })
    } catch (error) {
        console.log(error)
    }

})

app.get("/state/:name", (req, res) => {
    db.collection('states').find({ 'state': req.params.name }).toArray((err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

app.get("/state/:state_name/add/:city_name", (req, res) => {
    db.collection('states').update({
        state: req.params.state_name
    }, {
        $push: {
            cities: req.params.city_name
        }
    }, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.json(result);

    }

    )
})


app.get("/state/:state_name/remove/:city_name", (req, res) => {
    db.collection('states').update({
        state: req.params.state_name
    }, {
        $pull: {
            cities: req.params.city_name
        }
    }, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.json(result);

    }

    )
})


app.listen(8000, () => {
    console.log("server running at port number 8000...")
});
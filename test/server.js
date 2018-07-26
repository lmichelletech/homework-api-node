var express = require('express');
var app = express();
var port = 8500;
var host = '127.0.0.1';

app.use(express.static('test'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

var breeds = [{
    'id': 1,
    'breedtype': 'Akita',
    'origin': 'Japan',
    'image': 'http://cdn2-www.dogtime.com/assets/uploads/2011/01/file_22906_akita-460x290.jpg',
    'size': 'Large'
},{
    'id': 2,
    'breedtype': 'Chihuahua',
    'origin': 'Mexico',
    'image': 'https://www.gettyimages.com/detail/photo/chihuahua-sniffing-food-studio-grey-high-res-stock-photography/164287802',
    'size': 'Small'
}];

var id = 2;

app.get('/breeds', (req, res) => {
    res.json(breeds);
});

app.get('/breeds/:id', (req, res) => {
    var breed = breeds.find(breed => {
        return breed.id == req.params.id
    });

    res.json(breed || {});
});

// must cast id to convert to string
app.post('/breeds', (req, res) => {
    var breed = req.body;
    id++;
    console.log('id ' + id);
    breed.id = id + '';
    breeds.push(breed);
    res.json(breed);
});

app.put('/breeds/:id', (req, res) => {
    var update = req.body;
    if(update.id){
        delete update.id;
    }

    var breed = breeds.findIndex(breed => breed.id == req.params.id);
    if(!breeds[breed]){
        res.send();
    }
    else{
        var updateBreed = Object.assign(breeds[breed], update);
        res.json(updateBreed);
    }
})

app.delete('/breeds/:id', (req, res) => {
    var breed = breeds.findIndex(breed => breed.id == req.params.id);
    if(!breeds[breed]){
        res.send();
    }else{
        var deleteBreed = breeds[breed];
        breeds.splice(breed, 1);
        res.json(deleteBreed);
    }
})

app.listen(port, host, function(){
    
        console.log('Listening on http://localhost:', port);
    
})
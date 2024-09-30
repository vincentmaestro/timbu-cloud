const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors({ origin: '*' }));
app.listen(port, () => console.log(`app started on port ${port}`));

const wears = [
    {
        id: 'shrpfg',
        name: 'SHEIN: Roupas Feminas',
        design: 'Fashion gown',
        image: 'img/40.png',
        price: '39.99'
    },
    {
        id: 'sflsg',
        name: 'SAFEIRODO: Long sleeve',
        design: 'Fashion gown',
        image: 'img/60.png',
        price: '59.99'
    },
    {
        id: 'fdlsfh',
        name: 'FISDY: Stylish long sleeve',
        design: 'Flounced hem gown',
        image: 'img/70.png',
        price: '70.00'
    },
    {
        id: 'sefscg',
        name: 'Sweet Elegance Solid Fold Square Collar',
        design: 'A line gown',
        image: 'img/100.png',
        price: '99.99'
    },
    {
        id: 'slntwlsd',
        name: 'Surplice Neck Tie Waist',
        design: 'Long Sleeve Dress',
        image: 'img/85.png',
        price: '85.00'
    },
    {
        id: 'rvnbmd',
        name: 'Rushed V Neck',
        design: 'Bodycon Mini Dress',
        image: 'img/101.png',
        price: '99.99'
    },
    {
        id: 'shrfbg',
        name: 'SHEIN: Ruffled Floral Bodycon gown',
        design: 'Bodycon gown',
        image: 'img/61.png',
        price: '59.99'
    },
    {
        id: 'fdcvnwg',
        name: 'FISDY: Classic',
        design: 'V Neck wrapped gown',
        image: 'img/90.png',
        price: '89.99'
    },
    {
        id: 'sflslg',
        name: 'SAFEIRODO: Long sleeve',
        design: 'Loose gown',
        image: 'img/75.png',
        price: '75.00'
    }
];

let cart = {
    items: [],
    subTotal: 0
};

app.get('/', (req,res) => {
    res.send('Timbu cloud says Hello!');
});

app.get('/api/wears', (req, res) => {
    res.send(wears);
});

app.get('/api/wears/:id', (req, res) => {
    try {
        const wear = wears.find(wearId => wearId.id == req.params.id);
        if(!wear) throw Error('the requested item could not be found');
        res.send(wear);
    }
    catch(ex) {
        res.status(404).send(ex.message);
    }
});

app.get('/api/cart', (req, res) => {
    res.send(cart);
});

app.post('/api/cart', (req, res) => {
    const item = req.body;
    cart.items.push(item);

    const { unitPrice, quantity } = cart.items[cart.items.length - 1];
    cart.subTotal += Number(unitPrice) * Number(quantity);
    res.send(cart);
});

app.put('/api/cart', () => {
    cart = {
        items: [],
        subTotal: 0
    };
});

app.delete('/api/cart/:item', (req, res) => {
    const arr = cart.items.splice(req.params.item, 1);
    const { unitPrice, quantity } = arr[0];
    cart.subTotal -= Number(unitPrice) * Number(quantity);
});
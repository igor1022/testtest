import express from 'express';
import {createNewLot, DeleteElem, findAllState, findCount, findLot, getPartBd, UpdatePriceLot } from './db/lots.js';
import cors from 'cors';
const server = express();
const PORT = 4500;
server.use(cors());
import bodyParser from "body-parser";

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

let obj = {};

server.get('/get_length_bd', async(req, res) => {
    const result = await findCount();
    res.send(result);
});

server.post('/get_length_bd_part', async(req, res) => {
    const {selected} = req.body;
    const result = await getPartBd(selected);
    res.send(result);
});

server.get('/get_all_state', async(req, res) => {
    const result = await findAllState();
    res.send(result);
})

server.post('/change_price', async(req, res) => {
    const {id, new_price} = req.body;
    await UpdatePriceLot(id, new_price);
    res.send('price is updated');
});

server.post('/add_card', async(req, res) => {
    const result = await createNewLot(req.body.data);
    res.send(result);
});

server.get('/get_save_card', async(req, res) => {
    console.log(obj);
    res.send(obj);
})


server.post('/save_card', async(req, res) => {
    obj = req.body;
    //console.log(req.body);
    res.send('ok');
});

server.get('/get_bd/:id', async(req, res) => {
    const id = req.params.id;
    const result = await findLot(id);
    res.send(result);
});

server.get('/delete_card/:id', async(req, res) => {
    const id = req.params.id;
    const result = await DeleteElem(id);
    res.send('ok');
});

server.get('/delay/', async(req, res) => {
    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

    sleep(3000).then(() => {
      res.send('ok');
    });
})

server.listen(PORT, () => {});
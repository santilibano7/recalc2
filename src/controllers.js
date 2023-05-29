import express from 'express';
import core from './core.js';

import { createHistoryEntry, History, deleteHistory, getFullHistory} from './models.js'
import { buscarPorID } from './models.js'

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
    } else {
        const result = core.sub(a, b);

        await createHistoryEntry({ firstArg: a, operationName: "ADD" })
        return res.send({ result });
    }
});


router.get("/add/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
    } else {
        const result = core.add(a, b);
        return res.send({ result });
    }
});

router.get("/mul/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
    } else {
        const result = core.mul(a, b);
        return res.send({ result });
    }
});

router.get("/div/:a/:b", async function(req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
    } else if (b === 0) {
        res.status(400).send('El parámetro b no puede ser cero');
    } else {
        const result = core.div(a,b);
        return res.send({result});
    }
});

router.get("/pow/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if (isNaN(a)) {
        res.status(400).send('El parámetro no es un número');
    } else {
        const result = core.pow(a);
        return res.send({ result });
    }
});

router.get("/history", async function (req, res) {
    await deleteHistory();
    return res.send({ message: "history is deleted"});
});

router.get("/history", async function (req, res) {
    const history = await getFullHistory();
    return res.send({history});
});

//Hacer un endpoint para obtener una entrada del historial por id, con el test correspondiente
router.get("/history/:id", async function (req, res) {
  const historyId = req.params.id;

  try {
    const history = await buscarPorID(historyId);

    return res.send({ history });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

export default router;


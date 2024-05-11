const express = require('express');
const app = express();
const { insertar, consultar, editar, eliminar } = require('./crud')


app.listen(4000, console.log("Servidor en puerto 4000"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/cancion", async (req, res) => {
    try {
        console.log(req.body, req.query)
        const datos = Object.values(req.body);
        console.log(datos)
        const respuesta = await insertar(datos)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Hubo un error :c")
    }
})

app.get("/canciones", async (req, res) => {
    try {
        const registros = await consultar();
        res.json(registros)
    } catch (error) {
        res.status(500).send("Hubo un error :c")

    }
})

app.put("/canciones", async (req, res) => {
    try {
        const datos = Object.values(req.body);
        const respuesta = await editar(datos);
        res.json(respuesta);

    } catch (error) {
        res.status(500).send("Hubo un error :c")
    }
})

app.delete("/canciones", async (req, res) => {
    try {
        const { id } = req.query
        const respuesta = await eliminar(id);
        res.json(respuesta);
    } catch (error) {
        res.status(500).send("Hubo un error :c")
    }
})
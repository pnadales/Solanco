const express = require('express');
const app = express();
const { insertarUsuario, consultarUsuario, editar, eliminar, insertarTrans, consultaTrans } = require('./crud')


app.listen(3000, console.log("Servidor en puerto 3000"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/usuario", async (req, res) => {
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

app.get("/usuarios", async (req, res) => {
    try {
        const registros = await consultar();
        res.json(registros)
    } catch (error) {
        res.status(500).send("Hubo un error :c")

    }
})

app.put("/usuario", async (req, res) => {
    try {
        const datos = Object.values(req.body);
        const respuesta = await editar(datos);
        res.json(respuesta);

    } catch (error) {
        res.status(500).send("Hubo un error :c")
    }
})

app.delete("/usuario", async (req, res) => {
    try {
        const { id } = req.query
        const respuesta = await eliminar(id);
        res.json(respuesta);
    } catch (error) {
        res.status(500).send("Hubo un error :c")
    }
})

app.post("/transferencia", async (req, res) => {
    try {

    } catch (error) {

    }
})


app.get("/transferencias", async (req, res) => {
    try {

    } catch (error) {

    }
})
const { Pool } = require("pg");
const { text } = require("stream/consumers");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "paulo",
    port: 5432,
    database: "repertorio"
})

const insertar = async (datos) => {

    const consulta = {
        text: "INSERT INTO canciones VALUES ($1, $2, $3) RETURNING *",
        values: datos
    };
    const result = await pool.query(consulta);
    return result
};

const consultar = async () => {
    const result = await pool.query("SELECT * FROM canciones");
    return result;
}

const editar = async (datos) => {
    const consulta = {
        text: "UPDATE canciones SET id=$1, titulo=$2, artista=$3, tono=$4  WHERE id=$1 RETURNING *",
        vaules: datos
    }
    const result = await pool.query(consulta);
    return consulta;
}

const eliminar = async (id) => {
    const result = await pool.query("DELETE FROM canciones WHERE id=$1 RETURNING *", [id]);

}

module.exports = { insertar, consultar, editar, eliminar };
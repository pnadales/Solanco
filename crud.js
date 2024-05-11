const { Pool } = require("pg");
const { text } = require("stream/consumers");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "paulo",
    port: 5432,
    database: "bancosolar"
})

const insertarUsuario = async (datos) => {

    const consulta = {
        text: "INSERT INTO usuarios VALUES ($1, $2) RETURNING *",
        values: datos
    };
    const result = await pool.query(consulta);
    return result
};

const consultarUsuario = async () => {
    const result = await pool.query("SELECT * FROM usuarios");
    return result;
}

const editar = async (datos) => {
    const consulta = {
        text: "UPDATE usuarios SET nombre=$2, balance=$3 WHERE id=$1 RETURNING *",
        vaules: datos
    }
    const result = await pool.query(consulta);
    return result;
}

const eliminar = async (id) => {
    const result = await pool.query("DELETE FROM usuarios WHERE id=$1 RETURNING *", [id]);

}

const insertarTrans = async (datos) => {
    const consulta = {
        text: "INSERT INTO transferencias VALUES ($1, $2, $3, NOW()) RETURNING *",
        values: datos
    }
    const result = await pool.query(consulta)
    return result
}

const consultaTrans = async (datos) => {
    console.log('Funcion en desarrollo');
}


module.exports = { insertarUsuario, consultarUsuario, editar, eliminar, insertarTrans, consultaTrans };
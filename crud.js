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
        text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
        values: datos
    };
    const result = await pool.query(consulta);
    return result
};

const consultarUsuario = async () => {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
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
        text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *",
        values: datos
    }
    const result = await pool.query(consulta)
    return result
}

const consultaTrans = async (datos) => {
    // const result = await pool.query("SELECT * FROM transferencias");
    const consulta = {
        text: "SELECT t.fecha, u.nombre AS emisor, r.nombre, t.monto FROM transferencias t INNER JOIN usuarios u ON u.id = t.emisor INNER JOIN usuarios r ON r.id = t.receptor",
        rowMode: 'array'
    }
    const result = await pool.query(consulta)
    // const result = await pool.query("SELECT t.fecha, u.nombre AS emisor, r.nombre, t.monto FROM transferencias t INNER JOIN usuarios u ON u.id = t.emisor INNER JOIN usuarios r ON r.id = t.receptor;");
    // console.log(result)
    return result.rows;
}


module.exports = { insertarUsuario, consultarUsuario, editar, eliminar, insertarTrans, consultaTrans };
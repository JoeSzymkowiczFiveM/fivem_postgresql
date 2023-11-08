const postesql = require('pg');

let client = null;

const host = GetConvar('postgresql_host', '').replace(/'/g, "");
const port = GetConvar('postgresql_port', '').replace(/'/g, "");
const username = GetConvar('postgresql_username', '').replace(/'/g, "");
const password = GetConvar('postgresql_password', '').replace(/'/g, "");
const database = GetConvar('postgresql_database', '').replace(/'/g, "");
const schema = GetConvar('postgresql_schema', '').replace(/'/g, "");

if (host != '') {
    connectToDatabase();
} else {
    if (host == '') console.log(`[PocketBase][ERROR] Convar "postgresql_url" not set (see README)`);
    if (port == '') console.log(`[PocketBase][ERROR] Convar "postgresql_port" not set (see README)`);
    if (username == '') console.log(`[PocketBase][ERROR] Convar "postgresql_username" not set (see README)`);
    if (password == '') console.log(`[PocketBase][ERROR] Convar "postgresql_password" not set (see README)`);
    if (database == '') console.log(`[PocketBase][ERROR] Convar "postgresql_database" not set (see README)`);
    if (schema == '') console.log(`[PocketBase][ERROR] Convar "postgresql_schema" not set (see README)`);
}

async function connectToDatabase() {   
    try {
        var conString = "postgres://"+username+":"+password+"@"+host+":"+port+"/"+database+"?schema="+schema;
        client = new postesql.Client(conString);
        client.connect();
        client.query(`SET search_path TO ${schema}, public`);
        console.log(`[PostgreSQL] Connected to PostgreSQL.`);

    } catch(err) {
        setTimeout(function() {
            console.log(`[PostgreSQL][ERROR] Failed to connect to ${url}. Retrying connection.`);
            connectToDatabase();
            return;
        }, 5000);
    }
}

function checkDatabaseReady() {
    if (client) {
        return true;
    } else {
        console.log(`[PostgreSQL][ERROR] PostgreSQL is not connected.`);
        return false;
    }
}

async function dbQuery(params) {
    if (!checkDatabaseReady()) return;
    if (!params.query) console.log(`[PostgreSQL][ERROR] exports.query: Does not contain query text.`);
    const query = params.query
    const values = params.values;
    try {
        const result = await client.query(query, values);
        return result.rows;
    } catch(err) {
        console.log(`[PostgreSQL][ERROR] exports.query: Error "${err.message}".`);
        return [{}];
    }
}

async function dbInsert(params) {
    if (!checkDatabaseReady()) return;
    if (!params.query) console.log(`[PostgreSQL][ERROR] exports.insert: Does not contain query text.`);
    let query = params.query
    if (query.slice(0, query.indexOf(' ')) !== 'INSERT') {
        console.log(`[PostgreSQL][ERROR] exports.insert: This is not correct INSERT syntax.`);
        return [{}];
    }
    if (params.returning) {
        if (params.returning.length > 1) {
            const returning = params.returning.join(", ")
            query = query + ' RETURNING ' + returning
        } else {
            query = query + ' RETURNING ' + params.returning[0]
        }
    } else {
        query = query + ' RETURNING *'
    }
    const values = params.values;
    try {
        const result = await client.query(query, values);
        return result.rows;
    } catch(err) {
        console.log(`[PostgreSQL][ERROR] exports.insert: Error "${err.message}".`);
        return [{}];
    }
}

async function dbDelete(params) {
    if (!checkDatabaseReady()) return;
    if (!params.query) console.log(`[PostgreSQL][ERROR] exports.delete: Does not contain query text.`);
    let query = params.query
    if (query.slice(0, query.indexOf(' ')) !== 'DELETE') {
        console.log(`[PostgreSQL][ERROR] exports.delete: This is not correct DELETE syntax.`);
        return [{}];
    }
    if (params.returning) {
        if (params.returning.length > 1) {
            const returning = params.returning.join(", ")
            query = query + ' RETURNING ' + returning
        } else {
            query = query + ' RETURNING ' + params.returning[0]
        }
    } else {
        query = query + ' RETURNING *'
    }
    try {
        const result = await client.query(query);
        return result.rows;
    } catch(err) {
        console.log(`[PostgreSQL][ERROR] exports.query: Error "${err.message}".`);
        return [{}];
    }
}

async function dbUpdate(params) {
    if (!checkDatabaseReady()) return;
    if (!params.query) console.log(`[PostgreSQL][ERROR] exports.update: Does not contain query text.`);
    let query = params.query
    if (query.slice(0, query.indexOf(' ')) !== 'UPDATE') {
        console.log(`[PostgreSQL][ERROR] exports.update: This is not correct UPDATE syntax.`);
        return [{}];
    }
    if (params.returning) {
        if (params.returning.length > 1) {
            const returning = params.returning.join(", ")
            query = query + ' RETURNING ' + returning
        } else {
            query = query + ' RETURNING ' + params.returning[0]
        }
    } else {
        query = query + ' RETURNING *'
    }
    try {
        const result = await client.query(query);
        return result.rows;
    } catch(err) {
        console.log(`[PostgreSQL][ERROR] exports.query: Error "${err.message}".`);
        return [{}];
    }
}

/* Exports definitions */
exports("isConnected", () => !!client);
exports("query", dbQuery);
exports("insert", dbInsert);
exports("delete", dbDelete);
exports("update", dbUpdate);
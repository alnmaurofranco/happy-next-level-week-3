import { createConnection } from 'typeorm';

createConnection().then(async _connection => {
    console.log('Banco de dados iniciado')
}).catch(err => console.log(err));
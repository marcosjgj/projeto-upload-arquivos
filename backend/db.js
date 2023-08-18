const mssql = require('mssql');

const config = {
  user: 'usrsco',
  password: 'D411a16d25',
  server: '10.206.65.5',
  port: 61654,
  database: 'Protocolo'
};

const pool = new mssql.ConnectionPool(config);
pool.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados');
  }
});

module.exports = pool;

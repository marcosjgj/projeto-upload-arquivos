const express = require('express');
const multer = require('multer');
const mssql = require('mssql');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
    
    // TODO: Adicione aqui o código para ler o arquivo .xlsx, interpretar os dados e salvar na tabela do SQL Server
    const xlsx = require('xlsx');
    const pool = require('./db');

    app.post('/upload', upload.single('file'), (req, res) => {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // TODO: Adicione aqui o código para salvar os dados na tabela do SQL Server
    const insertData = async (data) => {
        try {
          await pool.request().query('INSERT INTO NomeDaTabela (Coluna1, Coluna2) VALUES (@valor1, @valor2)', {
            valor1: data.valor1,
            valor2: data.valor2
          });
        } catch (err) {
          console.error('Erro ao inserir dados na tabela:', err);
        }
      }
      
      app.post('/upload', upload.single('file'), async (req, res) => {
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
      
        for (const row of data) {
          await insertData(row);
        }
      
        res.send('Arquivo enviado com sucesso!');
      });
      

    res.send('Arquivo enviado com sucesso!');
    });

});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

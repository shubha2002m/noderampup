const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


//1. File Upload Endpoint
app.post('/upload', (req,res) =>{
    const filename = req.headers['file-name'];
    if(!filename){
        return res.status(400).send('Missing "file-name" header');
    }

    const filePath = path.join(__dirname, 'uploads', filename);
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', ()=>{
        res.send('File uploaded successfully');
    });

    writeStream.on('error', () =>{
        console.error('Write Error:', err);
        res.status(500).send('Server error during upload');
    } );
})


app.get('/download/:filename', (req,res) =>{
    const filename  = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    if(!fs.existsSync(filePath)){
        return res.status(404).send('File not found')
    }

    const readStream = fs.createReadStream(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    readStream.pipe(res);

    readStream.on('error', (err) =>{
        console.error('Read Error:', err);
        res.status(500).send('Server error during download');
  });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
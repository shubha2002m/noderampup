require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { Readable } = require('stream');

const app = express();
const port = 3000;

// Enable CORS for browser-based testing
app.use(cors());

// AWS S3 client setup
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Upload endpoint
app.post('/upload', async (req, res) => {
  const filename = req.headers['x-filename'];

  if (!filename) {
    return res.status(400).json({ error: 'Missing "x-filename" header' });
  }

  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        Body: Readable.from(req), // Stream from incoming request
        ContentType: req.headers['content-type'],
      },
    });

    upload.on('httpUploadProgress', (progress) => {
      console.log(`Uploaded ${progress.loaded} bytes...`);
    });

    await upload.done();
    res.status(200).json({ message: 'Upload successful' });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

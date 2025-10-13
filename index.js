import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { convertToMarkdown } from 'filetomarkdown';
import cors from 'cors';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS for all origins
app.use(cors());

app.post('/api/convert', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Save file to /tmp directory
    const tempFilePath = path.join('/tmp', req.file.originalname);
    await fs.writeFile(tempFilePath, req.file.buffer);

    // Convert to markdown using file path string
    const markdown = await convertToMarkdown(tempFilePath);
    res.json({ markdown });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('FileToMarkdown API is running ✅');
});

const port = process.env.PORT || 3010;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

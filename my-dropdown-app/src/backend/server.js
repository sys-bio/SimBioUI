const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const DIRECTORY_PATH = '/Users/ttran28/Desktop/SimBioUI/my-dropdown-app/src/components/main/examples-popup/examples-models';

// Helper function to get files recursively
const getFilesRecursively = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFilesRecursively(filePath, fileList);
        } else {
            fileList.push(path.relative(DIRECTORY_PATH, filePath));
        }
    });
    return fileList;
};

app.get('/files', (req, res) => {
    try {
        const files = getFilesRecursively(DIRECTORY_PATH);
        const fileNames = files.map(file => {
            const nameWithoutExtension = path.parse(file).name;  // Extract file name without extension
            const formatted = nameWithoutExtension
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase())
                .replace(/\//g, ' / ');
            return {
                original: file,
                formatted
            };
        });
        res.json(fileNames);
    } catch (err) {
        console.error('Unable to read directory:', err);
        res.status(500).json({ error: 'Unable to read directory' });
    }
});

app.get('/file-content', (req, res) => {
    const fileName = req.query.name;
    if (!fileName) {
        return res.status(400).json({ error: 'File name is required' });
    }
    const filePath = path.join(DIRECTORY_PATH, fileName);
    console.log('Reading file:', filePath);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Unable to read file:', err);
            return res.status(500).json({ error: 'Unable to read file' });
        }
        res.json({ content: data });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
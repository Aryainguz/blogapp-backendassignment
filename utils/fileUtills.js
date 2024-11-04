import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
    const fullPath = path.resolve(filePath);
    try {
        const data = fs.readFileSync(fullPath, 'utf8');
        // Check if file is empty and return an empty array or object
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error reading file at ${fullPath}:`, error);
        return []; // Return an empty array on error
    }
};

const writeFile = (filePath, data) => {
    const fullPath = path.resolve(filePath);
    try {
        fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing file at ${fullPath}:`, error);
    }
};

export { readFile, writeFile };

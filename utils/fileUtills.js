import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
  const fullPath = path.resolve(filePath);
  const data = fs.readFileSync(fullPath, 'utf8');
  
  // Check if file is empty and return an empty array or object
  return data ? JSON.parse(data) : [];
};

const writeFile = (filePath, data) => {
  const fullPath = path.resolve(filePath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
};

export { readFile, writeFile };

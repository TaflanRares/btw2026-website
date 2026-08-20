/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(process.cwd(), 'build', '.nojekyll');

fs.writeFileSync(filePath, '');
console.log('Created', filePath);

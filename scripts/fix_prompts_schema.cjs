const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/prompts.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.prompts.forEach(prompt => {
  if (!('tags' in prompt)) prompt.tags = [];
  if (!('votes' in prompt)) prompt.votes = 0;
  if (!('author' in prompt)) prompt.author = "unknown";
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('Schema fields back-filled for all prompts.');
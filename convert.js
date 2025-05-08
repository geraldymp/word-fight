const fs = require('fs');

// function to change .txt to .json
const inputPath = './assets/words_alpha.txt';
const outputPath = './assets/words_alpha.json';

const txtToJson = () => {
  if (!fs.existsSync(inputPath)) {
    console.error('❌ words_alpha.txt not found in ./assets');
    return;
  }

  const text = fs.readFileSync(inputPath, 'utf-8');
  const words = text
    .split('\n')
    .map(w => w.trim())
    .filter(w => w.length > 0);

  fs.writeFileSync(outputPath, JSON.stringify(words));
  console.log(`✅ Converted ${words.length} words to words_alpha.json`);
};

txtToJson();

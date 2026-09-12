const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const files = fs.readdirSync(__dirname);
for (const file of files) {
  if (file.includes('Eyeglass_frame_rotating') && file.endsWith('.mp4')) {
    if (file.includes('114505')) {
      fs.renameSync(path.join(__dirname, file), path.join(publicDir, 'hero-desktop.mp4'));
    } else if (file.includes('114929')) {
      fs.renameSync(path.join(__dirname, file), path.join(publicDir, 'hero-mobile.mp4'));
    }
  }
}
console.log('Videos moved successfully.');

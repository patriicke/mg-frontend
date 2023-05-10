const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// let fileDirectory = path.join(__dirname, './public/assets/crypto/color');
// // read all file loop
// const getSvgObj = async () => {
//   // read all file loop
//   let svgObj = {};
//   //list all file in directory

//   fs.readdirSync(fileDirectory).forEach((file) => {
//     let fileName = file.split('.')[0];
//     svgObj[fileName] = `/assets/crypto/color/${file}.svg`;
//   })
//   fs.writeFileSync(path.join(__dirname, 'public/assets/crypto/color.json'), JSON.stringify(svgObj));
// }

// getSvgObj();
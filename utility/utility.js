const fs = require('fs');

function openFile (path, res) {
  fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      console.log('data: ', data);
      res.json({
          fileContent: data
      });
  });
}

function openDirectory (path, res) {
  const promise1 = () => new Promise((resolve, reject) => {
      return fs.readdir(path, (err, files) => {
          if (err) {
              reject(err);
          }
          resolve(files.filter(file => !(/(^|\/)\.[^\/\.]/g).test(file)));
      });
  });

  promise1().then((files) => {
      const promises = files.map((file) => {
          return new Promise((resolve, reject) => {
              fs.lstat(`${path}/${file}`, (err, res) => {
                  resolve({name: file, isDirectory: res.isDirectory(), path: `${path}/${file}`});
              });
          })
      })

      return Promise.all(promises);
  }).then((result) => {
      res.json({ files: result });
  })
}

module.exports.openDirectory = openDirectory;
module.exports.openFile = openFile;
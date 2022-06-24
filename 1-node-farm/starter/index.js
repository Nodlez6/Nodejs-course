// const fs = require('fs'); //fs significa filesystem

// // const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// // console.log(textIn);

// // const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
// // fs.writeFileSync('./starter/txt/output.txt', textOut);
// // console.log('File witten!')

// //no-blocking, forma asincronica
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('your file has writeen')
//             })
//         });
//     });
// });

// console.log('will read file')

const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./starter/modules/replaceTemplate');

const slugs = dataObject.map((elem) =>
  slugify(elem.productName, { lower: true })
);

//Este codigo de abajo solo se ejecuta una vez, de esa forma cuando
// se hace un request a /api solamente tenemos que leer los datos una vez.

const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  'utf-8'
);
const dataObject = JSON.parse(data);

//esto se queda escuchando las request, por lo que se leen los archivos arriba
const server = http.createServer((req, res) => {
  console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObject
      .map((elem) => replaceTemplate(tempCard, elem))
      .join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  }
  //product page
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  //API
  else if (pathname === '/api') {
    // fs.readFile(`${__dirname}/starter/dev-data/data.json`, 'utf-8', (err, data) => {
    //     const productData = JSON.parse(data); //de un objeto json pasa un objeto js
    //     res.writeHead(200, {
    //         'Content-type': 'application/json'
    //     });
    //     res.end(data)
    // })
    // //dirname obtiene el nombre completo del directorio donde se
    // // encuentra el archivo actualmente ejecutado.
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }
  //Not found
  else {
    //siempre van los headers primero
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    //Un encabezado http es una info sobre
    //la respuesta que estamos enviando.
    res.end('<h1>Page not found</h1>');
  }
  //req -> request
  //res -> response
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});

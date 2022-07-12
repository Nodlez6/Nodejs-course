const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, body) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, body, (err, resul) => {
      if (err) reject('Error jejeje');
      resolve(resul);
    });
  });
};

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body);

    return writeFilePro('dog-img.txt', res.body.message);

    // fs.writeFile('dog-img.txt', res.body.message, (err, res) => {
    //   console.log('Rondom dog image to file!!');
    // });
  })
  .then(() => {
    console.log('Rondom dog image to file!!');
  })
  .catch((err) => {
    console.log(err.message);
  });
*/

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    //Esto guarda una promesa, con el await me entrega
    //lo que se resuelve en la promesa.
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    //ejecutará estas tres promesas al mismo tiempo
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((elem) => elem.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Rondom dog image to file!!');
  } catch (err) {
    console.log(err);
    throw err;
    //esto lanzará el error de la promesa en caso de haber.
  }
  return 'aaa';
};

/* Usar asyn await pero sin luego retornar 
y usar el then y el catch */

//Creas una función y la llamas de inmediato
//usamos otro async/await en vez de then y catch
(async () => {
  try {
    console.log('1: Will get dog pics!');
    console.log(await getDogPic());
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR');
  }
})();

/*
//Una función async siempre retorna una promsesa.
//En este caso hace un console de una promesa pendiente

// console.log('1: Will get dog pics!')
// const x = getDogPic();
// console.log(x);
// console.log('3: Done getting dog pics!');

//Si usamos el método then, accedemos a su valor futuro

console.log('1: Will get dog pics!');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pics!');
  })
  .catch((err) => console.log(err));
*/

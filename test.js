const {getCurrentDate} = require('./testUtils');
const Calc = require('calc-js').Calc;



/*

console.log(process.argv);

const [,, a, b] = process.argv
// equal:
/!*const a = process.argv[2]
const b = process.argv[3]*!/


console.log(0.2 + 0.1);
console.log(new Calc(0.2).sum(0.1).finish());

console.log(new Calc(parseInt(a)).sum(parseInt(b)).finish());

*/


// global.testVar = 'ssss123';

// console.log('Hello World from Node JS :)');


// console.log(`getCurrentDate func result: ${getCurrentDate()}`);
// console.log(global.testVar);
// console.log(process.env);
// console.log(process.argv);
//
// console.log(__dirname);
// console.log(__filename);


/*
//path - для вінди
const path = require('path');
console.log(path.resolve('testUtils.js'));//отримуємо повний шлях до файлу
*/



//FS
/*
const fs = require('fs');

const syncReadFile = fs.readFileSync('./data.txt', 'utf8')//синхронне читання файлу
// - хіба що в момент запуску додатка (бо блокує івент луп)
console.log(syncReadFile);
console.log('fs.readFileSync виконується синхронно');


//// Error-First Callback: коли функція, що передається у колбек першим параметром приймає помилку.

fs.readFile('./data.txt', 'utf8', (error, data) => {
 if (error) {
     console.log(error);
 }
    console.log(data);
})

console.log('fs.readFile виконується асинхронно');
*/

// Promise API // https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api

const fs = require('fs').promises;
/*
const syncReadFile = fs.readFile('./data.txt', 'utf8')


console.log(syncReadFile);
console.log('fs.readFileSync виконується синхронно');

*/

//// Error-First Callback: коли функція, що передається у колбек першим параметром приймає помилку.

// fs.readFile('./data.txt', 'utf8')//така ж функція, як з колбеком, проте з промісом
//     .then(data => console.log('promiseReadFile: ', data))
//     .catch(err => console.error)
//
// console.log('виконується синхронно');


//async-await
/*
(async () => {
    try {
        const data = await fs.readFile('./data.txt', 'utf8')
        console.log('async-await: ', data);
    } catch (err) {
        console.log(err);
    }
})();
*/

// //write file
(async () => {
    try {
        const data = await fs.readFile('./data.txt', 'utf8')
        console.log('async-await: ', data);

        const newData = `${data} newWord`;

        await fs.writeFile('./new-data.txt', newData, 'utf8')// якщо файл вже є - дописує.
        //дописати можна також за допомогою appendFile

        const newDataText = await fs.readFile('./new-data.txt', 'utf8')
        console.log('new data:', newDataText);

        await fs.rename('./new-data.txt', './renamed-data.txt')
        await fs.rename('./renamed-data.txt', './dirToMove/moved-data.txt')

        console.log('1 ', await fs.readdir('./dirToMove'));

        await fs.unlink('./dirToMove/moved-data.txt')
        console.log('2 ', await fs.readdir('./dirToMove'));


    } catch (err) {
        console.log(err);
    }
})();


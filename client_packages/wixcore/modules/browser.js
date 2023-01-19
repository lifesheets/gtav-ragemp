"use strict"; // Created by ua.lifesheets on 01.01.2023.

// Передача значений в браузер на VUE
mp.transferBrowserSimple = function (text) {
    browser.execute(text);
}

// Передача значений в VUE в виде объекта
mp.transferBrowserObject = function (object) {
    for (let objectKey in object) {
        browser.execute(`${objectKey} = ${JSON.stringify(object[objectKey])}`);
    }
}

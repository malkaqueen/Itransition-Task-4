const faker = require('faker');
const fs = require('fs');
const readline = require('readline');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;

function createFakeEntries(entriesNumber, locale) {
    faker.locale = locale;
    let objects = [];
    for (let i = 0; i < entriesNumber; i++) {
        objects.push({
            name: faker.name.findName(),
            address: `$faker.address.streetAddress(), $faker.address.city(), $faker.address.country(), $faker.address.zipCode()`,
            phone: faker.phone.phoneNumber()
        });
    }
    return objects;
}

function loadLocale(paramLocale) {
    switch (paramLocale) {
        case "en_US":
            return "en";
        case "ru_RU":
            return "ru";
        case "uk_UA":
            return "uk";
        default:
            throw Error("Invalid locale input");
    }
}

const myArgs = process.argv.slice(2);
const csvStringifier = createCsvStringifier({
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'address', title: 'ADDRESS'},
        {id: 'phone', title: 'PHONE'}
    ],
    fieldDelimiter: ';'
});

const csvString = csvStringifier.stringifyRecords(createFakeEntries(myArgs[0], loadLocale(myArgs[1])));

console.log(csvString);

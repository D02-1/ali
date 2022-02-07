
const express = require('express');
// body-parserModul analysiert die JSON-, Puffer-, Zeichenfolgen- und URL-codierten Daten, die auf HTTP POSTAnfrage übermittelt werden
const bodyParser = require('body-parser');
const low = require('lowdb');


// in der Variable app haben wir jetzt unseren server von express initialisiert
const app = express();

const port = 5000
// express bitte nutze unseren bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// konfigurieren von lowdb 
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ records: [] }).write();


// wir sind ein Recordshop
// und auf dem Endpunkt (/records) für die Records zum Beispiel: http//:bestshopintown/records 
// könnte zum Beispiel der User, wenn unser Backend mit dem Frontend verbunden wäre 
// alle angebotenen Artikel (Records) ansehen

app.get('/records', (req, res) =>
{
    const records = db.get('records');

    res.status(200).send(records);
});


// auf der POST Route werden neue Einträge in die Datenbank geschrieben. 
// folgende Aktionen können wir ausführen => CRUD
// create - POST
// read - GET
// update - PUT
// delete - DELETE

app.post('/records', (req, res) =>
{
    //die über Postman (Frontendersatz) gesendeten Daten erhalten wir hier im req.body
    const newRecord = req.body
    // wir holen uns die "collection records" aus der Datenbank und fügen den neuen hinzu
    db.get('records').push(newRecord).write();

    // sendet status(201) das heißt eine neue Resource wurde erfolgreich angelegt
    res.status(201).json(newRecord)
    
});

app.listen(port, () => console.log(`Server läuft auf port ${ port}`));
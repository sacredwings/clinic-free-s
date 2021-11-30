//import fs from "fs";
import htmlPdf from "html-pdf";
import ejs from "ejs";

export default async function (path, options1) {
    //let template = fs.readFileSync(path, 'utf8');

    const html = await ejs.renderFile('C:/Node/clinic-free-s/src/template/test.ejs', {xxx: 'работает'}, {async: true})

    const options = { format: 'A4'};
    const fileName = __dirname + '/file.pdf';

    let rrr = await pdfCreate(html, options)
    console.log(rrr)

}



function pdfCreate (html, options) {
    return new Promise(function(resolve, reject) {
        htmlPdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
            if (err) return reject(err);
            resolve(res.filename)
        })
    });
}


/*
var options = { format: 'Letter' };

pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});*/
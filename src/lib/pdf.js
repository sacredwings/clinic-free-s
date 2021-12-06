//import fs from "fs";
import htmlPdf from "html-pdf";
import ejs from "ejs";

export default async function (path, options1) {
    //let template = fs.readFileSync(path, 'utf8');

    const html = await ejs.renderFile('C:/Node/clinic-free-s/src/template/test.ejs', {xxx: 'работает'}, {async: true})

    const options = { format: 'A4'};
    const fileName = 'pdf.pdf'

    return await pdfCreate(html, options, fileName)
}



function pdfCreate (html, options, fileName) {
    const filePath = `C:\\Node\\clinic-free-s\\public\\${fileName}`
    return new Promise(function(resolve, reject) {
        htmlPdf.create(html, options).toFile(filePath, function(err, res) {
            if (err) return reject(err);
            resolve({
                path: res.filename,
                name: fileName
            })
        })
    });
}


/*
var options = { format: 'Letter' };

pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});*/
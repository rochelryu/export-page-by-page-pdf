const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

// Fonction principale pour diviser le PDF
const splitPdf = async (inputPdfPaths) => {
    // Charger le fichier PDF
    let indexAccount = 1;
    for (const inputPdfPath of inputPdfPaths) {
        const existingPdfBytes = fs.readFileSync(inputPdfPath);

        // Charger le document PDF
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const totalPages = pdfDoc.getPageCount();

        // Extraire chaque page dans un fichier séparé
        for (let i = 0; i < totalPages; i++) {
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(pdfDoc, [i]);
            newPdf.addPage(page);

            // Sauvegarder chaque page dans un nouveau fichier
            const pdfBytes = await newPdf.save();
            const outputFilename = `Table_${indexAccount}.pdf`;
            fs.writeFileSync(outputFilename, pdfBytes);
            console.log(`Page ${indexAccount} exportée sous ${outputFilename}`);
            indexAccount++;
        }
    }

    console.log('Division terminée.');
};

// Appeler la fonction avec le chemin du PDF
//splitPdf(['1_48.pdf', '49_96.pdf', '50_144.pdf', '145_192.pdf', '193_240.pdf', '241_270.pdf', '271_318.pdf', '319_352.pdf']);
splitPdf(['LISTE_TABLE_1_40.pdf']);

if (!app.homeScreenVisible) {
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
var myDocument = app.documents.add();
var textLayer = myDocument.layers.add();
textLayer.name = "Tekst";
generateText("Nikola");

myDocument.layers[0].name = "Background Layer";

// generateBackground();
// generateCircle();
// function generateBackground() {
//     var doc = app.activeDocument;
//     var background = doc.pathItems.add();
//     background.filed = true;

//     var backgroundColor = new CMYKColor();
//     backgroundColor.cyan = 0;
//     backgroundColor.magenta = 100;
//     backgroundColor.yellow = 100;
//     backgroundColor.black = 0;

//     background.fillColor = backgroundColor;
//     background.setEntirePath([
//         [0, 0],
//         [doc.width, 0],
//         [doc.width, doc.height],
//         [0, doc.height],
//     ]);
// }

function generateText(text) {
    var doc = app.activeDocument;
    var textFrame = doc.textFrames.add();
    textFrame.name = "test";
    textFrame.contents = text;
    textFrame.textRange.size = 36;
    textFrame.textRange.justifycation = Justifycation.CENTER;
    textFrame.textRange.position = [
        doc.width * 0.5 - textFrame.width * 0.5,
        doc.height * 0.5 - textFrame.height * 0.5,
    ];
}

for (var i = 0; i < 10; i++) {
    myDocument.exportFile(File("~/Documents/" + i + ".png"), ExportType.PNG24);
}

if (!app.homeScreenVisible) {
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

var myDocument = app.documents.add();
myDocument.layers[0].name = "Background Layer";

generateBackground();

var layerThree = myDocument.layers.add();
layerThree.name = "Text Layer";
generateText("Nikola voli Jovanu");

function generateBackground() {
    var doc = app.activeDocument;
    var background = doc.pathItems.add();
    background.filled = true;
    var bgFillColour = new CMYKColor();
    bgFillColour.cyan = 4;
    bgFillColour.magenta = 2;
    bgFillColour.yellow = 97;
    bgFillColour.black = 1;
    background.fillColor = bgFillColour;
    background.setEntirePath([
        [0, 0],
        [doc.width, 0],
        [doc.width, doc.height],
        [0, doc.height],
    ]);
}

function generateText(text) {
    var doc = app.activeDocument;
    var textFrame = doc.textFrames.add();
    textFrame.name = "Test Text Frame";
    // .contents to change text
    textFrame.contents = text;
    var textRange = textFrame.textRange;
    textRange.size = 36;
    textRange.justification = Justification.CENTER;
    textFrame.position = [
        doc.width * 0.5 - textFrame.width * 0.5,
        doc.height * 0.5 + textFrame.height * 0.5,
    ];
}

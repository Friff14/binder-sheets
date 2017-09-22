class Binding {

    constructor(args) {
        if (args) {
            // Set the binding from the input data

            this.columnIndex = args.columnIndex;
            // Transform - x, y, width, height, etc
            this.transform = args.transform;

            if (args.bindingType === 'Text') {
                this.textSettings = args.textSettings;
            }

        }
        else {
            this.columnIndex = null;
            this.bindingType = null;
            this.transform = {
                "x": 1,
                "y": null,
                "width": null,
                "height": null
            }
        }

        //    Define CSSX stylesheet
        this.stylesheet = cssx('style');

        this.uuid = uuid4();
    }

    createTextBinding(args) {
        if (args) {
            this.textSettings = args.textSettings;
        }
        this.textSettings = {
            "fontSize": "12px",
            "fontFamily": "Arial",
            "fontColor": "#000000",
            "textAlign": "left"
        };
        this.textContent = '';
    }

    setFontSize(fontSize) {
        if (!this.textSettings) {
            this.createTextBinding();
        }
        this.textSettings.fontSize = fontSize;
    }

    generateCSS() {
        let ruleset = {};
        let obj = ruleset['.' + this.uuid] = {};
        obj['x'] = this.transform.x;
        this.stylesheet.add(ruleset);
        console.log("Adding this ruleset!", ruleset, obj);
        return this.stylesheet;
    }

}
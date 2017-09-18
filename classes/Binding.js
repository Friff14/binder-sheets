class Binding{

    constructor(args){
        if (args){
            // Set the binding from the input data

            this.columnIndex = args.columnIndex;
            // Transform - x, y, width, height, etc
            this.transform = args.transform;

            if(args.bindingType === 'Text'){
                this.textSettings = args.textSettings;
            }

        }
        else{
            this.columnIndex = null;
            this.bindingType = null;
            this.tranform = {
                "x": null,
                "y": null,
                "width": null,
                "height": null
            }
        }
    }

    createTextBinding(args){
        if (args){
            this.textSettings = args.textSettings;
        }
        this.textSettings = {
            "fontSize": "12px",
            "fontFamily": "Arial",
            "fontColor": "#000000"
        };
        this.textContent = '';
    }

    setFontSize(fontSize){
        if(!this.textSettings){
            this.createTextBinding();
        }
        this.textSettings.fontSize = fontSize;
    }

}
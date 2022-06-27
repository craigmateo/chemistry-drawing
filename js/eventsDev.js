jQuery(window).on("load", function() {

    document.getElementById('filereader').onchange = function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function() {
                var image = new fabric.Image(imgObj);
                image.set({
                    angle: 0,
                    padding: 10,
                    cornersize: 10,
                });
                canvas.centerObject(image);
                canvas.add(image);
                canvas.renderAll();
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    canvas.on('mouse:down', function(o) {
        isDown = true;
        console.log(mode);
        var pointer = canvas.getPointer(o.e);
        var points = [pointer.x, pointer.y, pointer.x, pointer.y];

        if (mode == "pencil") {
            document.getElementById("button-draw").style.backgroundColor = "darkgrey";

        } else if (mode == "draw") {
            document.getElementById("button-line").style.backgroundColor = "darkgrey";

        } else {
            document.getElementById("button-draw").style.backgroundColor = "";

        }

        if (mode == "draw") {
            line = new fabric.Line(points, {
                strokeWidth: 1,
                fill: 'black',
                stroke: 'black',
                originX: 'center',
                originY: 'center',

            });
            canvas.add(line);
        }
    });

    canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);

        if (mode == "draw") {
            line.set({ x2: pointer.x, y2: pointer.y });
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function(o) {
        isDown = false;
        if (line) {
            line.setCoords();
        }

    });

    /*
    canvas.on('text:changed', function(e) {
        console.log('text:changed', e.target, e.target.text);
        if (e.target) {
            let result = getDigits(e.target.text);
            e.target.set('styles', result);
            console.log('ActiveObject', canvas.getActiveObject().styles)
        }
    });

    */




    document.body.onkeyup = function(e) {
        if (e.key == " " ||
            e.code == "Space"
        ) {
            console.log("spacebar");
            removeScript();
        }
    }

    function getDigits(string) {
        strArray = string.split('');
        var jsonString = '{ "0": {'
        for (let i = 0; i < strArray.length; i++) {
            if (isNaN(strArray[i]) == false) {
                console.log("Number " + strArray[i] + " is at index " + i);
                jsonString += '"' + i.toString() + '"' + ': { "fontSize": "15" }, ';
            } else {
                jsonString += '"' + i.toString() + '"' + ': { "fontSize": "30" }, ';
            }
        }
        var objString = jsonString.slice(0, -2);
        result = objString + ' } }';
        return JSON.parse(result);
    }
});
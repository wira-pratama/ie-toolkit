import * as paper from 'paper';

export default class AffinityDiagram {
    constructor(items, startX, startY) {
        this.items = items;
        
        paper.setup('canvas');
        this.canvasWidth = paper.view.viewSize.width;
        this.canvasHeight = paper.view.viewSize.height;
        
        this.spacing = 0.1;
        this.fontSize = 10;
        this.rowHeight = 0;
        this.rowWidth = 0;

        this.tableStart = new paper.Point(
            startX,
            startY
        );

        this.matrixStart = new paper.Point(
            startX,
            startY
        );

        
        this.createTable();
        this.createMatrix();
    };

    createTable() {
        let offset = 0;
        for (var i=0; i<items.length; i++) {
            /*
             * Generate text
            */
            var labelText = new paper.PointText({
                point: [
                    this.tableStart.x,
                    this.tableStart.y + (i * offset)
                ],
            });
            labelText.fontSize = this.fontSize;
            labelText.content = this.items[i];
            labelText.fillColor = 'black';

            /*
             * Get bounds of the text and draw the border
            */
            let {x, y, width, height} = labelText.handleBounds;
            var labelTextBorder = new paper.Path.Rectangle(
                x - (this.spacing * width),
                y - (this.spacing * height),
                width + (this.spacing * 2 * width),
                height + (this.spacing * 2 * height)
            );
            labelTextBorder.strokeColor = 'black';
            labelTextBorder.strokeWidth = 0.4;

            /*
             * Adjust rowHeight for offset
            */
            offset = labelText.strokeBounds.height + (this.spacing * 2 * height);
            this.rowHeight = height + (this.spacing * 2 * height);
            this.rowWidth = width + (this.spacing * 2 * width);

            if (i == 0) {
                this.matrixStart.y = y - (this.spacing * height);
            }
            this.matrixStart.x = x + width + (this.spacing * width);
        };
    };

    createMatrix() {
        let diadimH = this.rowHeight / Math.sqrt(2)
        for (var i=0; i<=items.length; i++) {
            var tileHLine = new paper.Path.Line(
                new paper.Point(
                    this.matrixStart.x + (diadimH * i), 
                    this.matrixStart.y + (diadimH * i) 
                ), 
                new paper.Point(
                    this.matrixStart.x + (diadimH * this.items.length), 
                    this.matrixStart.y + (diadimH * i)
                )
            );
            tileHLine.strokeColor = 'black';
            tileHLine.strokeWidth = 0.4;
            tileHLine.rotate(45, this.matrixStart);

            var tileVLine = new paper.Path.Line(
                new paper.Point(
                    this.matrixStart.x + (diadimH * i), 
                    this.matrixStart.y
                ), 
                new paper.Point(
                    this.matrixStart.x + (diadimH * i), 
                    this.matrixStart.y + (diadimH * i)
                )
            );
            tileVLine.strokeColor = 'black';
            tileVLine.strokeWidth = 0.4;
            tileVLine.rotate(45, this.matrixStart);

            for (var j = 0; j < (this.items.length-i-1); j++) {
                var relationScoreBox = new paper.Path.Circle({
                    center: [
                        this.matrixStart.x + ((this.items.length - i - 1) * diadimH) + (0.30 * diadimH), 
                        this.matrixStart.y + (j * diadimH) + (0.30 *diadimH)
                    ],
                    radius: diadimH * 0.25
                });
                relationScoreBox.rotate(45, this.matrixStart);

                var relationScoreText = new paper.PointText({
                    point: [
                        0,
                        0
                    ],
                });
                // relationScoreText.content = `${j}, ${this.items.length-i-1}`;
                relationScoreText.content = 'A'
                relationScoreText.fillColor = 'black';
                relationScoreText.fitBounds(relationScoreBox.bounds); 

                var reasonScoreBox = new paper.Path.Circle({
                    center: [
                        this.matrixStart.x + ((this.items.length - i) * diadimH) - (0.30 * diadimH), 
                        this.matrixStart.y + ((j + 1) * diadimH) - (0.30 *diadimH)
                    ],
                    radius: diadimH * 0.25
                });
                reasonScoreBox.rotate(45, this.matrixStart);

                var reasonScoreText = new paper.PointText({
                    point: [
                        0,
                        0
                    ],
                });
                // reasonScoreText.content = `${j}, ${this.items.length-i-1}`;
                reasonScoreText.content = '12'
                reasonScoreText.fillColor = 'black';
                reasonScoreText.fitBounds(reasonScoreBox.bounds);

                var splitLine = new paper.Path.Line(
                    new paper.Point(
                        this.matrixStart.x + ((this.items.length - i - 1) * diadimH), 
                        this.matrixStart.y + ((j + 1) * diadimH)
                    ), 
                    new paper.Point(
                        this.matrixStart.x + ((this.items.length - i) * diadimH), 
                        this.matrixStart.y + (j * diadimH)
                    )
                );
                splitLine.strokeColor = 'black';
                splitLine.strokeWidth = 0.4;
                splitLine.rotate(45, this.matrixStart);
            }

        };
    };
};
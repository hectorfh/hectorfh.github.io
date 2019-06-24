const score = {

    PENCIL_WIDTH: 7 * 0.8,
    PENCIL_LONG: 7 * 0.8 * 7,
    TEXT_COLOR: '#EEEEEE',
//const INTRA_HORIZONTAL_MARGIN = 1;
//const INTRA_VERTICAL_MARGIN = 1;

    /**
     * Draw score.
     *
     */
    drawScore: function (left, top, humanPoints, computerPoints) {


        // remove score div if exists.
        const scoreDivElem = document.getElementById("scoreDiv");

        if (scoreDivElem !== null) {
            scoreDivElem.remove();
        }

        const divElem = document.createElement('div');
        divElem.id = 'scoreDiv';

        const scoreContainerInnerElem = document.getElementById('scoreContainerInner');
        scoreContainerInnerElem.appendChild(divElem);

        score.drawX(0, 0, 18);
        score.drawX(score.PENCIL_LONG * 3, 0, 22);

    },


    /**
     * Draw score square.
     */
    drawSquare: function (left, top, points) {

        const COLOR = score.TEXT_COLOR;

        const squareDivs = [
            {left: left, top: top, width: score.PENCIL_LONG, height: score.PENCIL_WIDTH},
            {left: left, top: top, width: score.PENCIL_WIDTH, height: score.PENCIL_LONG},
            {
                left: left + score.PENCIL_LONG - score.PENCIL_WIDTH,
                top: top,
                width: score.PENCIL_WIDTH,
                height: score.PENCIL_LONG
            },
            {
                left: left,
                top: top + score.PENCIL_LONG - score.PENCIL_WIDTH,
                width: score.PENCIL_LONG,
                height: score.PENCIL_WIDTH
            }
        ];

        for (var i = 0; i < points && i < 4; i++) {
            score.drawDiv(squareDivs[i].left, squareDivs[i].top, squareDivs[i].width, squareDivs[i].height, COLOR);
        }

        if (points > 4) {
            for (var i = 0; i < score.PENCIL_LONG * 0.8; i += score.PENCIL_WIDTH / 2) {
                score.drawDiv(left + i, top + i, score.PENCIL_WIDTH, score.PENCIL_WIDTH, COLOR);
            }
        }
    },

    /**
     * Draw bare line used for drawing score square.
     */
    drawDiv: function (left, top, width, height, color) {

        const divElem = document.createElement('div');

        divElem.style.position = 'absolute';
        divElem.style.backgroundColor = color;
        divElem.style.left = left + 'px';
        divElem.style.top = top + 'px';
        divElem.style.width = width + 'px';
        divElem.style.height = height + 'px';

        const scoreDivElem = document.getElementById('scoreDiv');

        scoreDivElem.appendChild(divElem);

    },

    drawX: function (left, top, points) {
        const POINTS_PER_SQUARE = 5;
        const SQUARES_PER_COL = 3;

        for (var i = 0; i <= Math.floor(points / POINTS_PER_SQUARE); i++) {
            const row = i % SQUARES_PER_COL;
            const col = Math.floor(i / SQUARES_PER_COL);
            const pointsInSquare = (i == Math.floor(points / POINTS_PER_SQUARE) ? points % POINTS_PER_SQUARE
                : POINTS_PER_SQUARE);
            score.drawSquare(left + (score.PENCIL_LONG + score.PENCIL_WIDTH * 2) * col,
                top + score.PENCIL_LONG + (score.PENCIL_LONG + score.PENCIL_WIDTH * 2) * row,
                pointsInSquare);
        }
    },

};

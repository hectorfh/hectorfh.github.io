const GameMenu = {

    Option: {
        TRUCO: 'TRUCO',
        RETRUCO: 'RETRUCO'
    },

    options: [
        {
            label: 'Truco',
            condition: () => trcor.mano.gameStatus === GameStatus.INITIAL,
            action: () => {
                trcor.mano.gameStatus = GameStatus.HUMAN_DIJO_TRUCO;

                const newGameStatus = AI.acceptBet();

                if (newGameStatus) {
                    trcor.mano.gameStatus = newGameStatus;
                    truco.compDice(newGameStatus === GameStatus.COMP_QUIZO_TRUCO ? 'Quiero' : 'Retruco');
                }
                else {
                    truco.finalizarMano();
                }
            }
        },
        {
            label: 'Retruco',
            condition: () => [ GameStatus.COMP_DIJO_TRUCO,
                               GameStatus.HUMAN_QUIZO_TRUCO ].includes(trcor.mano.gameStatus)
        }
    ],

    /**
     * Show game menu with options, ie. 'Envido', 'Truco', 'Retruco', 'Quiero'...
     *
     */
    showMenu: function() {

        console.info('showMenu');
        const menuElem = document.getElementById('menu');

        menuElem.className = 'open';

        const menuOptionsElem = document.getElementById('menuOptions');

        menuOptionsElem.innerHTML = GameMenu.optionsToDisplay()
            .map(option => '<div class="menuOption" onclick="GameMenu.selectOption()">&gt; ' + option.label + '</div>')
            .join('');


    },

    optionsToDisplay: function() {

        return GameMenu.options.filter(option => option.condition());

    },

};

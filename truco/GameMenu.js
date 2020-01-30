const GameMenu = {

    options: [
        {
            label: 'Truco',
            condition: () => trcor.mano.gameStatus === GameStatus.INITIAL,
            action: () => {
                trcor.mano.gameStatus = GameStatus.HUMAN_DIJO_TRUCO;

            }
        },
        {
            label: 'Retruco',
            condition: () => [ GameStatus.COMP_DIJO_TRUCO,
                               GameStatus.HUMAN_QUIZO_TRUCO ].includes(trcor.mano.gameStatus)
        }
    ],

    optionsToDisplay: function() {

        return GameMenu.options.filter(option => option.condition());

    },

};

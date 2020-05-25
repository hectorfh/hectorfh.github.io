
const trcor = {

    /**
     * Valores de las cartas.
     */
    valores: [ /* BASTO  */ 15, 11, 12, 3, 4, 5, 6, 7, 8, 9,
        /* ORO    */ 10, 11, 12, 3, 4, 5, 13, 7, 8, 9,
        /* ESPADA */ 16, 11, 12, 3, 4, 5, 14, 7, 8, 9,
        /* COPA   */ 10, 11, 12, 3, 4, 5, 6, 7, 8, 9],

    NULL: -1,

    AL_MAZO: -2,
    TRUCO: -3,
    RETRUCO: -4,
    VALE_4: -5,

    HUMAN: 100,
    COMPUTER: 101,
    MANO: 102,
    PIE: 103,

    probabilidadesRequeridasApuestaNormal: [0.6, 0.7, 0.95],
    probabilidadesRequeridasAceptacionNormal: [0.5, 0.6, 0.9],

    /**
     * Init mano.
     *
     */
    initMano() {

        // shuffle cards array
        const mazo = util.shuffleArray(Array(40).fill().map((e,i) => i));

        // Set human and computer cards. Reset played cards array.
        trcor.mano = {
            humanCards: mazo.slice(0, 3),
            computerCards: mazo.slice(3, 6),
            playedCards: [],
            manoPlayer: null,
            gameStatus: GameStatus.INITIAL
        };

    },

    /**
     * Return the winner of the hand, if there is one.
     * Possible values could be trcor.HUMAN, trcor.COMPUTER or null.
     *
     */
    winner() {
        if (trcor.mano.playedCards.length == 4) {
            if (trcor.valor(trcor.mano.playedCards[2]) > trcor.valor(trcor.mano.playedCards[3])) {
                if (trcor.valor(trcor.mano.playedCards[0]) == trcor.valor(trcor.mano.playedCards[1])) {
                    // parda
                    return trcor.manoPlayer();
                }
                else {
                    return trcor.winnerFirstCard(trcor.mano.playedCards);
                }
            }
            else if (trcor.valor(trcor.mano.playedCards[2]) == trcor.valor(trcor.mano.playedCards[3])) {
                return trcor.winnerFirstCard(trcor.mano.playedCards);
            }
            else {
                if (trcor.valor(trcor.mano.playedCards[0]) == trcor.valor(trcor.mano.playedCards[1])) {
                    // parda
                    return trcor.piePlayer();
                }
            }
        }

        return null;
    },

    /**
     * Return the winner of the first card, if there is one.
     * Possible values could be trcor.MANO, trcor.PIE or null.
     *
     */
    winnerFirstCard(playedCards) {

        if (playedCards.length >= 2) {
            if (trcor.valor(playedCards[0]) > trcor.valor(playedCards[1])) {
                return trcor.manoPlayer();
            }
            else if (trcor.valor(playedCards[0]) < trcor.valor(playedCards[1])) {
                return trcor.piePlayer();
            }
        }

        return null;
    },

    /**
     * Get next computer card.
     */
    getNextCompCard: function() {
        const nonPlayedCards = trcor.mano.computerCards.filter(function(card) { return !trcor.mano.playedCards.includes(card); });

        return trcor.mano.computerCards.indexOf(nonPlayedCards[util.getRandomInt(0, nonPlayedCards.length - 1)]);
    },

    nextPlayer: function() {
        const nextPlayerIsMano = function() {
            switch (trcor.mano.playedCards.length) {
                case 0:
                    return true;
                case 1:
                    return false;
                case 2:
                    return trcor.valor(trcor.mano.playedCards[0]) >= trcor.valor(trcor.mano.playedCards[1]);
                case 3:
                    return trcor.valor(trcor.mano.playedCards[0]) < trcor.valor(trcor.mano.playedCards[1]);
                case 4:
                    return trcor.valor(trcor.mano.playedCards[0]) <= trcor.valor(trcor.mano.playedCards[1]);
                case 5:
                    return trcor.valor(trcor.mano.playedCards[0]) > trcor.valor(trcor.mano.playedCards[1]);
            }
        };

        return nextPlayerIsMano() ? trcor.mano.manoPlayer : trcor.piePlayer();
    },

    valor: function(carta) {
        return trcor.valores[carta];
    },

    manoPlayer: function() {
        return trcor.mano.manoPlayer;
    },

    piePlayer: function() {
        return trcor.mano.manoPlayer == trcor.HUMAN ? trcor.COMPUTER : trcor.HUMAN;
    },


};

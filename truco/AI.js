const AI = {

    winProbability: (playedCards) => {

        switch (playedCards.length) {

            case 0:

                break;

            case 1:
                // depends on who is the mano player...
                //return AI.winProbability(playedCards);

            case 2:

                // if computer has won first point
                switch (trcor.winnerFirstCard(playedCards)) {

                    case trcor.COMPUTER:
                        return trcor.nonPlayedCards(playedCards)[0] +
                               trcor.nonPlayedCards(playedCards)[1] -
                               trcor.nonPlayedCards(playedCards)[0] * trcor.nonPlayedCards(playedCards)[1];

                    case trcor.HUMAN:
                        return trcor.nonPlayedCards(playedCards)[0] * trcor.nonPlayedCards(playedCards)[1];

                    default:
                        //first point is drawn
                        return Math.max(trcor.nonPlayedCards(playedCards)[0], trcor.nonPlayedCards(playedCards)[1]);

                }

                break;

        }

        return 0.5;

    },

    cardProbability: (card) => {
        return 0.5;
    },

    raiseBet: () => {

        if (trcor.mano.gameStatus === GameStatus.INITIAL) {

        }
        else if (trcor.mano.gameStatus === GameStatus.COMP_QUIZO_TRUCO) {

        }

    },

    acceptBet: () => {
        if (trcor.mano.gameStatus === GameStatus.HUMAN_DIJO_TRUCO) {
            return GameStatus.COMP_QUIZO_TRUCO;
        }
    }

};

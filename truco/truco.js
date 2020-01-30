const truco = {

    CARD_WIDTH: 150,
    CARD_HEIGHT: 150,
    CARD_SEP: 7,

    BACKGROUND_COLOR: 'black',
    TEXT_COLOR: '#EEEEEE',

    cardsEnabled: false,

    main: function() {

        // Set human and computer cards. Reset played cards array.
        trcor.initMano();

        // draw human cards
        trcor.mano.humanCards.forEach(function(card, i) {
            truco.drawCard(i, i * (truco.CARD_WIDTH + truco.CARD_SEP), 200);
        });

        // draw computer cards
        //trcor.mano.computerCards.forEach(function(card, i) {
            //trcor.drawCompCard(i, 1 + i * (trcor.COMP_CARD_WIDTH + 4), 10);
        //});

        //$('#gameDiv').on('click', '.humanCard', trcor.playCard);

        //trcor.drawMenu();

        score.drawScore(0, 40);

        //trcor.drawCantar();



        trcor.mano.manoPlayer = truco.getManoPlayer(null);

        if (trcor.mano.manoPlayer == trcor.HUMAN) {
            //???
            truco.enableHumanCards();
        }
        else {
            const i = trcor.getNextCompCard();
            trcor.mano.playedCards.push(trcor.mano.computerCards[i]);
            truco.moveCompCard(i);
            // TODO enable human cards after 2000 ms
            truco.enableHumanCards();
        }

        truco.compDice('bla bla bla bla bla bla bla bla bla bla bla bla bla bla');
    },


    /**
     * Return the opposite, if there is one. For instance, if value is MANO, return PIE.
     *
     */
    /*opposite(value) {
      if (value == trcor.MANO) {
        return trcor.PIE;
      }
      else if (value == trcor.PIE) {
        return trcor.MANO;
      }
    },*/

    compDice(msg) {
        const compDiceMsgDiv = document.getElementById('compDiceMsg');
        compDiceMsgDiv.innerHTML = msg;
    },

    moveCompCard: function(i) {
        const cardDiv = document.getElementById('compCard_' + i);
        cardDiv.style.left = truco.getRandomCardPositionX() + 'px';
        cardDiv.style.top = truco.getRandomCardPositionY(trcor.COMPUTER) + 'px';
        //cardDiv.style.left = '100px';
        //cardDiv.style.top = '100px';

        console.info(truco.getRandomCardPositionY(trcor.COMPUTER) + 'px');
        cardDiv.style.zIndex = trcor.mano.playedCards.length;
        cardDiv.style.display = 'block';

        setTimeout(function() { truco.showCompCard(i) }, 500);

    },

    showCompCard: function(i) {

        const cardDiv = document.getElementById('compCard_' + i);
        cardDiv.style.backgroundImage = "url('naipes.png')";
        cardDiv.style.backgroundSize = truco.CARD_WIDTH * 10 + 'px ' + truco.CARD_HEIGHT * 4 + 'px';
        cardDiv.style.backgroundPositionX = (trcor.mano.computerCards[i] % 10 * -truco.CARD_WIDTH) + 'px';
        cardDiv.style.backgroundPositionY = (Math.floor(trcor.mano.computerCards[i] / 10) * truco.CARD_HEIGHT) + 'px';

        /**
         * Is it the end of the game?
         */
        if (trcor.winner()) {
            truco.finalizarMano();
            return;
        }

        if (trcor.nextPlayer() == trcor.HUMAN) {
            truco.enableHumanCards();
        }
        else {
            const i = trcor.getNextCompCard();
            trcor.mano.playedCards.push(trcor.mano.computerCards[i]);
            truco.moveCompCard(i);
        }

    },

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
                                            .map(option => '<div class="menuOption">&gt; ' + option.label + '</div>')
                                            .join('');


    },
    /*
    drawMenuOption: function(code, text, func) {

      $('<div>' + text + '</div>').appendTo('#menu').
        attr('class', 'menu-option').
        css('cursor', 'pointer').
        css('position', 'relative').
        //css('width', '100%').
        css('height', '50px').
        css('padding-left', '10px').
        click(func);*/
    /*hover(function() {
            $(this).css('background-color', 'black').
                    css('color', '#EEEEEE');
          }, function(){
            $(this).css('background-color', '#EEEEEE').
                    css('color', 'black');
          });*/

    //$('#menu').animate({ height: '330px'}, 500);
//},

    closeMenu: function() {
        //
        const menuElem = document.getElementById('menu');

        menuElem.className = '';
        //menuElem.style.maxWidth = 0;
        //menuElem.style.maxHeight = 0;
        //menuElem.style.animation = 'close-menu-animation';
        //menuElem.style.animationDuration = '500ms';

        //ssetTimeout(function() { menuElem.style.show = 'none'; }, 500);
    },

    /**
     * Executed when user clicks a card.
     *
     */
    playCard: function(i) {

        // Get card.
        const card = trcor.mano.humanCards[i];

        // Return if cards are disabled or the card is already played (is in player cards array).
        if (!truco.cardsEnabled || trcor.mano.playedCards.indexOf(card) != -1) {
            return;
        }
        // else cards are enabled and the card has not been played yet.

        // Push played card on playedCards array.
        trcor.mano.playedCards.push(card);

        // Get card DOM element.
        const cardElem = document.getElementById('card_' + i);

        // Put card div on top of z index.
        cardElem.style.zIndex = trcor.mano.playedCards.length;

        // Disable human cards.
        truco.disableHumanCards();

        // Get random card destination.
        const origX = cardElem.style.left.substring(0, cardElem.style.left.length - 2);
        const destX = truco.getRandomCardPositionX();
        const dX = destX - origX;
        const origY = getComputedStyle(cardElem).top.substring(0, getComputedStyle(cardElem).top.length - 2);
        const destY = truco.getRandomCardPositionY(trcor.HUMAN);
        const dY = destY - origY;

        // Move card.
        cardElem.style.cursor = 'default';
        cardElem.style.transform = 'translate(' + dX + 'px,' + dY + 'px)';

        setTimeout(truco.playCardAfterAnimation, 500);
        //$(this).animate({ left: x, bottom: y }, 200, function() { trcor.playCardAfterAnimation(); });

    },

    playCardAfterAnimation: function() {

        /**
         * Is it the end of the game?
         */
        if (trcor.winner()) {
            truco.finalizarMano();
            return;
        }

        if (trcor.nextPlayer() == trcor.HUMAN) {
            truco.enableHumanCards();
        }
        else {
            const i = trcor.getNextCompCard();
            trcor.mano.playedCards.push(trcor.mano.computerCards[i]);
            truco.moveCompCard(i);
        }

    },

    finalizarMano() {
        truco.compDice('Fin');
    },

    getRandomCardPositionX() {
        return truco.CARD_SEP + Math.floor(Math.random() * truco.CARD_SEP * 2) +
            Math.floor((trcor.mano.playedCards.length - 1) / 2) * truco.CARD_WIDTH;
    },

    getRandomCardPositionY(player) {
        return truco.CARD_HEIGHT / 2 - truco.CARD_SEP * 2 + Math.floor(Math.random() * truco.CARD_SEP * 2) +
            (player == trcor.HUMAN ? truco.CARD_HEIGHT / 2 : 0);
    },

    drawCard: function(i, x, y) {

        const cardElem = document.getElementById('card_' + i);

        cardElem.style.left = x + 'px';
        cardElem.style.backgroundPositionX = trcor.mano.humanCards[i] % 10 * -truco.CARD_WIDTH + 'px';
        cardElem.style.backgroundPositionY = Math.floor(trcor.mano.humanCards[i] / 10) * truco.CARD_HEIGHT + 'px';

    },

    enableHumanCards: function() {

        //$('.humanCard').css('cursor', 'pointer');
        truco.cardsEnabled = true;

    },

    disableHumanCards: function() {

        //$('.humanCard').css('cursor', 'default');
        truco.cardsEnabled = false;

    },


    /**
     * Get "mano" player randomly if it's the first mano or depending on who was the last mano player.
     */
    getManoPlayer: function(previousManoPlayer) {
        return util.getRandomInt(0, 1);
    },

};

truco.main();

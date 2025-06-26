val = [ /* BASTO  */ 15, 11, 12, 3, 4, 5, 6, 7, 8, 9,
        /* ORO    */ 10, 11, 12, 3, 4, 5, 13, 7, 8, 9,
        /* ESPADA */ 16, 11, 12, 3, 4, 5, 14, 7, 8, 9,
    /* COPA   */ 10, 11, 12, 3, 4, 5, 6, 7, 8, 9];

label = [
    "1 de basto", "2 de basto", "3 de basto", "4 de basto", "5 de basto", "6 de basto", "7 de basto", "10 de basto", "11 de basto", "12 de basto",
    "1 de oro", "2 de oro", "3 de oro", "4 de oro", "5 de oro", "6 de oro", "7 de oro", "10 de oro", "11 de oro", "12 de oro",
    "1 de espada", "2 de espada", "3 de espada", "4 de espada", "5 de espada", "6 de espada", "7 de espada", "10 de espada", "11 de espada", "12 de espada",
    "1 de copa", "2 de copa", "3 de copa", "4 de copa", "5 de copa", "6 de copa", "7 de copa", "10 de copa", "11 de copa", "12 de copa",
];


function ai(playedCards, aiCards)
{
    if (playedCards.length == 0) {
        return aiCards[0];
    }
    else if (playedCards.length == 1) {
        return bestPlay(playedCards, 'human', compCards);
    }
    else if (playedCards.length == 2) {
        if (cval(playedCards[0]) == cval(playedCards[1])) {
        }
        return aiCards[1];
    }
    else if (playedCards.length == 3) {
    }
    console.log("hola");
}

function winProb(plydCards, mano, compCards)
{
    // a*b + a*(1-b)*c + (1-a)*b*c
    // a*b + a*c - a*b*c + b*c - a*b*c
    // a*b + a*c + b*c - 2*a*b*c
    if (plydCards.length == 0) {
	return cardProb(compCards[0])*cardProb(compCards[1]) +
	    cardProb(compCards[0])*cardProb(compCards[2]) +
	    cardProb(compCards[1])*cardProb(compCards[2]) -
	    2*cardProb(compCards[0])*cardProb(compCards[1])*
	    cardProb(compCards[2]);
    }
    else if (plydCards.length == 1) {
	if (mano == 'ai') {
	    return cardProb(plydCards[0])*cardProb(compCards[0]) +
		cardProb(plydCards[0])*cardProb(compCards[1]) +
		cardProb(compCards[0])*cardProb(compCards[1]) -
		2*cardProb(plydCards[0])*cardProb(compCards[0])*
		cardProb(compCards[1]);
	} else {
	    let bestPlay = bestPlay(plydCards, mano, compCards);
	    let plydCards = appendCard(plydCards, bestPlay);
	    let compCards = removeCard(compCards, bestPlay);
	    return winProb(plydCards, mano, compCards);
	}
    }
    else if (plydCards.length == 2) {
        // ai gana la primera
        if (mano == 'ai' && val[plydCards[0]] > val[plydCards[1]]
            || mano == 'human' && val[plydCards[0]] < val[plydCards[1]]) {
	    return cardProb(compCards[0]) + cardProb(compCards[1]) -
		cardProb(compCards[0])*cardProb(compCards[1]);
        }
        // ai pierde la primera
        else if (mano == 'ai' && val[plydCards[0]] < val[plydCards[1]]
                 || mano == 'human' && val[plydCards[0]] > val[plydCards[1]]) {
	    return cardProb(compCards[0]) * cardProb(compCards[1]);
        }
        // parda
        else {
            return cardProb(bestCard(compCards[0], compCards[1]));
        }
    }
    else if (plydCards.length == 3) {
    }
    else if (plydCards.length >= 4) {
        // ai gana la primera
        if (mano == 'ai' && val[plydCards[0]] > val[plydCards[1]]
            || mano == 'human' && val[plydCards[0]] < val[plydCards[1]]) {
            // ai gana la segunda
            if (val[plydCards[2]] >= val[plydCards[3]]) {
                return 1;
            }
            // ai pierde la segunda
            else {
                if (plydCards.length == 5) {
                    return compCards[0] >= plydCards[4] ? 1 : 0;
                }
                return cardProb(compCards[0]);
            }
        }
        // ai pierde la primera
        else if (mano == 'ai' && val[plydCards[0]] < val[plydCards[1]]
                 || mano == 'human' && val[plydCards[0]] > val[plydCards[1]]) {
            // ai gana la segunda
            if (val[plydCards[2]] < val[plydCards[3]]) {
                return cardProb(plydCards.length == 5 ? plydCards[4] : compCards[0]);
            }
            // ai pierde la segunda
            else {
                return 0;
            }
        }
        // parda
        else {
            // ai gana la segunda
            if (mano == 'ai' && val[plydCards[2]] > val[plydCards[3]]
                || mano == 'human' && val[plydCards[2]] < val[plydCards[3]]) {
                return 1;
            }
            // ai pierde la segunda
            else if (mano == 'ai' && val[plydCards[2]] < val[plydCards[3]]
                || mano == 'human' && val[plydCards[2]] > val[plydCards[3]]) {
                return 0;
            }
            // sigue parda !!!
            else {
                if (plydCards.length == 5) {
                    if (mano == 'ai') {
                        return cardProb(plydCards[5]);
                    }
                    else {
                        return compCards[0] > plydCards[4] ? 1 : 0;
                    }
                }
                return cardProb(compCards[0]);
            }
        }

    }

}



/*
func winProb(plydCards []int, mano Player, compCards []int) float64 {

	switch len(plydCards) {

	case 0:
		return cardProb(compCards[0])*cardProb(compCards[1]) +
			cardProb(compCards[0])*cardProb(compCards[2]) +
			cardProb(compCards[1])*cardProb(compCards[2]) -
			2*cardProb(compCards[0])*cardProb(compCards[1])*
				cardProb(compCards[2])

	case 1:
		if mano == Computer {

			return cardProb(plydCards[0])*cardProb(compCards[0]) +
				cardProb(plydCards[0])*cardProb(compCards[1]) +
				cardProb(compCards[0])*cardProb(compCards[1]) -
				2*cardProb(plydCards[0])*cardProb(compCards[0])*
					cardProb(compCards[1])

		} else {

			bestPlay := bestPlay(plydCards, mano, compCards)
			plydCards = append(plydCards, bestPlay)
			compCards = removeCard(compCards, bestPlay)
			return winProb(plydCards, mano, compCards)

		}
	case 2:
		firstCardWinner := firstCardWinner(plydCards, mano)

		if firstCardWinner == Computer {
			return cardProb(compCards[0]) + cardProb(compCards[1]) -
				cardProb(compCards[0])*cardProb(compCards[1])
		} else if firstCardWinner == Human {
			return cardProb(compCards[0]) * cardProb(compCards[1])
		} else {
			return math.Max(cardProb(compCards[0]), cardProb(compCards[1]))
		}
	case 3:
		firstCardWinner := firstCardWinner(plydCards, mano)

		if firstCardWinner == Computer {
			return cardProb(plydCards[2]) + cardProb(compCards[0]) -
				cardProb(plydCards[2])*cardProb(compCards[0])
		} else if firstCardWinner == Human {
			bestPlay := bestPlay(plydCards, mano, compCards)
			plydCards = append(plydCards, bestPlay)
			compCards = removeCard(compCards, bestPlay)
			return winProb(plydCards, mano, compCards)
		} else {
		}
	case 4:
		// verify game is not over ?
		return cardProb(compCards[0])
	case 5:
		if len(compCards) > 0 {
			return cardProb(compCards[0])
		} else {
			return cardProb(plydCards[4])
		}

	}

}
*/

function cardProb(card) {
    let count = 0;

    for (let i = 0; i < 40; i++) {
        if (val[card] > val[i]) {
            count ++;
        }
    }

    // cast to float
    return count / 39;
}

function bestPlay(plydCards, mano, compCards)
{
    let bestProb = 0.0;
    let bestPlay = 40;

    for (let n in compCards) {
	let prob = winProb(appendCard(plydCards, compCards[n]), mano,
			   removeCard(compCards, compCards[n]));

        if (prob >= bestProb) {
	    bestProb = prob;
	    bestPlay = compCards[n];
	}
    }

    return bestPlay;

}

function bestCard(card1, card2)
{
    if (cval(card2) > cval(card1)) {
        return card2;
    }
    return card1;
}

function firstCardWinner()
{
}

function appendCard(arr, c)
{
    return arr.concat([c]);
}

function removeCard(arr, c)
{
    let n = arr.indexOf(c);
    let a = arr.slice(0, n);
    let b = arr.slice(n+1, arr.length);
    return a.concat(b);
}

function cval(i)
{
    return val[i];
}

console.log(ai([], [21, 5, 38]))

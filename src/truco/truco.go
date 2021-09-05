package main

import (
	"fmt"
	"math"
)

type Player int

const (
	Computer Player = iota
	Human
	NoOne
)

var rates = []int{
	/* BASTO  */ 16, 12, 13, 4, 5, 6, 7, 8, 9, 10,
	/* ORO    */ 11, 12, 13, 4, 5, 6, 14, 8, 9, 10,
	/* ESPADA */ 17, 12, 13, 4, 5, 6, 15, 8, 9, 10,
	/* COPA   */ 11, 12, 13, 4, 5, 6, 7, 8, 9, 10,
}

func main() {

	fmt.Println("Truco")

}

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

func cardProb(card int) float64 {

	count := 0

	for i := 0; i < 40; i++ {
		if rates[card] > rates[i] {
			count++
		}
	}

	return float64(count) / 39

}

func bestPlay(plydCards []int, mano Player, compCards []int) int {

	bestProb := 0.0
	bestPlay := 40

	for _, c := range compCards {
		prob := winProb(append(plydCards, c), mano,
			removeCard(compCards, c))

		if prob >= bestProb {
			bestProb = prob
			bestPlay = c
		}
	}

	return bestPlay

}

func nextCard(plydCards []int, mano Player, compCards []int) int {

	switch len(plydCards) {

	case 0:
		if mano == Computer {
			return compCards[0]
		} else {
			return 40 // human's turn
		}

	case 1:
		if mano == Computer {
			return 40 // human's turn
		} else {
			return bestPlay(plydCards, mano, compCards)
		}
	case 2:
		firstCardWinner := firstCardWinner(plydCards, mano)

		if firstCardWinner == Computer {
			return bestPlay(plydCards, mano, compCards)
		} else if firstCardWinner == Human {
			return 40 // human's turn
		} else if mano == Computer {
			return bestPlay(plydCards, mano, compCards)
		} else {
			return 40 // human's turn
		}
	case 3:
		firstCardWinner := firstCardWinner(plydCards, mano)

		if firstCardWinner == Computer {
			return 40 // human's turn
		} else if firstCardWinner == Human {
			bp := bestPlay(plydCards, mano, compCards)
			if rates[bp] > rates[plydCards[2]] {
				return bp
			} else {
				return 41 // fold
			}
		} else if mano == Computer {
			return 40 // human's turn
		} else {
			bp := bestPlay(plydCards, mano, compCards)
			if rates[bp] >= rates[plydCards[2]] {
				return bp
			} else {
				return 41 // fold
			}
		}
	case 4:
		firstCardWinner := firstCardWinner(plydCards, mano)

		if firstCardWinner == Computer {
			return 40 // human's turn
		} else if firstCardWinner == Human {
			return bestPlay(plydCards, mano, compCards)
		} else if mano == Computer {
			return bestPlay(plydCards, mano, compCards)
		} else {
			return 40 // human's turn
		}
	case 5:
		firstCardWinner := firstCardWinner(plydCards, mano)

		if firstCardWinner == Computer {
			bp := bestPlay(plydCards, mano, compCards)
			if rates[bp] >= rates[plydCards[4]] {
				return bp
			} else {
				return 41 // fold
			}
		} else if firstCardWinner == Human {
			return 40 // human's turn
		} else if mano == Computer {
			return 40 // human's turn
		} else {
			bp := bestPlay(plydCards, mano, compCards)
			if rates[bp] > rates[plydCards[4]] {
				return bp
			} else {
				return 41 // fold
			}
		}

	}

}

func firstCardWinner(plydCards []int, mano Player) Player {

	if plydCards[0] > plydCards[1] {
		return mano
	} else if plydCards[0] < plydCards[1] {
		return opposite(mano)
	} else {
		return NoOne
	}
}

// opposite Human -> Computer, Computer -> Human
func opposite(player Player) Player {

	if player == Computer {
		return Human
	} else if player == Human {
		return Computer
	} else {
		return NoOne
	}

}

func removeCard(cards []int, card int) []int {

	for i, c := range cards {

		if c == card {

			return append(cards[:i], cards[i+1:]...)

		}

	}

	return append([]int{}, cards...)
}

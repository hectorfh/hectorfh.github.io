package main


import "fmt"
import "math"
import "math/rand"


type Player int

const (
    Computer Player = iota
    Human
    Noone
)

var rates = []int {
    /* BASTO  */ 16, 12, 13, 4, 5, 6, 7, 8, 9, 10,
        /* ORO    */ 11, 12, 13, 4, 5, 6, 14, 8, 9, 10,
        /* ESPADA */ 17, 12, 13, 4, 5, 6, 15, 8, 9, 10,
        /* COPA   */ 11, 12, 13, 4, 5, 6, 7, 8, 9, 10,
}

func main() {

    fmt.Println("Truco")

}

func winProb(plydCards []int, mano Player, compCards []int) {

    switch (len(plydCards)) {

        case 0:
                return cardProb(compCards[0]) * cardProb(compCards[1]) +
                    cardProb(compCards[0]) * cardProb(compCards[2]) +
                    cardProb(compCards[1]) * cardProb(compCards[2]) -
                    2 * cardProb(compCards[0]) * cardProb(compCards[1]) *
                    cardProb(compCards[2])

        case 1:
            if mano == Computer {

                return cardProb(plydCards[0]) * cardProb(compCards[1]) +
                    cardProb(plydCards[0]) * cardProb(compCards[2]) +
                    cardProb(compCards[1]) * cardProb(compCards[2]) -
                    2 * cardProb(plydCards[0]) * cardProb(compCards[1]) *
                    cardProb(compCards[2])

            } else {

                //
                bestPlay := bestPlay(plydCards, mano, compCards)

                plydCards = append(plydCards, bestPlay)

                compCards = removeCard(compCards, bestPlay)

                winProb(plydCards, mano, compCards)
                
            }
        case 2:
            // ver quien gano la primera mano
            firstCardWinner := firstCardWinner(plydCards, mano)

            if firstCardWinner == Computer {
            } else if firstCardWinner == Human {
                
            } else {
            }

    }

}

func cardProb(card int) float {

    count := 0

    for i := 0; i < 40; i++ {
        if rates[card] > rates[i] {
            count++
        }
    }

    return count / 39

}

func bestPlay(plydCards []int, mano Player, compCards []int) int {

    bestProb := 0.0
    bestPlay := 0
    
    for i := 0; i < len(compCards); i++ {
        prob = winProb(append(plydCards, compCards[i]), mano,
                            append(compCards[:i], compCards[i+1:]...), randNum)

        if prob > bestProb {
            bestProb = prob
            bestPlay = i
        }
    }

    return compCards[bestPlay]

}

func nextCard(plydCards []int, mano Player, compCards []int) {

    switch (len(plydCards)) {

        case 0:
            if mano == Computer {
                return compCards[0]
            } else {
            }

        case 1:
            if mano == Computer {
            } else {
                return bestPlay(plydCards, mano, compCards)
            }

    }

}

func firstCardWinner(plydCards []int, mano Player) Player {

    if plydCards[0] > plydCards[1] {
        return mano
    } else plydCards[0] < playCards[1] {
        return opposite(mano)
    } else {
        return Noone
    {
}

func opposite(player Player) Player {

    if player == Computer {
        return Human
    } else if player == Human {
        return Computer
    } else {
        return Noone
    }

}

func removeCard(cards []int, card int) []int {

    for i, c := range cards {

        if c == card {

            return append(cards[:i], cards[i+1:]...)

        }

    }

}



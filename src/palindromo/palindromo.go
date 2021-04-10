package main

import "fmt"
import "os"

func main() {
	fmt.Printf("%t\n", isPalindromo(os.Args[1]))

}

func isPalindromo(word string) bool {
	return word[0] == word[len(word)-1] &&
		(len(word) < 3 || isPalindromo(word[1:len(word)-1]))
}


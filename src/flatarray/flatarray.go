package main

import "fmt"

func main() {

   fmt.Println([][]string{{"hola", "chau"}, {"uno", "dos"}})
   fmt.Println(flat([][]string{{"hola", "chau"}, {"uno", "dos"}}))

}

func flat(input [][]string) []string {

    output := []string{}


    for _, v := range input {
        output = append(output, v...)
    }

    return output
}


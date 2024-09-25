  /*
     literal: can be a variable or a func name
              we won't know w/o context
  */

  const input = `
    testArray ["a" 3.3 [j "k"]]
    letters ["a" "b" "c" "d" "e" "f" "g" "h" "i" "j" "k" "l" "m" "n" "o" "p" "q" "r" "s" "t" "u" "v" "w" "x" "y" "z"]

    :function1 param1 param2
      ? . (> i 5.3) (= (f1) 1.43)
        - cmd1 "hello" 7
        mivar sarlanga "prueba string"
      ?

    :indent
      indstr ""
      i 0
      ~ < i (* indentl 4)
        indstr strcat indstr " "
        i + i 1
      ~
      < indstr

    :isLetter str
      < . (= (strlen str) 1) (en str letters)

    :getToken
      cchar (getChar)

      ~ = cchar " "
        cchar (getChar)
      ~

      ? = cchar "\\\""
        str "\\\""
        cchar (getChar)
        ~ . (<> cchar "\\\"") (<> cchar "EOF")
          str + str cchar
          cchar (getChar)
        ~
        str + str "\\\""
        < str
      ?

  `

  const ops = [
    { 'src': '.', 'dest': '&&' },
    { 'src': ',', 'dest': '||' },
    { 'src': '=', 'dest': '===' },
    { 'src': '<>', 'dest': '!==' },
    { 'src': '<', 'dest': '<' },
    { 'src': '>', 'dest': '>' },
    { 'src': '+', 'dest': '+' },
    { 'src': '*', 'dest': '*' },
  ]

  let ccharn = 0
  let indentl = 0
  let vars = []

  function indent() {
    let indstr = ''
    for (let i = 0; i < indentl * 4; i++) {
      indstr += ' '
    }
    return indstr
  }

  function echo(str) {
    const main = document.getElementById("main")
    main.innerHTML += "<pre>" + str + "</pre>"
  }

  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i)
  }

  function getChar() {
    if (ccharn == input.length) {
      return 'EOF'
    }
    return input[ccharn++]
  }

  function getToken() {
    let cchar = getChar()

    while (cchar == ' ') {
      cchar = getChar()
    }

    if (cchar == '"') {
      let str = ''
      let escape = false
      cchar = getChar()
      while ((cchar != '"' || escape) && cchar != 'EOF') {
        if (!escape && cchar == '\\') {
            escape = true
            str += cchar
        } else {
            escape = false
            str += cchar
        }
        cchar = getChar()
      }
      return '"' + str + '"'
    }

    if (['(', ')', '[', ']'].includes(cchar)) {
      return cchar;
    }

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(cchar)) {
      let number = '';
      while (cchar != ' ' && cchar != ')' && cchar != '\n' && cchar != 'EOF') {
        number += cchar;
        cchar = getChar()
      }
      ccharn --
      return number;
    }

    if (cchar == '?') {
      cchar = getChar()
      if (cchar == '?') {
        return '??'
      }
      else {
        ccharn --
        return '?'
      }
    }

    if (isLetter(cchar)) {
      let literal = '';
      while (cchar != ' ' && cchar != ')' && cchar != '\n' && cchar != 'EOF') {
        literal += cchar;
        cchar = getChar()
      }
      ccharn --
      return literal;
    }

    return cchar
  }

  function isVariable(str) {
    return str != 'EOF' && isLetter(str[0])
  }

  function isNumber(str) {
    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(str[0])
  }

  function isString(str) {
    return str[0] == '"'
  }

  function procCode() {
    let result = ''
    let token = getToken()
    while (token != 'EOF') {
      token = getToken()
      if (token == '?') {
        token = getToken()
        if (token == '\n') {
          indentl --
          result += indent() + '}\n'
        }
        else {
          result += indent() + 'if (' + procCall(token, false) + ') {\n'
          indentl ++
        }
      }
      else if (token == '~') {
        token = getToken()
        if (token == '\n') {
          indentl --
          result += indent() + '}\n'
        }
        else {
          result += indent() + 'while (' + procCall(token, false) + ') {\n'
          indentl ++
        }
      }
      else if (token == '-') {
        result += indent() + procCall(getToken(), false) + '\n'
      }
      else if (isVariable(token)) {
        varname = token

        // track variable
        let pre = ''
        if (!vars.includes(varname)) {
            pre = 'let '
            vars.push(varname)
        }

        token = getToken()
        if (isNumber(token)) {
          result += indent() + pre + varname + ' = ' + token + '\n'
        }
        else if (isString(token)) {
          result += indent() + pre + varname + ' = ' + token + '\n'
        }
        else if (token === '[') {
          result += indent() + pre + varname + ' = ' + '[' + procArray() + ']\n'
        }
        else if (token === '(') {
          token = getToken()
          result += indent() + pre + varname + ' = ' + procCall(token, true) + '\n'
        }
        else {
          result += indent() + pre + varname + ' = ' + procCall(token, false) + '\n'
        }
      }
      else if (token == ':') {
        // close prev function
        if (indentl != 0) {
          indentl = 0
          result += '}\n\n'
        }
        // init var tracking
        vars = []
        result += indent() + procFunc()
        indentl ++
      }
      else if (token == '<') {
        token = getToken()
        if (isNumber(token)) {
          result += indent() + ' return ' + token + '\n'
        }
        else if (isString(token)) {
          result += indent() + 'return ' + token + '\n'
        }
        else if (isVariable(token)) {
          result += indent() + 'return ' + token + '\n'
        }
        else {
          result += indent() + 'return ' + procCall(token, false) + '\n'
        }
      }
      else if (token == 'EOF') {
        indentl = 0
        result += '}\n\n'
      }
    }
    return result
  }

  function procArray() {
    let token = getToken()
    let tokens = []
    while (token != ']') {
      if (token == '[') {
        tokens.push('['+procArray()+']')
      }
      else {
        tokens.push(token)
      }
      token = getToken()
    }

    return tokens.join(', ')
  }

  function procFunc() {
    let funcName = getToken()

    let params = []

    let token = getToken()
    while (token != '\n') {
      params.push(token)
      token = getToken()
    }

    return 'function ' + funcName + '(' + params.join(', ') + ') {\n'
  }

  function opSust(src) {
    for (let key in ops) {
      if (ops[key]['src'] == src) {
        return ops[key]['dest']
      }
    }
    return null
  }

  // ewp: end with parenthesis
  function procCall(firstToken, ewp) {

    const funcName = firstToken

    // proc call param

    const params = []

    token = getToken()
    let tope = 0
    while ((!ewp || token != ')') && (ewp || token != '\n') && token != 'EOF') {
      if (isNumber(token)) {
        params.push(token)
      } else if (isString(token)) {
        params.push(token)
      } else if (isVariable(token)) {
        params.push(token)
      } else if (token == '(') {
        params.push(procCall(getToken(), true))
      }
      token = getToken()
    }

    let operator = opSust(funcName)
    if (operator != null) {
      let operation = params.join(' ' + operator + ' ')
      if (ewp) {
        operation = '(' + operation + ')'
      }
      return operation
    }

    return funcName + '(' + params.join(', ')  + ')'
  }

  echo(input)
  echo('')
  echo('-------------------')
  echo('')
  echo(procCode())


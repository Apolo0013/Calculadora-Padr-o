class ValidaEntrada{
    constructor(ContaAtual, entrada) {
        this.ContaAtual = ContaAtual
        this.Entrada = entrada
    }


    AntercessorStr() {
        let Antercessor = null // ver o antercessor
        if (this.ContaAtual.length >= 2) { // se for maior que 2, precisa fatia
            Antercessor = this.ContaAtual.slice(this.ContaAtual.length - 1, this.ContaAtual.length)
        }
        else { // senao, ou seja ele é o antercessor.
            Antercessor = this.ContaAtual // ele é o primeiro caracter entendeu?
        }
        return Antercessor
    }


    Eoperador(caracter) {
        let Operadores = ['-', '+', 'x', '÷', '^']
        for (let opera of Operadores) {
            if (opera == caracter) {
                return true
            }
        }
        return false
    }


    SplitNum(conta) {            
        let EoperadorFun = (caracter) => {
            let Operadores = ['-', '+', 'x', '÷', '^']
            for (let opera of Operadores) {
                if (opera == caracter) {
                    return true
                }
            }
            return false
        }


        let ParamOperador = () => {
            for (let num of conta) {
                if (EoperadorFun(num)) {
                    return true
                }
            }
            return false
        }


        let ListaNew = []
        let caractere = conta
        let caracateretemp = ''
        if (!ParamOperador()) {
            return [caractere]
        }
        else {
            let Cont = 0
            for (let numero of caractere) {
                Cont ++
                if (EoperadorFun(numero) || Cont == caractere.length) {
                    if (Cont == caractere.length) {
                        if (!EoperadorFun(numero)) {
                            caracateretemp += numero
                        }
                        ListaNew.push(caracateretemp)
                    }
                    else {
                        ListaNew.push(caracateretemp)
                        caracateretemp = ''
                    }
                }
                else {
                    caracateretemp += numero
                }
            }
            return ListaNew
        }
    }


    ValidaNumero() {
        let regex = /^(?!0\d)\d+$/

        if (regex.test(this.ContaAtual + this.Entrada)) {
            return this.ContaAtual + this.Entrada
        }   
        else {
            return this.ContaAtual
        }
    }


    Operador() {
        Acumulador += this.ContaAtual 
        if (this.SplitNum(Acumulador).length == 2) {
            let Calculado = new Calcular(Acumulador).Calcular()
            Acumulador = ''
            Acumulador += Calculado + this.Entrada
            DisplayAcu.innerText = Acumulador
            Display.innerText = this.ContaAtual
            Conta = ''
        }
        else {
            console.log('Con 2')
            Display.innerText = this.ContaAtual
            Acumulador = this.ContaAtual + this.Entrada
            DisplayAcu.innerText = Acumulador
            Conta = ''
        }
    }

}


class Calcular{
    constructor(Conta) {
        this.Conta = Conta
    }


    AntercessorStr() {
        let Antercessor = null // ver o antercessor
        if (this.Conta.length >= 2) { // se for maior que 2, precisa fatia
            Antercessor = this.Conta.slice(this.Conta.length - 1, this.Conta.length)
        }
        else { // senao, ou seja ele é o antercessor.
            Antercessor = this.Conta // ele é o primeiro caracter entendeu?
        }
        return Antercessor
    }


    ValidoPraCalcular() {
        if (this.Conta.length >= 1) {
            let Anter = this.AntercessorStr()
            return !this.Eoperador(Anter) && Anter != ','
        }
        else {
            return false
        }
    }


    Eoperador(caracter) {
        let Operadores = ['-', '+', 'x', '÷', '^']
        for (let opera of Operadores) {
            if (opera == caracter) {
                return true
            }
        }
        return false
    }


    TemOperador() {
        for (let num of this.Conta) {
            if (this.Eoperador(num)) {
                return true
            }
        }
        return false
    }


    StartNaN() { // funcao que ver se o usuario nao digitou nada sei la
        if (this.Conta.length >= 1) {
            return false
        }
        return true
    }


    Calcular() {
        let ContaFormatada = this.Conta.replace('x', '*',).replace('÷', '/').replace('**').replace(',', '.')
        console.log(ContaFormatada)
        let evalute = new Function('return ' + ContaFormatada)
        let Resultado = String(evalute()).replace('.', ',')
        return Resultado
    }

}



//Ids botoes
//Id botoes numreos 
let Numeros = [
    'num0',
    'num1',
    'num2',
    'num3',
    'num4',
    'num5',
    'num6',
    'num7',
    'num8',
    'num9'
]
//Operadores basicos
let OperadorBasic = [
    'divisao',
    'multi',
    'sub',
    'adicao',
]

//id dos back 
let BackSpace = ['ac','back']

//Display
const Display = window.document.querySelector('.conta')
const DisplayAcu = window.document.querySelector('.Acumulador')
//variaevl contas
let Acumulador = '' // ele vai guardar o aculativo, Como assim? exemplo:
//se o usuario digitar 10 e depois um operador. essa varivel vai puxar o mesmo, e junta com o operador.
//certo? E quando o usuario digitar outro numero e digitar outro operador ele vai faz o calculo dos 2 certo?
//E vai guardar, vai fica nessa variavel, e assim por diante, se ele digitar 
let Conta = '' // Conta é o numero que estara no display certo?

//Apagando paeeeeeeeeeeeeeeee
for (let element of BackSpace) {
    window.document.getElementById(element).addEventListener('click', function () { //add os eventos no back
        let OperadorBack = (back) => {
            for (let op in ['-', '+', 'x', '÷', '^']) {
                if (op == back) {
                    if (!Trocaram) {
                        Trocaram = true
                    }
                    else {
                        Trocaram = false
                    }
                }
            }

        }
        let opcao = this.id // pegando o id pra diferencia os dois
        if (Conta.length >= 1) {
            if (opcao == 'back') { // se for back, sabemos que  ele so vai retirar o ultimo caractere
                if (Conta.length >= 2) { // caso ele for maior ou igual a 2, vamos fatia
                    let back = Conta.slice(0, Conta.length - 1) // fatiando, o primeiro caractere ate o penultimo
                    OperadorBack(Conta.slice(Conta.length - 1 , Conta.length))
                    Conta = back // dando o valor de back pra a conta
                    Display.innerText = Conta // dando valor do display, texto do display, de Conta, que tem o valor do back
                }
                else { // senao, que dizer que ele so tem um entao vamos aligiza, dando um clear tootal igual do AC
                    Display.innerText = '0'
                    Conta = ''
                }
            }
            else if (opcao == 'ac') { // se  for AC, tiramos tudo clear total
                Conta = '' // conta sera um string vazia
                Display.innerText = '0' // display tera o valor de zero, o 0, nao faz parte da conta, apenas style
            }
            else { //  algo deu muito errado aqui.
                console.log('algo deu errado paeeeeeee')
            }
        }
    }
    )
}

//Numeros
for (let element of Numeros) {
    window.document.getElementById(element).addEventListener('click', function () {// pegando a lista de ids do botoes numeros
        Conta = new ValidaEntrada(Conta, this.textContent).ValidaNumero() // chamand a class de ValidaEntrada
        Display.innerText = Conta
    })
}

//Operadores Basicos
for (let element of OperadorBasic) {
    window.document.getElementById(element).addEventListener('click', function () {
        new ValidaEntrada(Conta, this.textContent).Operador()
    })
}

//Vigula
window.document.getElementById('vigula').addEventListener('click', function () {
    Conta = new ValidaEntrada(Conta, ',').ValidaValorRegex()
    Display.innerText = Conta

})


//Operadores Avançados
//AoQuadrado
//Elevação
//Raiz
//Raiz AoQuadrado

// ---AoQuadrado
window.document.getElementById('quadrado').addEventListener('click', function () {
    Conta = new Calcular(Conta).AoQuadrado()
    if (Conta == '') {
        Display.innerText = '0'
        return
    }
    Display.innerText = Conta
})

// ---Elevação
window.document.getElementById('elevação').addEventListener('click', function () {
    Conta = new ValidaEntrada(Conta, this.textContent).Operadores()
    Display.innerText = Conta
    }
)

// --Raiz
window.document.getElementById('raizq').addEventListener('click', function () {
    Conta = new Calcular(Conta).RaizQuadrada()
    if (Conta == '') {
        Display.innerText = '0'
        return
    }
    Display.innerText = Conta
})

// --Raiz AoQuadrado
window.document.getElementById('RaizAoquadrado').addEventListener('click', function () {
    Conta = new Calcular(Conta).RaizQuadraoAoQuadrado()
    if (Conta == '') {
        Display.innerText = '0'
        return
    }
    Display.innerText = Conta
})

//Troca de sinal pae
let Trocaram = false
window.document.getElementById('trocasinal').addEventListener('click', function () {
    Conta = '-20x20^-20+20'
    Conta = new Calcular(Conta).TrocaSinal()
    Display.innerText = Conta
})

//igual Fazer o calculo
window.document.querySelector('#igual').addEventListener('click', function () {
    Conta = new Calcular(Conta).Calcular()
    Display.innerText = Conta
})


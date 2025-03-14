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


    ValidaValorRegex() {
        let NumerosArray = this.SplitNum(this.ContaAtual + this.Entrada)
        let NumTarget = NumerosArray[NumerosArray.length - 1]
        let regex = /^[-]?(0|[1-9]\d*)(,\d*)?([+\-*/^](0|[1-9]\d*)(,\d*)?)*$/
        let Valida = regex.test(NumTarget)
        
        if (Valida) {
            return this.ContaAtual + this.Entrada
        }
        else {
            return this.ContaAtual
        }
        
    }


    Operadores() {
        if (this.ContaAtual.length >= 1) {
            let Antercessor = this.AntercessorStr()
            if (Trocaram) {
                Trocaram = false
            }
            else {
                Trocaram = true
            }
            Trocaram = false
            if (this.Eoperador(Antercessor) || Antercessor == ',') {
                return this.ContaAtual
            }
            else {
                return this.ContaAtual + this.Entrada
            }
        }
        else {
            return this.ContaAtual
        }
    }
    
    
}


class Calcular{
    constructor(Conta, Entrada) {
        this.Conta = Conta
        this.Entrada = Entrada
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

    TrocaSinal() {
        if (this.StartNaN()) { return this.Conta }
        if (this.ValidoPraCalcular() && !this.TemOperador() || true) {
            

                
            //basicamente, eu irei splita todos os numero e mudar o sinal dele
            let Numeros = new ValidaEntrada().SplitNum(this.Conta) // splitando os numeros
            let OneCaractere = Numeros[Numeros.length - 1].slice(0, 1)
            if (OneCaractere == '-') {
                
            }
            else {

            }
        }
        else {
            return this.Conta
        }
    }

    
    AoQuadrado() {
        if (this.StartNaN()) {return this.Conta}
        if (this.ValidoPraCalcular() && !this.TemOperador()) {
            let conta = Number(this.Conta)
            return String(conta * conta)
        }
        else {
            return this.Conta
        }
    }


    RaizQuadrada() {
        if (this.StartNaN()) {return this.Conta}
        if (this.ValidoPraCalcular() && !this.TemOperador()) {
            return String(Number(this.Conta) ** 0.5)
        }
        else {
            return this.Conta
        }
    }


    RaizQuadraoAoQuadrado() {
        if (this.StartNaN()) {return this.Conta}
        if (this.ValidoPraCalcular() && this.TemOperador()) {
            let resultado = this.AoQuadrado(this.RaizQuadrada(Number(this.Conta)))
            return String(resultado)
        }
        else {
            return this.Conta
        }
    }


    Calcular() {
        let Resultado = () => {
            console.log(this.Conta)
            let ContaFinal = String(this.Conta).replace('x', '*').replace('÷', '/').replace(',', '.').replace('^', '**')
            console.log(ContaFinal)
            let Calculo = new Function('return ' + ContaFinal)
            let Resultado = Calculo()
            return String(Resultado).replace('.', ',')
        }

        console.log(this.ValidoPraCalcular())
        if (this.ValidoPraCalcular()) {
            console.log('foi chamado pae')
            return Resultado()
        }
        else {
            console.log('teu cu gld')
            return this.Conta
        }
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
let Conta = '' // é a string que vai guardar a conta

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
        Conta = new ValidaEntrada(Conta, this.textContent).ValidaValorRegex() // chamand a class de ValidaEntrada
        Display.innerText = Conta
    }
    )
}

//Operadores Basicos
for (let element of OperadorBasic) {
    window.document.getElementById(element).addEventListener('click', function () {
        Conta = new ValidaEntrada(Conta, this.textContent).Operadores()
        if (Conta == '') {
            Display.innerText = '0'
            return
        }
        Display.innerText = Conta
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


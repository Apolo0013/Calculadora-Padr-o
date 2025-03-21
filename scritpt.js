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

    //Tem uma virgula no final?
    VirgulaEnd(numero) {
        if (numero.length == 0) { return } // se nao tive porrada nenhuma ainda ele simplemente, vai retorna nada
        let valor = null
        if (numero.length == 1) {
            valor = numero
        }
        else {
            valor = numero.slice(numero.length - 1, numero.length)
        }

        if (valor == ',') { // se o tipo for igual number
            return true
        }
        return false
    }


    ValidaNumero() {
        if (ClearCampo) {
            ClearCampo = false
            Display.innerText = ''
            DisplayAcu.innerText = ''
        }
        

        let regex = /^-?(?!0\d)(\d+)(,\d*)?$/
        
        if (regex.test(this.ContaAtual + this.Entrada)) {
            console.log(this.Entrada)
            return this.ContaAtual + this.Entrada
        }   
        else {
            if (Conta.length == 0) {
                return ''
            }
            return this.ContaAtual
        }
    }


    Operador() {
        function TemNum(num) { // funcao:
            /////////////////////////////////////////////////////////////////////////
            //oque ele faz?: ele verificar se um o utlimo caractere é numero ou nao
            //Param: num = uma string.
            //retorno: false or true
            // true = sim tem numero
            // false = nao tem numero
            /////////////////////////////////////////////////////////////////////////
            let end = ''// variavel que vai guardar o ultimocaractere paeeeee
            if (num.length == 1) { // se num tive somente um caractere
                end = num // guardando num, por ter um, ele é o ultimo caractere ao mesmo tempo o primeiro
            }
            else {
                end = num.slice(num.length - 1, num.length) // pegando o ultimo caracatere
            }
            for (let n of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']) {
                if (n == end) { // se end for === alguns desses numero ai de  cima
                    return true //  retorne true: sim tem numero
                }
            }
            return false
        }


        if (TemNum(this.ContaAtual)) {
            //Condicao para alterar o valor da variavel de controle: OporadorNegativo
            if (this.Entrada == '-') {
                OperadorNegativo = true
            }

            if (this.ContaAtual.length >= 1) {
                if (this.Eoperador(Acumulador.slice(Acumulador.length - 1, Acumulador.length))) {
                    Acumulador += Conta
                    let Calculado = new Calcular(Acumulador).Calcular()
                    Acumulador = ''
                    Acumulador += Calculado + this.Entrada
                    DisplayAcu.innerText = Acumulador
                    Display.innerText = this.ContaAtual
                    Conta = ''
                }
                else {
                    console.log('nao')
                    Display.innerText = this.ContaAtual
                    Acumulador = this.ContaAtual + this.Entrada
                    DisplayAcu.innerText = Acumulador
                    Conta = ''
                }
            }
        }
    }


    Igualdade() {
        if (Acumulador != '' && Conta != '' && !this.VirgulaEnd(Conta)) {
            ClearCampo = true
            Acumulador += Conta
            let Calculado = new Calcular(Acumulador).Calcular()
            DisplayAcu.innerHTML = Acumulador + ' ='
            Display.innerText = Calculado
            Acumulador = ''
            Conta = ''
        }
        else {
            console.log('rejeitado')
            console.log('Conta: ' + Conta)
            console.log('Acumulador: ' + Conta)
            console.log('Virgula no final?: ' + this.VirgulaEnd(Conta)? 'Sim': 'Nao')
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

    //Troca de sinal
    TrocaDeSinal() {
        if (Conta.slice(0, 1) == '-') {
            Conta = Conta.slice(1, Conta.length)
        }
        else {
            Conta = '-' + Conta
        }
    }


    MaxCaracte(Conta) { // ele vai trabalhar com as funcoes de baixo, verificando se ele entao fazendo a conta, sem passar do limite pae
        Conta = String(Conta)
        let Contanum = Number(Conta).toFixed(2)
        return String(Contanum).replace('.', ',')
    }


    Quadrado() {
        Conta = this.MaxCaracte(Number(Conta) * Number(Conta))
    }


    RaizQuadrada() {
        Conta = this.MaxCaracte(Number(Conta) ** 0.5)
    }


    RaizCubico() {
        Conta = this.MaxCaracte(Math.cbrt(Number(Conta)))
    }


    Calcular() {
        let ContaFormatada = this.Conta.replace('x', '*').replace('÷', '/').replace('^', '**').replace(',', '.')
        console.log(ContaFormatada)
        let evalute = new Function('return ' + ContaFormatada)
        let Resultado = String(evalute()).replaceAll('.', ',')
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
    'elevação'
]

//id dos back 
let BackSpace = ['ac','back', 'CE']

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
        //Oq cada um dos backspace faz?
        //back normal: remove o ultimo caractere paeeee
        //AC: ele simplemente, da um clera em tudo, como nas variavel: "Conta" e "Acumulador"
        //CE: ele so vai da um clear na variavel Conta, ou seja, apenas no numero que esta sendo digitado
        let opcao = this.id // pegando o id pra diferencia os dois
        if (Conta.length >= 1) {
            if (opcao == 'back') { // se for back, sabemos que  ele so vai retirar o ultimo caractere
                if (Conta.length >= 2) { // caso ele for maior ou igual a 2, vamos fatia
                    let back = Conta.slice(0, Conta.length - 1) // fatiando, o primeiro caractere ate o penultimo
                    Conta = back // dando o valor de back pra a conta
                    Display.innerText = Conta // dando valor do display, texto do display, de Conta, que tem o valor do back
                }
                else { // senao, que dizer que ele so tem um entao vamos aligiza, dando um clear tootal igual do AC
                    Display.innerText = '0'
                    Conta = ''
                }
            }
            else if (opcao == 'CE') {
                Conta = '' //Clear na variavel, o carinho que é manipulado pra se exbido no display
                Display.innerText = '0'
            }
            else { //  algo deu muito errado aqui.
                console.log('algo deu errado paeeeeeee')
            }
        }
        else { // o porque dele esta seperado: ele simples vai deletar tudo, tudo mesmo, no if desse else, so pode se atendido, se a conta for maior ou igual a 1, aqui nao precisa disso paeeeeeeeeeeeee.
            if (opcao == 'ac') { //clear: Conta e Acumulador    
                Conta = '' // conta sera um string vazia
                Acumulador = ''
                DisplayAcu.innerText = Acumulador
                Display.innerText = '0' // display tera o valor de zero, o 0, nao faz parte da conta, apenas style
        
            }
        }
    }
    )
}

//Numeros
for (let element of Numeros) {
    window.document.getElementById(element).addEventListener('click', function () {// pegando a lista de ids do botoes numeros
        if (Conta.length == 16) { // se o numero digitar passa de 16
            return
        }
        Conta = new ValidaEntrada(Conta, this.textContent).ValidaNumero() // chamand a class de ValidaEntrada
        if (Conta == '') {
            Display.innerText = '0'
            return
        }
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
    //a quantidade denumero que o usuario pode digitar.
    if (Conta.length == 16) { return } // se atigir o limite retorne
    console.log('limite nao')
    if (Conta.length == 15) { // ja que o limite é 16, nao pode deixa um virgula no final
        return
    }

    Conta = new ValidaEntrada(Conta, ',').ValidaNumero()
    if (Conta == '') {
        Display.innerText = '0'
        return
    }
    Display.innerText = Conta
})


//Operadores Avançados
//AoQuadrado
//Raiz Quadrada
//iremos trabalha com os operadores "avançados" assim:
// iremos pegar a varivel `Conta` e vamos aplica o operador nele, se o mesmo estive com vingula, vazio ou
//Temos dois como o jeito de exercuta diferete.
const OperadorAva = ['Raizquadrada', 'quadrado', 'RaizCu']
for (let op of OperadorAva) {
    window.document.getElementById(op).addEventListener('click', function () {
        if (Conta == '' || new ValidaEntrada().VirgulaEnd(Conta.slice(Conta.length - 1, Conta.length))) {
            return
        }
        
        Conta = Conta.replace(',', '.')
        let opcao = this.id // pegando o ido do botao digitado para saber de qual operador estamos lidado
        if (opcao == OperadorAva[0]) { // se o botao digitado foi o raiz ao quadrado
            new Calcular().RaizQuadrada()
        } 
        else if (opcao == OperadorAva[1]) { // se o botao digitado for o Ao quadrado
            new Calcular().Quadrado()
        } 
        else if (opcao == OperadorAva[2]) {  // se o botao digitar foi o Raiz Quadrada
            new Calcular().RaizCubico()
        }
        Display.innerText = Conta
    })
}


//Troca de sinal
let OperadorNegativo = false // Variavel de controle, basicamente, ele vai fala: "Olha, um operador subtrair , foi digita, e isso que dizer que nao podemos troca de sinal".
// isso que dizer que nao podemos, troca de sinal, pq ja tem um operador que ja faz esse papel ex:
// -10-11 // O 11 nao pode troca de sinal pra ja tem o operador ocupando essa troca, se fosse possivel:
// -10--10 ficaria assim, dando error em calcular, JavaScript, ver isso como error.

window.document.getElementById('trocasinal').addEventListener('click', () => {
    if (Conta == '' && !OperadorNegativo) {return} // se o Conta estive com nenhum numero, arroche pra retorna assim fazendo que o codigo de baixo nao exercute
    new Calcular().TrocaDeSinal() // Chamanda a class Calcalar e pegando o metedo dele.
    Display.innerText = Conta // a class de cima vai alterar
})


// igualdade
let ClearCampo = false // sera pra saber se o usuario fez a igualdade pra nois limpar depois que ele digitar outro numero pae fdp arrombodo caralho
window.document.querySelector('#igual').addEventListener('click', function () {
    if
    (
        Conta.length >= 1 &&
        new ValidaEntrada().Eoperador(Acumulador.slice(Acumulador.length - 1, Acumulador.length))
    )
    {
        new ValidaEntrada().Igualdade()
    }
})

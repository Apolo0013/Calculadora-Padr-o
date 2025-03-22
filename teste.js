async function APIGet(id) {
    return new Promise((res, rej) => {
        let dados = {
            'Maria': { id: 1, idade: 23, sexo: 'F' },
            'João': { id: 2, idade: 23, sexo: 'M' },
            'Felipe' : { id: 3, idade: 23, sexo: 'M'}
        }
        setTimeout(() => {  
            for (let info of Object.entries(dados)) {
                if (info[1].id == id) {
                    res(info)
                }
            }
            rej('Nenhuma Usuario foi encontrado com o id: ' + id)
    }, 1000)
    })
}

async function main() {
    try {
        let resultado = await APIGet(1)
        console.log(resultado)
    } catch (error){
        console.log(error)
    }
}

main()
console.log('hola mundo')
console.log('pruebas para codigo cesar')

// Abecedario español (27 letras, con ñ)
const abecedario = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

// Alfabeto inglés (26 letras, sin ñ)
const alfabeto = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

//let texto = 'XWDAUAVSVWK WFUGFLJSKLW DS HSDSTJS'
//let texto = `Tfs p ñp tfs, ftb ft mb dvftujóñ.`
let texto = `kz ltrz cd kz czmyz`
let texto2 = texto.toLowerCase()
// let posibCodig= ''
function encontrarDesplazamientoCesarEspaniol( tex , alfabeto){
    
    for (let i = 0 ; i< alfabeto.length ; i++ ){
        let posibCodig= '' //segun cluade va aca
        
        for (let j = 0 ; j< tex.length ; j++ ){
            
            let indice = alfabeto.indexOf(tex[j]);
            // posibCodig+= alfabeto[ indice+i]

             if (indice === -1) { // por que si es -1 no lo encontro en el abecedario
                 posibCodig += tex[j]             // espacios y símbolos se dejan igual(si es en ingles no cambia la ñ y la deja)
            } else {
                posibCodig += alfabeto[(indice + i) % alfabeto.length]
            }

        }

        //console.log(`posble texto: `, posibCodig)
        //console.log(`con desplazamiento:`, i ,`\n`)
        // let posibCodig= ''
        console.log(`posble texto: `, posibCodig, `| con desplazamiento:`, i ,` lugar hacia la derecha\n`)
    }

}

function cifradocesar (codigo, desplazamiento  ){
    console.log('falta escribir el codigo')
}



console.log(`\n \n con el alfabeto en español \n\n`)
encontrarDesplazamientoCesarEspaniol( texto2, abecedario)   // para alfabetos con la letra ñ
console.log(`\n \n con el alfabeto en ingles \n\n`)
encontrarDesplazamientoCesarEspaniol( texto2, alfabeto)     // para alfabetos sin la letra ñ 
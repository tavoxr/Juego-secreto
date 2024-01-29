/* se coloca todo en una funcion para hacerlo mas dinamico
const titulo  = document.querySelector("#titulo");
const textoParrafo = document.querySelector("Escoge un n&uacute;mero del 1 al 10.");
titulo.innerHTML = "Juevo del numero secreto";
textoParrafo.innerHTML = "Escoge un n&uacute;mero del 1 al 10.";
*/
let numSecreto = 0;
let intentos =0;

let numerosSorteados = [];

let btnReiniciar = document.querySelector("#reiniciar");

function asignarTextoElemento(nombreElemento,texto){
    const elemento  = document.querySelector(`${nombreElemento}`);
    elemento.innerHTML = texto;
}


function limpiarCampo(nombreElemento){
    document.querySelector(nombreElemento).value = "";
}


function verificacionDeUsuario(){
    let inputNumUsuario = document.querySelector(".container__input");
    let numUsuario = Number.parseInt(inputNumUsuario.value);

//    console.log("numUsuario: " , numUsuario);
//    console.log("intentos",intentos);

    if(numUsuario == numSecreto){
        asignarTextoElemento(".texto__parrafo",`Acertaste el numero en ${intentos} ${intentos > 1 ? "veces" : "vez"}.`);
        btnReiniciar.removeAttribute("disabled");
    }else{  
        
        if(numUsuario > numSecreto){
            asignarTextoElemento(".texto__parrafo", "No acertaste, el numero secreto es menor");
        }else{
            asignarTextoElemento(".texto__parrafo","No acertaste, el numero secreto es mayor");
        }

        //cantidad de intentos
        intentos++;
        limpiarCampo(".container__input");    
    }
}


function condicionesIniciales(){
    // Se asignan los textos de pantalla Iniciales
    asignarTextoElemento("#titulo","Juevo del numero secreto."); // Titulo
    asignarTextoElemento(".texto__parrafo","Escoge un n&uacute;mero del 1 al 10."); // Instrucciones

    // Se genera y asigna numero aleatorio secreto
    numSecreto = generarNumeroAleatorioPorRango(10,5);

    // Se asigna valor inicial 1 al numero de intentos
    intentos = 1;

}

function iniciarJuegoNuevo(){

    // Paso #1 Generar nuevo numero secreto
    // Paso #2 volver contador de intentos a numero inicial 1
    // Paso #3 Cambiar texto de parrafo para inicio del juego
    condicionesIniciales();

    // Paso #4 Limpiar input
    limpiarCampo(".container__input");

    //Paso #5 Deshabilitar de nuevo el boton "nuevo juego"
    btnReiniciar.setAttribute("disabled",'');
    
}

// crear funcion para generar numero aleatorio por rango
function generarNumeroAleatorioPorRango(numMax,numMin){

    let numeroSorteado = Math.floor(Math.random()*((numMax+1)-numMin)+numMin);

    //console.log(numeroSorteado);
    //console.log(numerosSorteados);
    //console.log(numMax);

    // si ya sorteamos todos los numeros
    //console.log("length: ", numerosSorteados.length);
    //como en mi caso cree una funcion que permite generar numeros por rangos debo colocar que la recursividad se rompa
    //cuando el largo del arreglo sea igual al maximo de numeros posibles a utilizar entre el rango que se obtiene restando el numMaximo menos el numMinimo
    // le coloco +1 porque el rango esta incluido el numero maximo y minimo y el length del array empieza en 0 
    if(numerosSorteados.length == ((numMax +1)-numMin)){

        asignarTextoElemento(".texto__parrafo","Ya se sortearon todos los numeros posibles.");

    }else{

        if(numerosSorteados.includes(numeroSorteado)){
            // usamos la recursividad para llamar un nuevo numero

            return generarNumeroAleatorioPorRango(numMax,numMin);
        }else{
            numerosSorteados.push(numeroSorteado);
            return numeroSorteado;
        }

    }
    
    /*
    for(let i =0; i < numerosSorteados.length; i++){
        if(numeroSorteado == numerosSorteados[i]){   
            numeroSorteado = Math.floor(Math.random()*((numMax+1)-numMin)+numMin);
            // console.log(numerosSorteados[i]);
        }
    }
    numerosSorteados.push(numeroSorteado);
    */

    //console.log("Numero Sorteado: ", numeroSorteado );
    //console.log(numerosSorteados);

   
}




//Inicio de programa
condicionesIniciales();

console.log("numAleatorio ",numSecreto);

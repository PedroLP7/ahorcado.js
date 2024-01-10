

let transportes = ['Avion', 'Barco', 'Globo', 'Bicicleta', 'Coche', 'Tren', 'Barca', 'Helicoptero', 'Patinete', 'Submarino'];


let animales = ['Elefante', 'Jirafa', 'Tigre', 'Leon', 'Mariposa', 'Ballena', 'Delfin', 'Mono', 'Tortuga', 'Canguro'];


let lugares = ['Monte', 'Playa', 'Isla', 'Selva', 'Desierto', 'Piramide', 'Castillo', 'Ciudad', 'Parque', 'Espacio'];




 let word;  //elige la palabra random y la guarda en una variable
 let success=0;
 let misses=0;
 let lettersUsed=[];
 let divjuego = document.querySelector('.juego');
 let windiv=document.createElement('div');
 let loserDiv = document.createElement('div');
 let hangman=document.createElement('div');
 let nombreusuario = document.getElementById('inputname');
 let nombreusu = nombreusuario.value;    
 let tiempo=0;
 let pista;
 const erroresMaximos =7;
 
setCookie('username', nombreusu, 1);

 loadGame();
 

 
 if (!word) {
    let arraySeleccionado=selectRandomArray([transportes,animales,lugares]);
words=arraySeleccionado;
if (transportes === words) {
    setCookie('categoria', 'transportes', 1);
   
    pista='transportes';
    
    console.log(pista);
    
}else if (words === animales) {

    pista='animales';
    setCookie('categoria', 'animales', 1);
    console.log(pista);
}
else if (words === lugares) {
    
    setCookie('categoria', 'lugares', 1);
    pista='lugares';
    console.log(pista);

}
 

    // createTimer();
     word = selectRandomWord(words);
     setCookie('chosenWord', word, 1);
     createElementWord(word);   //crea el div de la palabra y las letras :D

  createPistaDiv();

     createhangman(); //crea el div del ahorcado
    createdivusedletters(lettersUsed);  // crea el div donde se va a guardar las letras usadas
  
  
     createButtons(); //crea los botones de las letras
    // createWinDiv(); //crea el div de fin de juego
    // createLoseDiv(); //crea el div de fin de juego
 updateTimer();

}
// createPistaDiv();




 function createTimer(){
    
    let timer=document.createElement('div');
    timer.classList.add('timer');
    timer.innerText=tiempo;
    divjuego.appendChild(timer);
    
 }
 function updateTimer(){
    setCookie('tiempo', tiempo, 1);
    let timer=document.querySelector('.timer');
    timer.innerText=tiempo;
    tiempo++;
    setTimeout(updateTimer,1000);
 }

 



function createElementWord(word) {
    let palabra = document.createElement('div');
    
    // palabra.innerText = word;
    palabra.classList.add('word');




    for (let i = 0; i < word.length; i++) {
        let letter = document.createElement('div');
        letter.id = 'letter_' + i;
        letter.classList.add('letter');
        letter.innerText = word[i];
        palabra.appendChild(letter);
        
    }
    
   divjuego.appendChild(palabra);
 
  }
function selectRandomWord(words) {
    let index = Math.floor(Math.random() * words.length);
    console.log(words[index]);
    return words[index];
}

function checkletter(input) {
    
    let acierto = false;
    let inputLetter = input.toLowerCase();
    let letters = document.querySelectorAll('.letter');
    let wordSize = word.length;

    if (inputLetter === '') {
        return false;
    } else {
        for (let i = 0; i < letters.length; i++) {
            if (letters[i].innerText.toLowerCase() === inputLetter) {
                letters[i].classList.remove('letter');
                letters[i].classList.add('lettersolved');
                acierto = true;
            }
        }

        lettersUsed.push(inputLetter);
        updateDivUsedLetters();
        console.log(lettersUsed);

        if (acierto) {
            
            
            
            setCookie('GuessedLetters', lettersUsed.join(','), 1);
            // Incrementar el contador de aciertos por cada ocurrencia de la letra acertada
            const occurrences = Array.from(letters).filter(letter => letter.classList.contains('lettersolved')).length;
            success += occurrences;
            console.log('aciertos: ' + success);
            setCookie('successfulGuesses', success, 1);
        } else {
            misses++;
            setCookie('GuessedLetters', lettersUsed.join(','), 1);
            setCookie('missesguesses', misses, 1);
            updatehangman(misses);
            console.log('fallos: ' + misses);
        }

        if(success === wordSize){    // meter aqui funcion para acabar el jueguito
            console.log('¡Has ganado!');
            createWinDiv();
            showWinDiv();
        }
        if (misses === erroresMaximos) {
            console.log('¡Has perdido! antonio');
            createLoseDiv();
            showLoserDiv();
        }
       

       
    }
}


function createdivusedletters(lettersUsed){
    let usedletters=document.createElement('div');
    usedletters.classList.add('usedletters');
    usedletters.innerText='Letras usadas: ' + lettersUsed;
    divjuego.appendChild(usedletters);
}
function updateDivUsedLetters() {
    let usedLettersDiv = document.querySelector('.usedletters');
    usedLettersDiv.innerText ='Letras usadas: ' + lettersUsed.join(', ');
}



function createhangman(){
    
    hangman.classList.add('hangman');
    hangman.innerHTML = `

    ------
    |    
    |   
    |   
    |   
    |
    ---------
       
   `;
    divjuego.appendChild(hangman);
}

function updatehangman(misses){
    


    switch(misses){
    
    
  

     case 1 :  hangman.innerHTML = 
     `

    ------
    |    |
    |   
    |   
    |   
    |
    ---------
   `;
   break;



    case 2 :  hangman.innerHTML = 
    `

    ------
    |    |
    |    O
    |     
    |   
    |
    ---------
   `;
   break;


   case 3:  hangman.innerHTML = 
   `

    ------
    |    |
    |    O
    |    |
    |   
    |
    ---------
   `;
 break;
 
 case 4:  hangman.innerHTML = 
 `

    ------
    |    |
    |    O
    |   /|
    |   
    |
    ---------
    `;
break;


case 5:  hangman.innerHTML = 

`

    ------
    |    |
    |    O
    |   /|\\
    |   
    |
    ---------
    `;
break;

case 6 :  hangman.innerHTML = 
`

    ------
    |    |
    |    O
    |   /|\\
    |   /
    |
    ---------
    `;
break;
 
case 7 :  hangman.innerHTML = 

`

    ------
    |    |
    |    O
    |   /|\\
    |   / \\
    |
    ---------
    `;      




    
}

}

function startGame(){
    let start = document.querySelector('.start');
    start.style.display='none';
   
    
    
    start.classList.add('hide');
    divjuego.classList.remove('hide');
    divjuego.classList.add('show');


}


function createButtons(){
    for (let letra = 65; letra <= 90; letra++) {
        let letraChar = String.fromCharCode(letra);

        let newbutton = document.createElement("button");
        newbutton.classList.add('button'+letraChar);
        newbutton.classList.add('buttonsleters');
        newbutton.textContent = letraChar;
        if (lettersUsed.includes(letraChar.toLowerCase())) {
            newbutton.disabled = true;
        }


        newbutton.addEventListener('click', function() {
            checkletter(letraChar);
            newbutton.disabled=true;
        });
        

        divjuego.appendChild(newbutton);



}
}


function createWinDiv(){
    let ruta = selectImage();
    console.log(ruta);
    
    
    windiv.classList.add('hide');
    windiv.classList.add('finales');
    windiv.innerHTML=`
    <h1>¡HAS GANADO!</h1>
    <p>La palabra era: ${word} y has tardado ${tiempo} segundos  en completarlo</p>
    <img src="${ruta}" alt="ruta" class="imagenfinal">

    <button  class="finalbuttons"onclick=" cleancookies();location.reload()">Volver a jugar</button>
    `;
    document.body.appendChild(windiv);
}

function showWinDiv(){
    
    divjuego.classList.remove('show');
    divjuego.classList.add('hide');
    windiv.classList.remove('hide');
    windiv.classList.add('show');
    // cleancookies();
    
    
}


function createLoseDiv(){
    let ruta = selectImage();
    console.log(ruta);
    
  
    loserDiv.classList.add('hide');
    loserDiv.classList.add('finales');
    loserDiv.innerHTML=`
    <h1>¡HAS PERDIDO!</h1>
    
    <p>La palabra era: ${word.toUpperCase()}, intentalo otra vez!</p>
    <img src="${ruta}" alt="ruta" class="imagenfinal">
    <button  class="finalbuttons" onclick="location.reload()">Volver a jugar</button>
    `;

    document.body.appendChild(loserDiv);
}

function showLoserDiv(){
    
    divjuego.classList.remove('show');
    divjuego.classList.add('hide');
    loserDiv.classList.remove('hide');
    loserDiv.classList.add('show');
    // cleancookies();
   
}
   

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}








function loadGame() {
    createTimer();
    // Verificar si existen cookies relevantes
    let chosenWord = getCookie('chosenWord');
    let guessedLetters = getCookie('GuessedLetters');
    let successfulGuesses = parseInt(getCookie('successfulGuesses')) || 0;
    let missesguesses = parseInt(getCookie('missesguesses')) || 0;
    let tiempocokie = parseInt(getCookie('tiempo')) || 0;
    let pistacookie = getCookie('categoria');

    // Si hay datos guardados, actualizar las variables del juego
    if (chosenWord && guessedLetters !== null && !isNaN(successfulGuesses) && !isNaN(misses)) {
        word = chosenWord;
        lettersUsed = guessedLetters.split(',');
        success = successfulGuesses;
        misses = missesguesses;
        tiempo = tiempocokie;
        pista = pistacookie;
        
        // Actualizar elementos en la interfaz según los datos cargados
        createElementWord(word);   //crea el div de la palabra y las letras :D


        createPistaDiv();
        createhangman(); //crea el div del ahorcado
        createdivusedletters(lettersUsed);  // crea el div donde se va a guardar las letras usadas
        updatehangman(misses);
        
        
        createButtons(); //crea los botones de las letras
        // createWinDiv(); //crea el div de fin de juego
        // createLoseDiv(); //crea el div de fin de juego
        
        updateTimer();
        const letters = document.querySelectorAll('.letter');
        for (let i = 0; i < letters.length; i++) {
            if (lettersUsed.includes(letters[i].innerText.toLowerCase())) {
                letters[i].classList.remove('letter');
                letters[i].classList.add('lettersolved');
            }
        
    }
    }
}
function cleancookies() {
    const domain = window.location.hostname;
    console.log(domain);

    document.cookie = 'chosenWord=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain + '; SameSite=None; Secure';
    document.cookie = 'GuessedLetters=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain + '; SameSite=None; Secure';
    document.cookie = 'missesguesses=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain + '; SameSite=None; Secure';
    document.cookie = 'successfulGuesses=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain + '; SameSite=None; Secure';
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain + '; SameSite=None; Secure';
    document.cookie = 'tiempo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain + '; SameSite=None; Secure';
    document.cookie = 'categoria=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain + '; SameSite=None; Secure';

    loadGame();
}



function createPistaDiv(){

    let pistadiv=document.createElement('div');
    pistadiv.classList.add('pista');
    pistadiv.innerText='Pista: ' + pista.toUpperCase();
    divjuego.appendChild(pistadiv);
}

function selectRandomArray(array) {
    let index = Math.floor(Math.random() * array.length);
    console.log(array[index]);
   
    return array[index];
}




function selectImage() {
    // objeto que une las palabras con las imagenes
    const imgsrc = {
        'avion': './img/avion.png',
        'barco': './img/barco.png',
        'globo': './img/globo.png',
        'bicicleta': './img/bicicleta.png',
        'coche': './img/coche.png',
        'tren': './img/tren.png',
        'barca': './img/barca.png',
        'helicoptero': './img/helicoptero.png',
        'patinete': './img/patinete.png',
        'submarino': './img/submarino.png',
        'elefante': './img/elefante.png',
        'jirafa': './img/jirafa.png',
        'tigre': './img/tigre.png',
        'leon': './img/leon.png',
        'mariposa': './img/mariposa.png',
        'ballena': './img/ballena.png',
        'delfin': './img/delfin.png',
        'mono': './img/mono.png',
        'tortuga': './img/tortuga.png',
        'canguro': './img/canguro.png',
        'monte': './img/monte.png',
        'playa': './img/playa.png',
        'isla': './img/isla.png',
        'selva': './img/selva.png',
        'desierto': './img/desierto.png',
        'piramide': './img/piramide.png',
        'castillo': './img/castillo.png',
        'ciudad': './img/ciudad.png',
        'parque': './img/parque.png',
        'espacio': './img/espacio.png'
    };

    const lowercaseWord = word.toLowerCase();
    return imgsrc[lowercaseWord];
}

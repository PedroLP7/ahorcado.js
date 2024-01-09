
let words = ['hola', 'mundo', 'desde', 'javascript'];  // array con las palabras


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
setCookie('username', nombreusu, 1);
 loadGame();
 

 // If there's no saved word, select a random word
 if (!word) {
     word = selectRandomWord(words);
     setCookie('chosenWord', word, 1);
     createElementWord(word);   //crea el div de la palabra y las letras :D



     createhangman(); //crea el div del ahorcado
    createdivusedletters(lettersUsed);  // crea el div donde se va a guardar las letras usadas
  
  
     createButtons(); //crea los botones de las letras
    createWinDiv(); //crea el div de fin de juego
    createLoseDiv(); //crea el div de fin de juego






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
            showWinDiv();
        }
        if (misses === 7) {
            console.log('¡Has perdido! antonio');
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
    
    windiv.classList.add('hide');
    windiv.innerHTML=`
    <h1>¡HAS GANADO!</h1>
    <button onclick="location.reload()">Volver a jugar</button>
    `;
    document.body.appendChild(windiv);
}

function showWinDiv(){
    
    divjuego.classList.remove('show');
    divjuego.classList.add('hide');
    windiv.classList.remove('hide');
    windiv.classList.add('show');
    cleancookies();
    
    
}


function createLoseDiv(){
  
    loserDiv.classList.add('hide');
    loserDiv.innerHTML=`
    <h1>¡HAS PERDIDO!</h1>
    <button onclick="location.reload()">Volver a jugar</button>
    `;
    document.body.appendChild(loserDiv);
}

function showLoserDiv(){
    
    divjuego.classList.remove('show');
    divjuego.classList.add('hide');
    loserDiv.classList.remove('hide');
    loserDiv.classList.add('show');
    cleancookies();
   
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




// function disableUsedButtons() {
//     for (let letra of lettersUsed) {
//         const button = document.querySelector('.button' + letra.toLowerCase); // Asegúrate de que la letra esté en minúsculas
//         if (button) {
//             button.disabled = true;
//         }
//     }
// }


function loadGame() {
    // Verificar si existen cookies relevantes
    let chosenWord = getCookie('chosenWord');
    let guessedLetters = getCookie('GuessedLetters');
    let successfulGuesses = parseInt(getCookie('successfulGuesses')) || 0;
    let missesguesses = parseInt(getCookie('missesguesses')) || 0;

    // Si hay datos guardados, actualizar las variables del juego
    if (chosenWord && guessedLetters !== null && !isNaN(successfulGuesses) && !isNaN(misses)) {
        word = chosenWord;
        lettersUsed = guessedLetters.split(',');
        success = successfulGuesses;
        misses = missesguesses;
        
        // Actualizar elementos en la interfaz según los datos cargados
        createElementWord(word);   //crea el div de la palabra y las letras :D



        createhangman(); //crea el div del ahorcado
        createdivusedletters(lettersUsed);  // crea el div donde se va a guardar las letras usadas
        updatehangman(misses);
        
        
        createButtons(); //crea los botones de las letras
        createWinDiv(); //crea el div de fin de juego
        createLoseDiv(); //crea el div de fin de juego
        const letters = document.querySelectorAll('.letter');
        for (let i = 0; i < letters.length; i++) {
            if (lettersUsed.includes(letters[i].innerText.toLowerCase())) {
                letters[i].classList.remove('letter');
                letters[i].classList.add('lettersolved');
            }
        // Deshabilitar los botones de letras ya usadas
        // disableUsedButtons();
    }
    }
}
function cleancookies() {
    document.cookie = 'chosenWord=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'GuessedLetters=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'missesguesses=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'successfulGuesses=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    loadGame();
}




let words = ['hola', 'mundo', 'desde', 'javascript'];  // array con las palabras


 let word=selectRandomWord(words);   //elige la palabra random y la guarda en una variable
 let success=0;
 let misses=0;
 let lettersUsed=[];
 let divjuego = document.querySelector('.juego');

createElementWord(word);   //crea el div de la palabra y las letras :D

createdivusedletters(lettersUsed);  // crea el div donde se va a guardar las letras usadas



createhangman(); //crea el div del ahorcado
createButtons(); //crea los botones de las letras

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
            // Incrementar el contador de aciertos por cada ocurrencia de la letra acertada
            const occurrences = Array.from(letters).filter(letter => letter.classList.contains('lettersolved')).length;
            success += occurrences;
            console.log('aciertos: ' + success);
        } else {
            misses++;
            updatehangman(misses);
            console.log('fallos: ' + misses);
        }

        if(success === wordSize){    // meter aqui funcion para acabar el jueguito
            console.log('¡Has ganado!');
        }

        if (inputLetter === word) {
            console.log('¡Has ganado!');
            letters.forEach(letter => {
                letter.classList.remove('letter');
                letter.classList.add('lettersolved');
                success = word.length;
                acierto = true;
                updateDivUsedLetters();
            });
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
document.querySelector('button').addEventListener('click', checkletter);


function createhangman(){
    let hangman=document.createElement('div');
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
    let hangman=document.querySelector('.hangman');


    switch(misses){
    
        case 1 :  hangman.innerHTML = 
        `

    ------
    |    
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
    |   
    |   
    |   
    |
    ---------
   `;
   break;



    case 3 :  hangman.innerHTML = 
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


   case 4:  hangman.innerHTML = 
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
 
 case 5:  hangman.innerHTML = 
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


case 6:  hangman.innerHTML = 

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

case 7 :  hangman.innerHTML = 
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
 
case 8 :  hangman.innerHTML = 

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
    
    start.classList.add('hide');
    divjuego.classList.remove('hide');
    divjuego.classList.add('show');


}


function createButtons(){
    for (let letra = 65; letra <= 90; letra++) {
        let letraChar = String.fromCharCode(letra);

        let newbutton = document.createElement("button");
        newbutton.classList.add('button'+letraChar);
        newbutton.textContent = letraChar;
        newbutton.addEventListener('click', function() {
            checkletter(letraChar);
            newbutton.disabled=true;
        });

        divjuego.appendChild(newbutton);



}
}


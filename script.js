console.log('Hello World');

let words = ['hola', 'mundo', 'desde', 'javascript'];  // array con las palabras


 let word=selectRandomWord(words);   //elige la palabra random y la guarda en una variable
 let success=0;
 let misses=0;
 let lettersUsed=[];

createElementWord(word);   //crea el div de la palabra y las letras :D

createdivusedletters(lettersUsed);  // crea el div donde se va a guardar las letras usadas






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
    
   document.body.appendChild(palabra);
 
  }
function selectRandomWord(words) {
    let index = Math.floor(Math.random() * words.length);
    console.log(words[index]);
    return words[index];
}

function checkletter() {
    let acierto = false;
    let inputLetter = document.querySelector('#inputletter').value.toLowerCase();
    let letters = document.querySelectorAll('.letter');

  if(inputLetter === ''){
    return false;
  } else {

    for (let i = 0; i < letters.length; i++) {
        if (letters[i].innerText.toLowerCase() === inputLetter) {
            letters[i].classList.remove('letter');
            letters[i].classList.add('lettersolved');
            acierto=true;
            
            
        }
        
        }
        lettersUsed.push(inputLetter);
        updateDivUsedLetters(); 
        console.log(lettersUsed);
        

        if(inputLetter===word){
            console.log('has ganado');
            letters.forEach(letter => {
                letter.classList.remove('letter');
                letter.classList.add('lettersolved');
                success=word.length;
                acierto=true;
                updateDivUsedLetters(); 
                
            });
        }

    if (acierto==true){
        success++;
        console.log('aciertos' +success);
    }else{
        misses++;
      
        console.log('fallos' +misses);

    }
    document.getElementById('inputletter').value = '';
}
}

function createdivusedletters(lettersUsed){
    let usedletters=document.createElement('div');
    usedletters.classList.add('usedletters');
    usedletters.innerText='Letras usadas: ' + lettersUsed;
    document.body.appendChild(usedletters);
}
function updateDivUsedLetters() {
    let usedLettersDiv = document.querySelector('.usedletters');
    usedLettersDiv.innerText ='Letras usadas: ' + lettersUsed.join(', ');
}
document.querySelector('button').addEventListener('click', checkletter);


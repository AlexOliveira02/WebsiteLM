export const emocoesConhecidas = [ "happy", "excited", "positive", "amazing", "spectacular", "good", "cheered-up", "incredible", "magnificent", "comfortable",
"optimistic", "fantastic", "radiant", "great", "excellent", "satisfied", "fulfilled", "better","intellectual", "inspired", "curious", 
"professional", "smart", "intelligent",
"relaxed", "calm", "crazy", "fun", "sarcastic", "funny", "hilarious","ok", "neutral", "indifferent", "normal","surprised", "amazed", "relieved",
"proud", "strong", "confident", "cool", "determined", "motivated","cute", "adorable", "handsome", "pretty", "gorgeous", "hot", "attractive",
"loved", "protected", "special", "welcome","blessed", "thankful", "hopeful", "lucky","bored", "lazy", "tired", "exhausted", "sleepy", "fed up",
"lonely", "alone","sad", "heartbroken", "desolate", "disappointed", "bad", "depressed", "horrible", "stupid", "terrible", "hurt",
"insulted", "tense", "melancholic", "incomplete", "guilty", "worse", "despised", "insecure","angry", "furious", "annoyed", "rude", 
"jealous","stressed", "distressed", "worried", "anxious",     
"cold", "sick", "hungry","lost", "confused","shy", "weird", "awkward", "embarrassed","thoughtful", "nostalgic",
"human", "emotional", "old","free", "alive"];

document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.getElementById('starCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        const starInfo = document.getElementById('starInfo');
        const firstText = document.getElementById('firstText');
        const fourInput = document.getElementById('fourInput');
        const thirdTextInput = document.getElementById('thirdTextInput');
        let currentStar = null;
        let starCount = 0;
        let isMouseOverStar = false;
        let lineOpacity = 1;
        let shouldDrawLine = false;
        let stars = [];
        let motivoEstrela = ''; // Variável global para armazenar o motivo
         

    //Cores de cada emoção
    const emotionColors = {
        "Feliz": "yellow",
        "Triste": "#0078ff",
        "Empolgado": "red",
        "Pensativo": "green"
    };

    // Exibir do 1 para o 2 texto
    setTimeout(function() {
        const firstText = document.getElementById('firstText');
        const secondText = document.getElementById('secondText');
        
        firstText.style.display = 'none';
        secondText.style.display = 'block';
    }, 2000); // 2000 milissegundos = 2 segundos

    // Exibir do 2 para o 3 texto
    setTimeout(function() {
        const secondText = document.getElementById('secondText');
        const thirdText = document.getElementById('thirdText');

        secondText.style.display = 'none';
        thirdText.style.display = 'block';
    }, 6000); // 6000 milissegundos = 6 segundos
   
    // Input do 3 texto!
    thirdTextInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const inputValue = this.value.trim().toLowerCase(); // Converte a entrada para minúsculas
    
            if (inputValue === '') {
                alert('Por favor, insere alguma palavra que expresse a tua emoção!');
            } else if (inputValue.split(' ').length > 1) {
                // Verifica se a entrada contém mais de uma palavra
                alert('Por favor, insira apenas uma palavra sem espaços.');
            } else if (!emocoesConhecidas.includes(inputValue)) {
                // Se a emoção inserida não estiver na lista de emoções conhecidas
                alert('Não conheço essa emoção. Tente novamente com uma emoção diferente.');
            } else {
                const fourTextH1 = document.getElementById('fourText').querySelector('h1');
                fourTextH1.textContent = `I’m feeling ${inputValue} because ...`;
    
                const fourText = document.getElementById('fourText');  
                const thirdText = document.getElementById('thirdText');
    
                thirdText.style.display = 'none'; // Oculta o 3 texto
                fourText.style.display = 'block'; // Mostra o 4 texto
            }
        }
    });  
    
    // Para remover no fim! Apenas teste - Adiciona uma estrela ao clicar 2x
    // document.addEventListener('dblclick', function(event) {
    //     if (isSpaceFree(event.pageX, event.pageY, stars)) {
    //         const newStar = createStar(canvas, ctx, stars, starInfo, event.pageX, event.pageY, motivoEstrela);
    //         stars.push(newStar);
    //         motivoEstrela = ''; // Resetar o motivo após criar a estrela
    //     }
    // });

    // Carrossel typing Effect -- Não está a funcionar!
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
          this.txtElement = txtElement;
          this.words = words;
          this.txt = '';
          this.wordIndex = 0;
          this.wait = parseInt(wait, 8);
          this.type();
          this.isDeleting = false;
        }
      
        type() {
          // Current index of word
          const current = this.wordIndex % this.words.length;
          // Get full text of current word
          const fullTxt = this.words[current];
      
          // Check if deleting
          if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
          }
      
          // Insert txt into element
          this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
      
          // change color for data-text
          this.txtElement.innerHTML = `<span class="txt" style="color: #ffffff;">${this.txt}</span>`;
      
          // Initial Type Speed
          let typeSpeed = 100;
      
          if(this.isDeleting) {
            typeSpeed /= 2;
          }
      
          // If word is complete
          if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
          } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 300;
          }
      
          setTimeout(() => this.type(), typeSpeed);
        }
    }
    init()

    function init() {
        const txtElement = document.querySelector('.txt-type');
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }

    // Função para converter cores hexadecimais em valores RGB - Alterar e depois remover??
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    } 
});



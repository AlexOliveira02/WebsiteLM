import { emotionReasons } from './emoreasons.js'; // MI NEW - A list of emotions and assigned reasons for code to use

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
    let emocaoEscolhida = ''; // Needed to avoid a bug


    // MI NEW - initializing music
    const audio = new Audio('/resources/audio/spaceambient.mp3');
    audio.loop = true;

    function playBackgroundMusic() {
        audio.play();
    }


    // MI NEW - Updated emotions
    const emocoesConhecidas = [ "happy", "excited", "positive", "amazing", "spectacular", "good", "cheered-up", "incredible", "magnificent", "comfortable",
"optimistic", "fantastic", "radiant", "great", "excellent", "satisfied", "fulfilled", "better","intellectual", "inspired", "curious", 
"professional", "smart", "intelligent",
"relaxed", "calm", "crazy", "fun", "sarcastic", "funny", "hilarious","ok", "neutral", "indifferent", "normal","surprised", "amazed", "relieved",
"proud", "strong", "confident", "cool", "determined", "motivated","cute", "adorable", "handsome", "pretty", "gorgeous", "hot", "attractive",
"loved", "protected", "special", "welcome","blessed", "thankful", "hopeful", "lucky","bored", "lazy", "tired", "exhausted", "sleepy", "fed up",
"lonely", "alone","sad", "heartbroken", "desolate", "disappointed", "bad", "depressed", "horrible", "stupid", "terrible", "hurt",
"insulted", "tense", "melancholic", "incomplete", "guilty", "worse", "despised", "insecure","angry", "furious", "annoyed", "rude", 
"jealous","stressed", "distressed", "worried", "anxious",     
"cold", "sick", "hungry","lost", "confused","shy", "weird", "awkward", "embarrassed","thoughtful", "nostalgic",
"human", "emotional", "old","free", "alive"]; //all in lowercase


    //Cores de cada emoção
    const emotionColors = {
        "happy": "#f29191", "excited": "#f29691", "positive": "#f29b91", "amazing": "#f2a191",
        "spectacular": "#f2a691", "good": "#f2ab91", "cheered-up": "#f2b191", "incredible": "#f2b691",
        "magnificent": "#f2bb91", "comfortable": "#f2c091", "optimistic": "#f2c691", "fantastic": "#f2cb91",
        "radiant": "#f2d091", "great": "#f2d691", "excellent": "#f2db91", "satisfied": "#f2e091",
        "fulfilled": "#f2e591", "better": "#f2eb91", "intellectual": "#f2f091", "inspired": "#eef291",
        "curious": "#e9f291", "professional": "#e4f291", "smart": "#def291", "intelligent": "#d9f291",
        "relaxed": "#d4f291", "calm": "#cff291", "crazy": "#c9f291", "fun": "#c4f291",
        "sarcastic": "#bff291", "funny": "#b9f291", "hilarious": "#b4f291", "ok": "#aff291",
        "neutral": "#aaf291", "indifferent": "#a4f291", "normal": "#9ff291", "surprised": "#9af291",
        "amazed": "#94f291", "relieved": "#91f293", "proud": "#91f298", "strong": "#91f29d",
        "confident": "#91f2a2", "cool": "#91f2a8", "determined": "#91f2ad", "motivated": "#91f2b2",
        "cute": "#91f2b8", "adorable": "#91f2bd", "handsome": "#91f2c2", "pretty": "#91f2c7",
        "gorgeous": "#91f2cd", "hot": "#91f2d2", "attractive": "#91f2d7", "loved": "#91f2dd",
        "protected": "#91f2e2", "special": "#91f2e7", "welcome": "#91f2ec", "blessed": "#91f2f2",
        "thankful": "#91ecf2", "hopeful": "#91e7f2", "lucky": "#91e2f2", "bored": "#91ddf2",
        "lazy": "#91d7f2", "tired": "#91d2f2", "exhausted": "#91cdf2", "sleepy": "#91c7f2",
        "fed up": "#91c2f2", "lonely": "#91bdf2", "alone": "#91b8f2", "sad": "#91b2f2",
        "heartbroken": "#91adf2", "desolate": "#91a8f2", "disappointed": "#91a2f2", "bad": "#919df2",
        "depressed": "#9198f2", "horrible": "#9193f2", "stupid": "#9491f2", "terrible": "#9a91f2",
        "hurt": "#9f91f2", "insulted": "#a491f2", "tense": "#aa91f2", "melancholic": "#af91f2",
        "incomplete": "#b491f2", "guilty": "#b991f2", "worse": "#bf91f2", "despised": "#c491f2",
        "insecure": "#c991f2", "angry": "#cf91f2", "furious": "#d491f2", "annoyed": "#d991f2",
        "rude": "#de91f2", "jealous": "#e491f2", "stressed": "#e991f2", "distressed": "#ee91f2",
        "worried": "#f291f0", "anxious": "#f291eb", "cold": "#f291e5", "sick": "#f291e0",
        "hungry": "#f291db", "lost": "#f291d6", "confused": "#f291d0", "shy": "#f291cb",
        "weird": "#f291c6", "awkward": "#f291c0", "embarrassed": "#f291bb", "thoughtful": "#f291b6",
        "nostalgic": "#f291b1", "human": "#f291ab", "emotional": "#f291a6", "old": "#f291a1",
        "free": "#f2919b", "alive": "#f29196"
    };

    // MI NEW - added chime sounds
    const chimeSounds = [
        'chime-0001.wav', 'chime-0002.wav', 'chime-0003.wav', 'chime-0004.wav', 
        'chime-0005.wav', 'chime-0006.wav', 'chime-0007.wav', 'chime-0008.wav', 
        'chime-0009.wav', 'chime-0010.wav', 'chime-0011.wav', 'chime-0012.wav', 
        'chime-0013.wav', 'chime-0014.wav', 'chime-0015.wav', 'chime-0018.wav', 
        'chime-0019.wav', 'chime-0020.wav', 'chime-0021.wav', 'chime-0022.wav', 
        'chime-0023.wav', 'chime-0024.wav'
    ];

    // MI NEW - added a function for playing random chimes
    function playChime() {
        const randomIndex = Math.floor(Math.random() * chimeSounds.length);
        const soundPath = `/resources/audio/chimes/${chimeSounds[randomIndex]}`;
        const sound = new Audio(soundPath);
        sound.play();
    }

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

    // Cria 100 estrelas pelo que entendi?
    for (let i = 0; i < 100; i++) {
        stars.push(createStar(canvas, ctx, stars, starInfo));
    }

    // Mostra informação relativo a cada estrela!
    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains('star')) {
            starInfo.style.display = 'none';
        }
    });
    
    // Input do 3 texto!
    thirdTextInput.addEventListener('keypress', function(event) {

    // MI NEW - I could not play music from the start, likely browsers block autoplay, so this is the earliest it can autoplay
    playBackgroundMusic();

        if (event.key === 'Enter') {
            const inputValue = this.value.trim().toLowerCase(); // Converte a entrada para minúsculas
    
            if (inputValue === '') {
                alert('Please, insert an adjective that expresses your emotion!');
            } else if (inputValue.split(' ').length > 1) {
                // Verifica se a entrada contém mais de uma palavra
                alert('Please, enter only one word without spaces.');
            } else if (!emocoesConhecidas.includes(inputValue)) {
                // Se a emoção inserida não estiver na lista de emoções conhecidas
                alert('Could not recognise this emotion. Please try to use a different word.');
            } else {
                const fourTextH1 = document.getElementById('fourText').querySelector('h1');
                fourTextH1.textContent = `I’m feeling ${inputValue} because ...`;
                emocaoEscolhida = inputValue; // Armazena a emoção escolhida

    
                const fourText = document.getElementById('fourText');  
                const thirdText = document.getElementById('thirdText');
    
                thirdText.style.display = 'none'; // Oculta o 3 texto
                fourText.style.display = 'block'; // Mostra o 4 texto
            }
        }
    });
    
    // Input do 4 texto!
    fourInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            if (this.value.trim() === '') {
                alert('Por favor, insere um pequeno texto para o motivo de tal emoção.');
            } else {
                motivoEstrela = this.value.trim(); // Atualiza para usar trim() aqui

                const newStar = createStar(canvas, ctx, stars, starInfo, event.pageX, event.pageY, emocaoEscolhida, motivoEstrela);
                stars.push(newStar);
                motivoEstrela = ''; // Resetar o motivo após criar a estrela
                fourText.style.display = 'none';
                document.getElementById('introBackground').style.display = 'none';
            }
        }
    });
    
    // Para remover no fim! Apenas teste - Adiciona uma estrela ao clicar 2x
    document.addEventListener('dblclick', function(event) {
        if (isSpaceFree(event.pageX, event.pageY, stars)) {
            const newStar = createStar(canvas, ctx, stars, starInfo, event.pageX, event.pageY, motivoEstrela);
            stars.push(newStar);
            motivoEstrela = ''; // Resetar o motivo após criar a estrela
        }
    });
    

// ESTRELAS
    //Cria uma estrela
    function createStar(canvas, ctx, stars, starInfo, x = Math.random() * canvas.width, y = Math.random() * canvas.height) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
    
        // Get all emotion keys from emotionReasons object
        const allEmotions = Object.keys(emotionReasons);
        
    
        // Selecting a random emotion from the keys of emotionReasons
        const randomEmotion = allEmotions[Math.floor(Math.random() * allEmotions.length)];
        
        
    
        // Selecting a random reason from the emotionReasons, corresponding to the chosen emotion
        const reasonsForEmotion = emotionReasons[randomEmotion]; // Obtém a lista de motivos para a emoção escolhida
        const randomReason = emotionReasons[randomEmotion][Math.floor(Math.random() * emotionReasons[randomEmotion].length)];

        console.log(`Star Clicked Emotion: ${randomEmotion}`); // Depuração: Log da emoção ao clicar na estrela
        console.log(`Star Clicked Reason: ${randomReason}`); // Depuração: Log do motivo ao clicar na estrela


        // Setting attributes for emotion and reason
        star.setAttribute('data-emotion', randomEmotion);
        star.setAttribute('data-reason', randomReason);
    
        const minSize = 40;
        const maxSize = 80;
        const size = minSize + Math.random() * (maxSize - minSize);
    
        const initialSize = 100;
        star.style.width = `${initialSize}px`;
        star.style.height = `${initialSize}px`;
    
        setTimeout(() => {
            const finalSize = Math.random() * 6 + 2;
            star.style.width = `${finalSize}px`;
            star.style.height = `${finalSize}px`;
        }, 5000);
    
        starCount++;
        console.log(`Número de Estrelas: ${starCount}`);
    
        star.addEventListener('mouseover', () => {
            isMouseOverStar = true;
            currentStar = star;
            lineOpacity = 1;
        });
    
        star.addEventListener('mouseout', () => {
            isMouseOverStar = false;
        });
    
        const emotions = [ "happy", "excited", "positive", "amazing", "spectacular", "good", "cheered-up", "incredible", "magnificent", "comfortable",
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
        
        const starEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        // star.setAttribute('data-emotion', starEmotion);
        const starColor = emotionColors[starEmotion];
        star.style.backgroundColor = starColor;
    
        star.addEventListener('click', function(event) {
            currentStar = this;
    
            event.stopPropagation();
            starInfo.style.display = 'block';
            starInfo.style.left = `${event.pageX}px`;
            starInfo.style.top = `${event.pageY}px`;

            
    
            const clickedStarEmotion = this.getAttribute('data-emotion');
            const clickedStarReason = this.getAttribute('data-reason');

            console.log(`Star Clicked Emotion: ${clickedStarEmotion}`); // Depuração: Log da emoção ao clicar na estrela
            console.log(`Star Clicked Reason: ${clickedStarReason}`); // Depuração: Log do motivo ao clicar na estrela

            starInfo.innerHTML = `Star information:<br>Coordinate X: ${event.pageX}<br>Coordinate Y: ${event.pageY}<br>Emotion: ${clickedStarEmotion}<br>Reason: ${clickedStarReason}`;
            playChime();
        });
    
        document.body.appendChild(star);
        return star;
    }
    
    //Se estiver muito perto, não deixa criar a estrela
    function isSpaceFree(x, y, stars, minDistance = 50) {
        return stars.every(star => {
            const starX = parseInt(star.style.left);
            const starY = parseInt(star.style.top);
            const distance = Math.sqrt(Math.pow(starX - x, 2) + Math.pow(starY - y, 2));
            return distance >= minDistance;
        });
    }

    //Linha de Emoção - A Funcionar! + Estético
    function drawLines(ctx, stars, currentStar) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (lineOpacity > 0 && currentStar) {
            const currentEmotion = currentStar.getAttribute('data-emotion');
            const connectedStars = stars.filter(star => star.getAttribute('data-emotion') === currentEmotion);
    
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
            ctx.moveTo(currentStar.offsetLeft + currentStar.offsetWidth / 2, currentStar.offsetTop + currentStar.offsetHeight / 2);
    
            connectedStars.forEach(targetStar => {
                ctx.lineTo(targetStar.offsetLeft + targetStar.offsetWidth / 2, targetStar.offsetTop + targetStar.offsetHeight / 2);
                ctx.moveTo(targetStar.offsetLeft + targetStar.offsetWidth / 2, targetStar.offsetTop + targetStar.offsetHeight / 2);
            });
    
            ctx.stroke();
        }
    
        if (!isMouseOverStar && lineOpacity > 0) {
            lineOpacity -= 0.01;
        }
    }
    
    
    //Faz a animação do DrawLines
    function animate() {
        requestAnimationFrame(animate);
        drawLines(ctx, stars, currentStar);
    }
    animate();

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
});




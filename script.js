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

    const emocoesConhecidas = ["feliz", "triste", "empolgado", "pensativo", "alegre", "angustiado", "calmo", "eufórico"]; // Todas em minúsculas


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

    // Mostra informação relativo a cada estrela!
    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains('star')) {
            starInfo.style.display = 'none';
        }
    });
    
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
    
    // Input do 4 texto!
    fourInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            if (this.value.trim() === '') {
                alert('Por favor, insere um pequeno texto para o motivo de tal emoção.');
            } else {
                motivoEstrela = this.value; // Armazenar o valor inserido
                const newStar = createStar(canvas, ctx, stars, starInfo, event.pageX, event.pageY, motivoEstrela);
                stars.push(newStar);
                motivoEstrela = ''; // Resetar o motivo após criar a estrela
                fourText.style.display = 'none';
                document.getElementById('introBackground').style.display = 'none';
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
    

// ESTRELAS
    //Cria uma estrela
    function createStar(canvas, ctx, stars, starInfo, x = Math.random() * canvas.width, y = Math.random() * canvas.height, motivo) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
    
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
    
        const emotions = ["Feliz", "Triste", "Empolgado", "Pensativo"];
        const starEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        star.setAttribute('data-emotion', starEmotion);
        const starColor = emotionColors[starEmotion];
        star.style.backgroundColor = starColor;
    
        star.addEventListener('click', function(event) {
            currentStar = this;
    
            event.stopPropagation();
            starInfo.style.display = 'block';
            starInfo.style.left = `${event.pageX}px`;
            starInfo.style.top = `${event.pageY}px`;
    
            const emotion = star.getAttribute('data-emotion');
            starInfo.innerHTML = `Informações da Estrela:<br>Coordenada X: ${event.pageX}<br>Coordenada Y: ${event.pageY}<br>Emoção: ${emotion}<br>Motivo: ${motivo}`;
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



function main(){
    // Função main é a função de motor do game, nela mandarei quase todas as funções.
    var canvasAltura  = parseInt(document.getElementById("telaDoJogo").style.width); 
    var canvasLargura = parseInt(document.getElementById("telaDoJogo").style.height);
    
    var canvas   = document.getElementById("telaDoJogo");
    // Variavel de contexto de renderização
    var contexto = canvas.getContext("2d");
    
    //Recursos do Game
    var background = new Image();
    background.src = "../img/imgDeFundo.jpg";

    var player = new Image();
    player.src = "../img/player.png";
    
    //Objetos do game a serem renderizados.
    var sprites = [];
    var mundoDoGame = {
      img: background,
      x: 0,
      y: 0,
      width: 1920,
      height: 1080
    };
    var char = {
        img: player,
        x: 0,
        y: 0,
        width: 128,
        height: 128
    };

    sprites.push(mundoDoGame);
    sprites.push(char);
   
    
    var camera = {
        x: 0,
        y: 0,
        width:  canvas.width,
        height: canvas.height,
        frontEsquerda:  function (){ return this.x + (this.width * 0.25); },
        frontAlto:      function (){ return this.y + (this.height * 0.25);},
        frontDireita:   function (){ return this.x + (this.width * 0.75); },
        frontBaixo:     function (){ return this.y + (this.height * 0.75);}
        
    };
    //centralizar a câmera
	camera.x = (mundoDoGame.width - camera.width)/2;
	camera.y = (mundoDoGame.height - camera.height)/2;
	
    // ELEMENTOS DE MOVIMENTAÇÃO DO JOGADOR ===============================================================
    var moveEsquerda = false;
    var moveDireita  = false;
    var moveCima     = false;
    var moveBaixo    = false;
    window.addEventListener("keydown",function(evento){
        // A JANELA ESPERANDO UM EVENTO NO CASO O PRESSIONAR DE UMA TECLA
        // QUANDO ISSO É EXECUTADO EU VERIFICO PELO SISTEMA DE CODIGOS
        // QUAL TECLA FOI PRESSIONADA, OS CODIGOS SEGUEM O SENTIDO HORARIO
        // INICIANDO PELO NORMAL QUE É ESQUERDA.
        var tecla = evento.keyCode;
        switch (tecla) {
            case 37:
                moveEsquerda = true;
                break;
            case 38:
                moveCima = true;
                break;
            case 39:
                moveDireita = true;
                break;
            case 40:
                moveBaixo = true;
                break;
        }
    });
    window.addEventListener("keyup",function(evento){
        // A MESMA COISA POREM QUANDO POREM O USUARIO TIRAR O DEDO DA TECLA
        var tecla = evento.keyCode;
        switch (tecla) {
            case 37:
                moveEsquerda = false;
                break;
            case 38:
                moveCima = false;
                break;
            case 39:
                moveDireita = false;
                break;
            case 40:
                moveBaixo = false;
                break;
        }
    });
    //======================================================================================================
    function loop(){
        window.requestAnimationFrame(loop,canvas);
        atualiza();
        renderiza();
    }
    function atualiza(){
        // TENHO QUE TENTAR DEIXAR ISSO MAIS LIMPO.. E TALVEZ FUNCIONAL ;)
        if(moveEsquerda && !moveDireita){
            char.x = char.x - 2;
        }
        if(moveCima && !moveBaixo){
            char.y = char.y - 2;
        }
        if(moveDireita && !moveEsquerda){
            char.x = char.x + 2;
        }
        if(moveBaixo && !moveCima){
            char.y = char.y + 2;
        }
    }
    // ATUALIZAÇÃO DA CAMERA EM FUNÇÃO DO PLAYER.
        if(char.x < camera.frontEsquerda()){
            camera.x = char.x - (camera.width * 0.25); 
        }
        if(char.x + char.width > camera.frontDireita()){
            camera.x = char.x + char.width - (camera.width * 0.75); 
        }
        if(char.y < camera.frontAlto()){
            camera.y = char.y - (camera.height * 0.25); 
        }
        if(char.y + char.height > camera.frontBaixo()){
            camera.y = char.y + char.height - (camera.height * 0.75); 
        }
        
    //===================================================================================================
    function renderiza(){
        contexto.save();
        contexto.translate(-camera.x, -camera.y);
        for(var i in sprites){
            var spr = sprites[i];
            contexto.drawImage(spr.img, 0, 0, spr.width, spr.height, spr.x, spr.y, spr.width, spr.height);
        }
        contexto.restore();
        
        // contexto.drawImage(background, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
        // contexto desenhe nomeDaImage, ondeElaComeça x e y, tamanhoDaImagem,  
    }
    loop();
}
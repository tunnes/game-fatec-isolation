//  Bom.. se chegou até este ponto, então realmente pretende entender meu o projeto, sendo  um pouco mais
//  objetivo agora este script contem classes e seus respectivos métodos por assim dizer.. e sim parte do 
//  projeto é orientado a objetos, ambos servem para as possiveis instancias que são utilizadas ao entorno 
//  do game.

//  Para saber mais sobre JavaScript OOP acesse meu repositorio aulas-javascript no git, apartir do segundo
//  já bimestre identificado no repositorio aborda de uma maneira legal OOP.

//  CLASSE-PERSONAGEM ===============================================================================================
var Personagem = function(pontoX, pontoY, largura, altura, enderecoImagem, corteX, corteY, direcao){
    this.pontoX         = pontoX;
    this.pontoY         = pontoY;
    this.largura        = largura;
    this.altura         = altura;
    this.img            = new Image(); 
    this.img.src        = enderecoImagem;
    this.corteX         = corteX;
    this.corteY         = corteY; 
    this.frame          =  4;
    this.frameAtual     =  0;
    this.direcao        = direcao || "Direita";
    this.quebraChamaX   = this.pontoX + 24;
    this.quebraChamaY   = this.pontoY - 24;
    this.score          = 0;
    this.vida           = 400;
    
    }
    Personagem.prototype.metadeDaLargura = function(){ 
        return this.largura/2;
    }
    Personagem.prototype.metadeDaAltura  = function(){ 
        return this.altura/2;
    }
    Personagem.prototype.pontoCentralX   = function(){ 
        return this.pontoX + this.metadeDaLargura();
    }
    Personagem.prototype.pontoCentralY   = function(){ 
        return this.pontoY + this.metadeDaAltura();
    }
    Personagem.prototype.atualizaSprite  = function(altura,largura,corteY){
        return this.altura = altura, this.largura = largura, this.corteY = corteY; 
    }
    Personagem.prototype.moveSprite      = function(){
        if (this.frameAtual == this.frame){
            this.corteX == this.largura*7 ? this.corteX = 0 : this.corteX += this.largura;    
            this.frameAtual = 0;
        }else{ 
            this.frameAtual++;
        }
    }
    Personagem.prototype.disparar        = function(disparos){
        function calibre20(disparos, direcao, pontoX, pontoY){
            switch (direcao){
            case "Esquerda":
                var tiro0 =  new  Projetil(pontoX + 25, pontoY + 24, 10, 10,  direcao);
                var tiro1 =  new  Projetil(pontoX + 25, pontoY + 40, 10, 10,  direcao);
                var tiro2 =  new  Projetil(pontoX + 25, pontoY + 8,  10, 10,  direcao);
                break;
            case "Direita":
                var tiro0 =  new  Projetil(pontoX + 70, pontoY + 24, 10, 10,  direcao);
                var tiro1 =  new  Projetil(pontoX + 70, pontoY + 40, 10, 10,  direcao);
                var tiro2 =  new  Projetil(pontoX + 70, pontoY + 8,  10, 10,  direcao);
                break;
            case "Cima":
                var tiro0 =  new  Projetil(pontoX + 24, pontoY + 15, 10, 10,  direcao);
                var tiro1 =  new  Projetil(pontoX + 40, pontoY + 15, 10, 10,  direcao);
                var tiro2 =  new  Projetil(pontoX + 8 , pontoY + 15, 10, 10,  direcao);
                break;
            case "Baixo":
                var tiro0 =  new  Projetil(pontoX + 24, pontoY + 70, 10, 10,  direcao);
                var tiro1 =  new  Projetil(pontoX + 40, pontoY + 70, 10, 10,  direcao);
                var tiro2 =  new  Projetil(pontoX + 8 , pontoY + 70, 10, 10,  direcao);
                break;
        }
            return disparos.push(tiro0, tiro1, tiro2);
        }
        calibre20(disparos,this.direcao,this.pontoX,this.pontoY);
    }

//  CLASSE-MAPA ===================================================================================================== 
var Mapa = function (pontoX, pontoY, largura, altura, enderecoImagem, visivel){
        this.pontoX     = pontoX;
        this.pontoY     = pontoY;
        this.largura    = largura;
        this.altura     = altura;
        this.img        = new Image();
        this.img.src    = enderecoImagem;
        this.visivel    = visivel || true;
    }

//  CLASSE-CAMERA ===================================================================================================
var Camera = function(pontoX, pontoY, largura, altura){             
        this.pontoX  = pontoX;
        this.pontoY  = pontoY;
        this.largura = largura;
        this.altura  = altura;
    }
    Camera.prototype.fronteiraEsquerda  = function (){ 
        return this.pontoX + (this.largura * 0.25);
    }
    Camera.prototype.fronteiraAlto      = function (){ 
        return this.pontoY + (this.altura * 0.25);
    }
    Camera.prototype.fronteiraDireita   = function (){
        return this.pontoX + (this.largura * 0.75);
    }
    Camera.prototype.fronteiraBaixo     = function (){
        return this.pontoY + (this.altura * 0.75);
    } 
    Camera.prototype.atualizaPosicao    = function(player){
        player.pontoX < this.fronteiraEsquerda()                 ? this.pontoX = player.pontoX - (this.largura * 0.25) : null;
        player.pontoY < this.fronteiraAlto()                     ? this.pontoY = player.pontoY - (this.altura * 0.25) : null;
        player.pontoX + player.largura > this.fronteiraDireita() ? this.pontoX = player.pontoX + player.largura - (this.largura * 0.75) : null;
        player.pontoY + player.altura > this.fronteiraBaixo()    ? this.pontoY = player.pontoY + player.altura - (this.altura * 0.75) : null;
    }

//  CLASSE-INIMIGO ==================================================================================================
var Inimigo = function(pontoX, pontoY, largura, altura, enderecoImagem, corteX, corteY){
    this.pontoX     = pontoX;
    this.pontoY     = pontoY;
    this.largura    = largura;
    this.altura     = altura;
    this.img        = new Image(); 
    this.img.src    = enderecoImagem;
    this.corteX     = corteX;
    this.corteY     = corteY;
    this.direcao    = "Direita";
    this.frame      =  10;
    this.frameAtual =  0;
    this.vida       =  8;
    this.vivo       = true;

}
    Inimigo.prototype = new Personagem();
    Inimigo.prototype.seguir = function(focoX,focoY){
            if      (this.pontoX < focoX && this.pontoY < focoY) { this.pontoX += 3; this.direcao = "Direita";  this.corteY = 0;   }
            else if (this.pontoX > focoX && this.pontoY > focoY) { this.pontoX -= 3; this.direcao = "Esquerda"; this.corteY = 77;  }
            else if (this.pontoX > focoX)                        { this.pontoX -= 4; this.direcao = "Esquerda"; this.corteY = 77;  }
            else if (this.pontoX < focoX)                        { this.pontoX += 4; this.direcao = "Direita";  this.corteY = 0;   }
            else if (this.pontoY < focoY)                        { this.pontoY += 4; this.direcao = "Baixo";    this.corteY = 231; }
            else if (this.pontoY > focoY)                        { this.pontoY -= 4; this.direcao = "Cima";     this.corteY = 154; }    
            this.atualizaSprite(this.altura,this.altura,this.corteY);
            this.moveSprite();
        
    }
    Inimigo.prototype.levarUmTiro = function(quemLevou,disparos,vestijos, player){
        disparos.forEach(function(tiro){
            /*global mataZombi*/
            mataZombi(quemLevou, tiro, player, vestijos, disparos);
        });
    }
    Inimigo.prototype.naoMeToque = function(umFresco, arrayZombi, player){
        arrayZombi.forEach(function(outroFresco){
            /*global bloqueia*/
            bloqueia(umFresco, outroFresco);
            bloqueia(umFresco, player);
        });
    }

//  CLASSE-VESTIJO ==================================================================================================
var Vestijo = function (pontoX, pontoY, corteX){
    this.pontoX     = pontoX;
    this.pontoY     = pontoY;
    this.largura    = 30;
    this.altura     = 30;
    this.img        = new Image();
    this.img.src    = img.vestijo;
    this.corteX     = corteX;
    this.corteY     = 0;
}

//  CLASSE-DISPAROS =================================================================================================
var Projetil =  function(pontoX, pontoY, largura, altura, direcao){
    this.pontoX     = pontoX;
    this.pontoY     = pontoY;
    this.largura    = largura;
    this.altura     = altura;
    this.direcao    = direcao;    
}
    Projetil.prototype = new Personagem();


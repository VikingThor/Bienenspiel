var x=0;
var y=0;
var zielx = Math.floor(Math.random()*28)*20+20;
var ziely=460;
var siegpunkte = 0;
var spielzeit = 45;
var startzeit = new Date();
var gegnerpositionen = [1, 10, 60, 100, 150, 296];
var gegnerbewegung = [2,3,-2,4,5,-3];


$(document).ready(function() {
  takt = window.setInterval(taktung, 300);

  var spielbrett = document.getElementById('leinwand');
  spielfeld = spielbrett.getContext('2d');
  var spielfigur=new Image();
  spielfigur.src='bilder/spielfigur.png';

  spielfigur.onload=function(){
    spielfeld.drawImage(spielfigur,x,y);
  }

  function taktung() {
    spielfeld.clearRect(0, 0, 600, 480);
    zeichneZielfeld();
    spielfeld.drawImage(spielfigur,x,y);
    zielfelderreicht();
    kollisionspruefungGegner();
    setzeGegner();

    var aktuellezeit = new Date();
    restzeit = spielzeit - Math.floor((aktuellezeit.getTime()-startzeit.getTime())/1000);
    // console.log(restzeit);
    $('#spielzeit').html('Spielzeit: ' + restzeit);
    if (restzeit <=0){
      spielende();
    }
  }

  function setzeGegner() {
    for (nr = 0; nr < gegnerpositionen.length; nr++) {
      gegnerpositionen[nr] += gegnerbewegung[nr] * 5;
      if (gegnerpositionen[nr] > 580 || gegnerpositionen[nr] < 0) {
        gegnerbewegung[nr] *= -1;
      } erzeugeGegner(gegnerpositionen[nr], 360-(nr*40));
    }
  }

  function erzeugeGegner(gx,gy) {
    var img = new Image();
    img.src = 'bilder/gegnerfigur.png';
    img.onload =function(){
      spielfeld.drawImage(img,gx,gy);
    }
  }

  function spielende(){
    clearInterval(takt);
    $('#spielendeanzeige').show();
  }

  function zeichneZielfeld(){
    var zielfeld = new Image();
    zielfeld.src='bilder/zielbereich.png';
    zielfeld.onload=function() {
      spielfeld.drawImage(zielfeld, zielx, ziely);
    }
  }
  zeichneZielfeld();

  function zielfelderreicht() {
    // console.log("x: "+x+ "|Ziel x:"+ zielx);
    // console.log("y: "+y+ "|Ziel y:"+ ziely);

    if(x==zielx && y==ziely) {
      //ziel erreicht!
      // console.log("Ziel erreicht!");

      //neues Ziel erzeugen
      if(ziely==460){
        ziely=0;
        }
        else {
          ziely=460;
        }
        zielx= Math.floor(Math.random()*28)*20+20;
        siegpunkte++;
        $('#punktestand').html('Siegpunkte: '+siegpunkte);
    }
  }

  function kollisionspruefungGegner(){
    for (nr = 0; nr < gegnerpositionen.length; nr++) {
      var ygeg = 360-(nr*40);
      if (Math.abs(x - gegnerpositionen[nr]) < 20 && y == ygeg) {
        //zusammenstoss
        // console.log("Zusammenstoss");
        // console.log(Math.abs(x-gegnerpositionen[nr]));
        // console.log(" | y: "+y);
        // console.log(" | y: "+ ygeg + "berechnet ");
        kollisionGegner();
      }
    }
  }

  function kollisionGegner() {
    clearInterval(takt);
    $('#gameover').show();
  }


  $(document).bind('keydown', function (event) {
    // console.log("Tastaturcode: " + event.keyCode);
    switch(event.keyCode){
      case 40:
          // console.log("Pfeiltaste nach unten");
          y +=20;
          if (y >=480) {
            y=460;
          }
          // console.log("Wert y: "+y);
          return false;
          break;
      case 39:
          // console.log("Pfeiltaste nach rechts");
          x +=20;
          if (x >= 600) {
            x=580;}
            return false;
            break;
      case 38:
          // console.log("Pfeiltaste nach oben");
          y -=20;
          if (y <=0) {
            y=0;
          }
          // console.log("Wert y: "+y);
          return false;
          break;
      case 37:
          // console.log("Pfeiltaste nach links");
          x -=20;
          if (x <= 0) {
            x=0;}
            return false;
            break;

    }
  })

  console.log("spielfigur: "+spielfigur);
});

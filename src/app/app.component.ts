import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartaData } from './interfaces/cartaData';
import { ResetarDiaologoComponent } from './resetar-diaologo/resetar-diaologo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cartas:CartaData[] = [];
  cartaVolteada:CartaData[] = [];
  contador = 0;

  cartasImg = [
    'pDGNBK9A0sk',
    'fYDrhbVlV1E',
    'qoXgaF27zBc',
    'b9drVB7xIOI',
    'TQ-q5WAVHj0'
  ];

  ngOnInit(): void {
    this.cargarCartas();
  };

  constructor(private dialogo:MatDialog){}

  cargarCartas(){

    this.cartas = [ ...[] ];

    this.cartasImg.forEach(( image ) => {

      const CartaData:CartaData = {
        imagenId:image,
        state:'default'
      };
      this.cartas.push( {...CartaData} );
      this.cartas.push( {...CartaData} );
    });
    this.cartas = this.shuffleArray(this.cartas);
  };

  shuffleArray(arreglo:any[]): any[] {
    return arreglo.map(a => [Math.random(), a])
      .sort( (a, b) => a[0] - b[0] )
      .map( a => a[1] );
  };

  cartaClick(index:number){

    const carta = this.cartas[index];

    if ( carta.state === 'default' && this.cartaVolteada.length < 2 ) {
      carta.state = 'flipped';
      this.cartaVolteada.push( carta );

     if( this.cartaVolteada.length === 2) this.checkCarta(); 
    }
     else if( carta.state === 'flipped' ){
      carta.state = 'default';
      this.cartaVolteada.pop();
    }
  };

  checkCarta(){
    setTimeout(()=>{

      const cartaUno = this.cartaVolteada[0];
      const cartaDos = this.cartaVolteada[1];
      const nextCard = ( cartaUno.imagenId === cartaDos.imagenId ) ? 'matched':'default';
      cartaUno.state = cartaDos.state = nextCard;
      this.cartaVolteada = [...[]];
      if ( nextCard === 'matched' ) {
        this.contador ++;
       if ( this.contador === this.cartasImg.length ) {
        const dialogo = this.dialogo.open(ResetarDiaologoComponent,{
          disableClose: true
        });
        dialogo.afterClosed().subscribe(()=>{
          this.reset();
        });
      }
    };
    }, 1500)
  };

  reset(){
    this.contador = 0;
    this.cargarCartas();
  };
};



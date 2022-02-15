import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartaData } from '../interfaces/cartaData';

@Component({
  selector: 'app-carta-juego',
  templateUrl: './carta-juego.component.html',
  styleUrls: ['./carta-juego.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition('default => flipped', [
        animate('200ms')
      ]),
      transition('flipped => default', [
        animate('200ms')
      ]),
      transition('* => matched', [
        animate('200ms')
      ]),
    ]),
  ],
})

export class CartaJuegoComponent implements OnInit {

  @Input() data!: CartaData;

  @Output() cartaClick = new EventEmitter();
  

  constructor() { };

  ngOnInit(): void {
  };

};

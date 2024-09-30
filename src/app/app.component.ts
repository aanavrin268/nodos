import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TreeService } from './tree.service';

export interface CARTA {
  titulo: string;
  descrip: string;
}

interface Nodo {
  id: number;
  hijos: Nodo[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  inputValue: string = '';
  public index: any;

  constructor(private service: TreeService){

  }

  ngOnInit() {
    //this.service.getCurrentNode();
    //this.index = this.service.getCurrentNode().id;
  }

  getBack(){
    this.service.goBackToChild();
  }

  navegar(){
    console.log("ir al nodo: ", this.inputValue);
    this.index = this.service.getCurrentNode().id;
    this.service.navigateToChild(this.index, Number(this.inputValue));
  }

  
}

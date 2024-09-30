import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TreeService } from './tree.service';

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

  constructor(private service: TreeService) {}

  async ngOnInit() {

    const csvMenu = `
   nivel,id,msg,options,parentId
padre,1,"Hola!, bienvenido al chatbot! Elige una opción para continuar!","1.Productos;2.Soporte;3.Contacto",null
hijo,1.1,"Seleccionaste Productos. ¿Qué tipo de producto necesitas info?","1.celulares;2.PCS;3.Tablets",1
hijo,1.2,"Seleccionaste Soporte","",1
hijo,1.3,"Seleccionaste Contactos","",1
nieto,1.11,"Selecciona un tipo de celular","1.Iphone;2.Android",1.1
nieto,1.12,"PCS","",1.1
nieto,1.13,"Tablets","",1.1
bisnieto,1.111,"¿Qué tipo de Iphone te interesa","1.Iphone 16;2.Iphone 15",1.11
bisnieto,1.112, "SEleccionate Android","",1.11
tataranieto,1.1111,"Con qué configuracion te intersa?","1.128gb;2.256gb;3.512gb",1.111
tataranieto,1.1112,"Iphone 15","",1.111
pentaranieto,1.11111,"Quieres el de 128gb","",1.1111
pentaranieto,1.11112,"Quieres el de 256gb","",1.1111
pentaranieto,1.11113,"Quieres el de 512gb","",1.1111

    `.trim();


    const csvMenu2 = `
    nivel,id,msg,options,parentId
padre,1,"¡Bienvenido a la tienda de ropa! ¿Cómo podemos ayudarte hoy?","1.Nuevas Llegadas;2.Ofertas Especiales;3.Contactar Soporte",null
hijo,1.1,"Has seleccionado Nuevas Llegadas. ¿Qué categoría te interesa?","1.Hombres;2.Mujeres;3.Accesorios",1
hijo,1.2,"Has seleccionado Ofertas Especiales. ¿Qué tipo de oferta buscas?","1.Ropa;2.Zapatos;3.Accesorios",1
hijo,1.3,"¿Cómo podemos ayudarte?","1.Dudas sobre pedidos;2.Devoluciones;3.Otro",1
nieto,1.11,"Ropa de Hombres","",1.1
nieto,1.12,"Ropa de Mujeres","",1.1
nieto,1.13,"Accesorios para Hombres y Mujeres","",1.1
nieto,1.21,"Ofertas en Ropa","",1.2
nieto,1.22,"Ofertas en Zapatos","",1.2
nieto,1.23,"Ofertas en Accesorios","",1.2

 
     `.trim();
    

    // Cargar datos desde el CSV
    await this.service.loadCsvData(csvMenu);
  }

  getBack() {
    this.service.goBackToChild();
  }

  navegar() {
    console.log("Ir al nodo: ", this.inputValue);
    this.index = this.service.getCurrentNode().id;
    this.service.navigateToChild(this.index, Number(this.inputValue));
  }
}

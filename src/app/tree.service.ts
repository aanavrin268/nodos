import { Injectable } from '@angular/core';
import { NODO, TREE } from './helper';
import { CsvLoaderService } from './csv-loader.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  public tree: TREE 

  //arreglo de pilas
  public nodeStacks: NODO[] = [];

  //nodo actual
  private currentNode: NODO | null;

  public padre: NODO = {
    id: 1,
    msg: "Hola!, bienvenido al chatbot!Elige una opcion para continuar!",
    options: ['1.Productos','2.Soporte','3.Contacto'],
    children: [
      {
      id: 1.1,
      msg: "Seleccionaste Productos. ¿Qué tipo de producto necesitas info?",
      options: ['1.celulares','2.PCS','3.Tablets'],
      children: [
        {id: 1.11, msg: "Celulares", children: []},
        {id: 1.12, msg: "PCS" , children: []},
        {id: 1.13, msg: "Tablets" , children: []},


      ]
    },
    {id: 1.2, msg: "Seleccionaste Soporte" , children: []},
    {id: 1.3, msg: "Seleccionaste Contactos" , children: []}
  ]
  };

  constructor(private csvLoaderService: CsvLoaderService) { 

    this.tree = {
      valInitial: true,
      root: null,
      valFinal: false,
      
    }

    this.currentNode = null;
    this.getTreStatus();
    this.setOnRoot();

  }

  async loadCsvData(csvData: string): Promise<void> {
    try {
      this.tree.root = await this.csvLoaderService.loadCsv(csvData);
      this.currentNode = this.tree.root; // Establecer nodo actual
      this.setOnRoot(); // Ahora llama a setOnRoot
    } catch (error) {
      console.error("Error al cargar CSV:", error);
    }
  }

  setOnRoot() {
    if (this.currentNode === this.tree.root && this.currentNode) {
      this.updateStack(this.currentNode);
      console.log(this.currentNode.msg);
      console.log(this.currentNode.options);
    }
  }

  getTreStatus(): boolean {
    if (this.tree.valInitial === true && this.currentNode) {
      console.log("ARBOL ACTIVO");
      return true;
    } else {
      console.log("ARBOL INACTIVO");
      return false;
    }
  }

  navigateToChild(indexp: number, indexh: number): void {
  //VERIFICA SI TIENE OPCIONES  Y POR ENDE HIJOS
    if(this.currentNode && this.currentNode.options){
      if(this.currentNode.children){
        if(indexp === this.currentNode.id && (indexh >= 0 && indexh < this.currentNode.children.length )){
          console.log("se peude navegar");
          this.currentNode = this.currentNode.children[indexh];
          this.updateStack(this.currentNode);
          this.getCurrentNode();
          this.showNodoData();
          if(this.isLeaf()){
            
            
            console.log("ESTAS EN UNA HOJA");
          }else {
            console.log("ESTAS EN UNA RAMIFICACION");

          }
        }else{
          console.log("NO se peude navegar");

        }
      }
  //YA NO TIENE OPCIONES Y POR ENDE, NO TIENE HIJOS
    }else{
      if(this.isLeaf()){
        console.log("ESTAS EN UNA HOJA");
      }
    } 
}

  isLeaf(): boolean{
    if(this.currentNode && this.currentNode.options?.length === 0){
      return true;
    }else if(this.currentNode && (this.currentNode.options && this.currentNode.options.length > 0)){
      return false;
    }else 
      return false;
  }

  showNodoData(){
    if(this.currentNode!.options){
      console.log(this.currentNode!.msg);
      console.log(this.currentNode!.options);
    }else {
      console.log(this.currentNode!.msg);

    }
  }


  goBackToChild(){
    if(this.nodeStacks.length === 0){
      console.log("error, la pila esta vacia");
    }else{
      const removedElement = this.nodeStacks.pop();
      console.log("Se elimino:", removedElement);

      if(this.nodeStacks.length > 0){
        this.currentNode = this.nodeStacks[this.nodeStacks.length -1];
        console.log("Nodo actual después de volver:", this.currentNode);

      }else {
        this.currentNode = null;
      }

      //this.nodeStacks.pop();
      this.checkStack();
      this.getCurrentNode();



    }
  }

  setCurrentNode(node: NODO){
    this.currentNode = node;
  }

  checkStack(){
    console.log("PILA:", this.nodeStacks);
    return this.nodeStacks;
  }


  updateStack(node: NODO) {
    // Solo agregar el nodo si no es el último en la pila
    if (this.nodeStacks.length === 0 || this.nodeStacks[this.nodeStacks.length - 1] !== node) {
        this.nodeStacks.push(node);
        console.log("stack actualizada: ", this.nodeStacks);
    }
}


  navigateToParent(): void {
    // Aquí podrías implementar lógica para volver al padre
    // Pero necesitarías almacenar el padre en algún lugar o usar una pila
    // Para simplicidad, este método podría no hacer nada por ahora.
  }

 
  getCurrentNode(): NODO{
    const actual = this.currentNode ?? { id: 0, msg: "Nodo no disponible", children: [] }; // Valor predeterminado

    console.log("NODO ACTUAL:", this.currentNode);
    return actual;
    
  }

  getCurrentNodeMsg(): string{
    const msg = this.currentNode?.msg ?? "currentNode es nulo";

    console.log(msg);
    return msg;
  }

  getRootId(): number {
    return this.tree.root!.id;
  }
}

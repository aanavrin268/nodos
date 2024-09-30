import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { NODO } from './helper';

@Injectable({
  providedIn: 'root'
})
export class CsvLoaderService {

  constructor() { }

  loadCsv(csvData: string): Promise<NODO> {
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        complete: (results) => {
          const rootNode = this.buildNodeTree(results.data);
          resolve(rootNode);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  private buildNodeTree(data: any[]): NODO {
    const nodes: { [key: number]: NODO } = {};
    let rootNode: NODO | undefined;
  
    // Crear nodos a partir de los datos CSV
    data.forEach(item => {
      const id = parseFloat(item.id);
      //console.log(`Procesando item: ${JSON.stringify(item)}`); 
  
      nodes[id] = {
        id: id,
        msg: item.msg,
        options: item.options ? item.options.split(';') : [],
        children: [] 
      };
  
      if (item.nivel === 'padre') {
        rootNode = nodes[id];
        console.log(`Nodo raíz encontrado: ${JSON.stringify(rootNode)}`); // Log para nodo raíz
      }
    });
  
    if (!rootNode) {
      console.error("Nodos creados sin raíz:", nodes);
      throw new Error("No se encontró un nodo raíz en los datos CSV");
    }
  
    data.forEach(item => {
      const id = parseFloat(item.id);
      const parentId = item.parentId ? parseFloat(item.parentId) : null;
  
      if (parentId !== null && nodes[parentId]) {
        nodes[parentId].children.push(nodes[id]);
        //console.log(`Agregado nodo ${id} como hijo de ${parentId}`); 
      }
    });
  
    return rootNode; 
  }
  
}

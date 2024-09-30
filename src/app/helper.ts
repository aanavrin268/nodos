




export interface NODO {
    id: number;
    msg: string;
    options?: string[];
    children: NODO[];
}

export interface MENU{
    msg: string;
    options: string[];
    children: NODO[];
}


export interface TREE{
    valInitial: boolean;
    valFinal: boolean;
    root: NODO | null;
}
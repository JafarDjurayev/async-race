export interface Car {
    name: string,
    color: string,
    id: number
}


export interface Winners {
    id:number,
    wins:number,
    time:number
}

export type EngineStatus = 'started' | 'stopped' | 'drive';


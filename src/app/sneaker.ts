export interface NameId {
    id: number,
    name: string

}

export interface Size {
    id: number,
    eu: string
}

export class Sneaker {

    constructor(
        public name: string,
        public image: string,
        public brandId: number,
        public brand: NameId,
        public genderId: number,
        public gender: NameId,
        public typeId: number,
        public type: NameId,
        public sizes: Size[]
    ) { }
}

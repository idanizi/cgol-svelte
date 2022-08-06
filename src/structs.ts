export class CellStruct {
    neighbors: any[];
    isAlive: boolean;
    x: number;
    y: number;

    public shouldLive(): boolean {
        // todo
        return false;
    }
}

export class BoardStruct {
    cells: CellStruct[][] = [];

    constructor(width: number, height: number) {
        this.cells = Array.from({length: width}, (_, x) => Array.from({length: height}, (_, y): CellStruct => {
            let cellStruct = new CellStruct()
            cellStruct.x = x;
            cellStruct.y = y;
            return cellStruct;
        }))
        this.linkNeighbors()
    }

    flatCells(): CellStruct[]{
        const flat = [] as CellStruct[];
        for (let row of this.cells) {
            for (let cell of row) {
                flat.push(cell);
            }
        }

        return flat;
    }

    public get(x: number, y: number): CellStruct | null {
        if (0 <= x && x < this.cells.length && 0 <= y && y <= this.cells[x].length) {
            return this.cells[x][y]
        }
        return null;
    }

    public next() {
        for (let cell of this.flatCells()) {
            cell.isAlive = cell.shouldLive()
        }
    }

    public linkNeighbors() {
        for (let x = 0; x < this.cells.length; x++) {
            for (let y = 0; y < this.cells[x].length; y++) {
                const cell = this.cells[x][y];
                let north, east, south, west, northwest, northeast, southwest, southeast;
                north = this.get(x, y - 1)
                east = this.get(x + 1, y)
                south = this.get(x, y + 1)
                west = this.get(x - 1, y)
                northwest = this.get(x - 1, y - 1)
                northeast = this.get(x + 1, y - 1)
                southwest = this.get(x - 1, y + 1)
                southeast = this.get(x + 1, y + 1)
                cell.neighbors = [north, east, south, west, northwest, northeast, southwest, southeast];
            }
        }
    }
}

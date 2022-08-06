import {cloneDeep, compact} from 'lodash'

export class CellStruct {
    neighbors: any[] = [];
    isAlive: boolean = false;
    x: number;
    y: number;

    /**
     * Any live cell with fewer than two live neighbours dies, as if by underpopulation.
     * Any live cell with two or three live neighbours lives on to the next generation.
     * Any live cell with more than three live neighbours dies, as if by overpopulation.
     * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     *
     * These rules, which compare the behavior of the automaton to real life, can be condensed into the following:
     * Any live cell with two or three live neighbours survives.
     * Any dead cell with three live neighbours becomes a live cell.
     * All other live cells die in the next generation. Similarly, all other dead cells stay dead.
     */
    public shouldLive(): boolean {
        const liveNeighborsCount: number = this.neighbors.filter(x => x.isAlive).length
        if (this.isAlive) {
            return !(liveNeighborsCount < 2 || liveNeighborsCount > 3);
        }
        return liveNeighborsCount === 3;
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

    public flatCells(): CellStruct[] {
        const flat = [] as CellStruct[];
        for (let row of this.cells) {
            for (let cell of row) {
                flat.push(cell);
            }
        }
        return flat;
    }

    toString() {
        let s: string = '';
        for (let row of this.cells) {
            for (let cell of row) {
                s += cell.isAlive ? '1' : '0'
            }
            s += '\n'
        }

        return s;
    }

    debug(...msg) {
        if (msg.length) {
            msg.push("\n")
        }
        console.debug(...msg, this.toString())
    }

    public get(x: number, y: number): CellStruct | null {
        if (0 <= x && x < this.cells.length && 0 <= y && y <= this.cells[x].length) {
            return this.cells[x][y]
        }
        return null;
    }

    public next() {
        const flat = this.flatCells()
        const snapshot = cloneDeep(flat)
        for (let i = 0; i < flat.length; i++) {
            flat[i].isAlive = snapshot[i].shouldLive()
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
                cell.neighbors = compact([north, east, south, west, northwest, northeast, southwest, southeast]);
            }
        }
    }
}

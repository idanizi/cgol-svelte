<script lang="ts">
    import Cell from "./Cell.svelte";
    import {BoardStruct} from '../structs'
    import * as cfg from '../config'
    import Stats from "./Stats.svelte";

    let board = new BoardStruct(10, 10)
    let play: boolean = false
    let intervalId: number;

    function next() {
        if (!board.isAlive() || !board.isEvolving()) {
            if (!board.isAlive()) {
                alert("No live cells on board 😵")
            } else {
                alert("Board is stuck 🙅‍")
            }
            clearInterval(intervalId)
            play = false
            return;
        }

        board = board.next()
    }

    function toggleCell(x: number, y: number) {
        board.cells[x][y].isAlive = !board.cells[x][y].isAlive
    }

    function playPause() {
        play = !play
        clearInterval(intervalId)
        if (play) {
            intervalId = setInterval(next, cfg.timeout)
            return
        }
    }

    function random() {
        board = board.random()
    }

    function zero() {
        board = board.zeroStats()
    }

    function kill() {
        board = board.kill()
    }

    function setBoardSize(width: number, height: number) {
        board = new BoardStruct(width, height);
    }
</script>

<section>
    <div class="board">
        {#each board.cells as row, x}
            <div class="row">
                {#each row as cell, y}
                    <Cell isAlive={cell.isAlive} on:toggle={() => toggleCell(x, y)}/>
                {/each}
            </div>
        {/each}
    </div>

    <aside class="buttons">
        <button on:click={next}>
            Next Step
        </button>

        <button on:click={playPause}>
            {#if !play}
                Play ▶️
            {:else}
                Pause ⏸
            {/if}
        </button>

        <button on:click={random}>
            Random 🎲
        </button>

        <button on:click={zero}>
            Zero Stats 👌
        </button>

        <button on:click={kill}>
            Kill All 💀
        </button>

        <div class="size">
            Size:
            <input type="number" value={board.width()} on:change={(e) => setBoardSize(e.target.value, board.height())}/>
            /
            <input type="number" value={board.height()} on:change={(e) => setBoardSize(board.width(),e.target.value)}/>
        </div>
    </aside>

    <footer>
        <Stats board={board}/>
    </footer>
</section>

<style lang="scss">
  @import "../const";

  section {
    display: grid;
    grid-template:
        "board aside" auto
        "stats stats" auto
        /auto auto;

    .board {
      grid-area: board;
    }

    aside {
      grid-area: aside;
    }

    footer {
      grid-area: stats;
    }

  }

  .row {
    display: flex;
    flex-wrap: nowrap;
  }

  .board {
    background-color: $board_color;
    display: flex;
    flex-direction: column;
    border: $border_config;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  button {
    cursor: pointer;

    &:hover {
      background: #6a8898;
    }
  }

  .size, button {
    margin: 0 .2em .2em;
    border-radius: 10px;
    background: #7998ab;
    padding: .8em;
    text-align: center;
  }
</style>

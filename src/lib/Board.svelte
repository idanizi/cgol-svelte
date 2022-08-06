<script lang="ts">
    import Cell from "./Cell.svelte";
    import {BoardStruct} from '../structs'

    let board = new BoardStruct(10, 10)
    let play: boolean = false

    function next() {
        board = board.next()
    }

    function toggleCell(x: number, y: number) {
        board.cells[x][y].isAlive = !board.cells[x][y].isAlive
    }

    function playPause() {
        play = !play
    }

    board.cells[4][2].isAlive = true
    board.cells[5][2].isAlive = true
    board.cells[6][3].isAlive = true
    board.cells[7][3].isAlive = true
    board.cells[8][3].isAlive = true
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
    </aside>
</section>

<style lang="scss">
  @import "../const";

  section {
    display: flex;
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
    margin: 0 .2em .2em;
    border-radius: 10px;
    background: #7998ab;
    padding: .8em;
    text-align: center;

    &:hover {
      background: #6a8898;
    }
  }
</style>

<script lang="ts">
    import Cell from "./Cell.svelte";
    import {BoardStruct} from '../structs'

    let board = new BoardStruct(10, 10)

    board.cells[4][2].isAlive = true
    board.cells[5][2].isAlive = true
    board.cells[4][3].isAlive = true
</script>

<div class="board">
    {#each board.cells as row}
        <div class="row">
            {#each row as cell}
                <Cell isAlive={cell.isAlive}/>
            {/each}
        </div>
    {/each}
</div>

<button on:click={board.next}>
    Next
</button>

<style lang="scss">
  @import "../const";

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

  button {
    cursor: pointer;
    margin: 0 .2em;
    border-radius: 10px;
    background: #7998ab;
    padding: .8em;
    &:hover {
      background: #6a8898;
    }
  }
</style>

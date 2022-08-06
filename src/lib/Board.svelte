<script lang="ts">
    import Cell from "./Cell.svelte";

    let cells: number[][]

    function initBoard(width, height) {
        return Array.from({length: width}, () => Array.from({length: height}, (): number => 0))
    }

    cells = initBoard(10, 10)
    cells[4][3] = 1
</script>

<div class="board">
    {#each cells as row}
        <div class="row">
            {#each row as cell}
                <Cell isAlive={cell}/>
            {/each}
        </div>
    {/each}
</div>

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
</style>

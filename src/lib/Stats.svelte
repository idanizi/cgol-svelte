<script lang="ts">
    import {BoardStruct} from "../structs";

    export let board: BoardStruct;
</script>

<div>
    <span>
        Born: {board.bornCount}
    </span>
    <span>
        Death Toll: {board.deathCount}
    </span>
    <span>
        Prosperity: {board.prosperity().toFixed(2) + '%'}
    </span>
    <span>
        Evolutions: {board.evolutionsCount}
    </span>
</div>

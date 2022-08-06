<script>
    import Board from "./lib/Board.svelte";
    import svelteSvg from "./assets/svelte.svg"
</script>


<main>
    <header>
        <h1>
            Conway Game of Life
        </h1>
    </header>
    <section>
        <Board/>
    </section>
    <footer>
        <p>
            Made with &nbsp; <img src={svelteSvg}/> &nbsp; by &nbsp; <strong>Idan Izicovich</strong>
        </p>
    </footer>
</main>


<style lang="scss">
  h1, h2 {
    margin: 1em auto 0;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
    margin: .5em 0;
    font-weight: 600;
    background-image: linear-gradient(to left, #553c9a, #b393d3);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    header {
      flex: 0 1 auto;
    }

    section {
      flex: 1 0 auto;
    }

    footer {
      flex: 0 1 auto;

      p {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 1.5em;
        }
      }

      width: 100%;
      background-color: #6a8898;
    }
  }
</style>

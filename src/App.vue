<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.controls {
    margin: 1em auto;
    max-width: 900px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 2em;
    margin-bottom: 2em;
    border-bottom: 1px solid #f0f0f0;
}

.parameter {
    padding: 1em;
    border: 1px solid #555;
    margin: .75em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 20%;
}

span.parameter__label {
    text-transform: uppercase;
    font-size: 90%;
    display: block;
    margin-bottom: .5em;
    color: #f0f0f0;
}

.output {
    background: #fff;
    color: #3d3d3d;
    padding: 1em 0;
    font-size: 120%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

body {
    margin: 0;
    padding: 0;
    background-color: #303030;
    color: #f0f0f0;
}

.output .parameter__label {
    color: #3d3d3d;
}

input.parameter__value {
    background: transparent;
    border: 1px solid #444;
    padding: .5em;
    color: #fff;
    text-align: center;
    font-size: 139%;
    /* display: inline; */
}

input[type="checkbox"] {
    width: 1em;
    height: 1em;
}

.home {
    padding-bottom: 250px;
}

h2 {
    color: #fff;
    flex-basis: 100%;

}

.output h2 {
    color: #3d3d3d;
    margin: .25em 0;
}

.parameter__value--pending {
    font-size: 70%;
    opacity: .6;
    text-transform: uppercase;
    margin-top: .5em;
}

.section-note {
    flex-basis: 100%;
}

</style>

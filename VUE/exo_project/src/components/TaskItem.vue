<template>
    <div class="task-item">
      <p id="one">{{ titre }}</p>
      <p id="two">{{ est_terminee }}</p>
      <p id="three">{{ utilisateur_id }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TaskItem',
    props: {
      titre: String,
      est_terminee: Boolean,
      utilisateur_id: Number
    }
  }
  </script>
  
  <style scoped>
  .task-item {
    display: flex;
    align-items: center;
    width: 90%;
    margin: 10px auto;
    background-color: #2c2c2c;
    border-radius: 10px;
  }

  .task-item > *{
    color: white;
    padding: 0 10px;
  }
  
  #one {
    flex: 2;
  }
  
  #two {
    flex: 1;
  }
  
  #three {
    flex: 1;
  }
  </style>
  
<template>
    <div id="app">
      <h2>Liste des différentes tâches :</h2>
  
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher une tâche par titre"
        class="search-input"
      />
  
      <div class="list-Tache">
        <div v-if="filteredTasks.length > 0">
          <TaskItem
            v-for="task in filteredTasks"
            :key="task.id"
            :titre="task.titre"
            :est_terminee="task.est_terminee === 1"
            :utilisateur_id="task.user_id"
          />
        </div>
        <p v-else>Aucune tâche trouvée pour cet utilisateur.</p>
      </div>
  
      <div class="form-add">
        <addTaskVue @taskAdded="addTask" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import TaskItem from "../components/TaskItem.vue";
  import addTaskVue from '../components/addTask.vue';
  
  export default {
    name: "PageAcceuil",
    components: {
      TaskItem,
      addTaskVue
    },
    data() {
      return {
        tasks: [],
        searchQuery: '', 
      };
    },
  
    computed: {
      filteredTasks() {
        return this.tasks.filter(task => 
          task.titre.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  
    mounted() {
      axios.get("http://127.0.0.1:5000/api/users/2/tasks").then((response) => {
        this.tasks = response.data.tasks;
      });
    },
  
    methods: {
      addTask(newTask) {
        this.tasks.push(newTask);
      }
    }
  };
  </script>
  
  <style>
  .list-Tache {
    height: 500px;
    overflow-y: auto;
    width: 100%;
  }
  
  .form-add{
    margin: 50px auto;
    width: 100%;
  }
  
  .search-input {
    margin-bottom: 20px;
    padding: 10px;
    width: 100%;
    font-size: 16px;
  }
  </style>
  
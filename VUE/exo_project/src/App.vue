<template>
  <div id="app">


    <h2>Liste des différentes tâches :</h2>

    <div class="list-Tache">
      <div v-if="tasks.length > 0">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :titre="task.titre"
          :est_terminee="task.est_terminee === 1"
          :utilisateur_id="task.user_id"
        />
      </div>
      <p v-else>Aucune tâche trouvée pour cet utilisateur.</p>
    </div>


    <div class="add-task">
      <label>Titre de la tache à rajouter : </label>
      <input placeholder="Votre titre">
      <button>rajouter</button>
    </div>

  </div>

</template>

<script>
import axios from "axios";
import TaskItem from "./components/TaskItem.vue";

export default {
  name: "App",
  components: {
    TaskItem,
  },
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:5000/api/users/2/tasks").then((response) => {
      this.tasks = response.data.tasks;
    });
  },
};
</script>

<style>
.list-Tache{
  height: 500px;
  overflow-y: auto;
  widows: 100%;
}
</style>

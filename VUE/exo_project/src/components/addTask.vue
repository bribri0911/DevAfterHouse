<template>
  <form @submit.prevent="addTask" class="add-task">
    <label>Titre de la tache à rajouter : </label>
    <input v-model="newTaskTitle" placeholder="Votre titre" />
    <button type="submit">Rajouter</button>
  </form>
</template>
  
<script>
import axios from "axios";

export default {
  name: "addTask",
  data() {
    return {
      newTaskTitle: "",
    };
  },
  methods: {
    addTask() {
  if (!this.newTaskTitle) {
    alert("Le titre de la tâche ne peut pas être vide.");
    return;
  }

  axios
    .post("http://127.0.0.1:5000/api/tasks", {
      title: this.newTaskTitle,
      user_id: 2,
    })
    .then((response) => {
      console.log("Réponse de l'API:", response); // Ajoute ceci pour voir ce qui est retourné par l'API

      // Vérifier la structure de la réponse
      if (response.data && response.data.task) {
        this.newTaskTitle = ""; // Réinitialiser le titre

        // Informer le parent de l'ajout de la tâche
        this.$emit("task-added", response.data.task);
      } else {
        console.error("Erreur : Tâche non renvoyée correctement");
        alert("Une erreur est survenue lors de l'ajout de la tâche.");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de la tâche:", error);
      alert("Il y a eu une erreur lors de l'ajout de la tâche.");
    });
}
,
  },
};
</script>
  
  
<style scoped>
.add-task {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.add-task > * {
  margin: 0 50px;
}

.add-task input {
  margin-bottom: 10px;
  padding: 8px;
}

.add-task button {
  padding: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.add-task button:hover {
  background-color: #45a049;
}
</style>
  
<template>
  <div id="app">
    <div class="sidebar">
      <!-- Navigation links -->
      <router-link to="/words" exact class="menu-item">
        <i class="comment outline icon"></i> Words
      </router-link>
      <router-link to="/words/new" class="menu-item">
        <i class="plus circle icon"></i> New
      </router-link>
      <router-link to="/test" class="menu-item">
        <i class="graduation cap icon"></i> Test
      </router-link>
      <router-link to="/baont" class="menu-item">
        <i class="user icon"></i> baont
      </router-link>
    </div>

    <div class="content">
      <!-- Render the current route's component here -->
      <div class="ui container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* General layout */
#app {
  display: flex;
  min-height: 100vh;
}

/* Navbar */
#app > div.navbar {
  margin-bottom: 1.5em;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.menu-item {
  color: white;
  padding: 10px;
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 10px;
  transition: background 0.3s;
}

.menu-item:hover {
  background-color: #34495e;
  border-radius: 5px;
}

/* Content area */
.content {
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1;
}

/* Flash message */
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50px; /* Assuming top: 50px was intended */
  right: 0;
}

/* Form and button styles */
input {
  width: 300px;
}

div.label {
  width: 120px;
}

div.input {
  margin-bottom: 10px;
}

button.ui.button {
  margin-top: 15px;
  display: block;
}

/* Container styling */
.ui.container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ui.container h1 {
  margin-top: 0;
}

.ui.container table {
  margin-top: 20px;
}

</style>

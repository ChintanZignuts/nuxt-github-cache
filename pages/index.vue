<script setup>
const user = ref("octocat");
const repos = ref(null);
const responseTimeMs = ref(0);
const fetchRepos = async () => {
  const start = performance.now();

  const { data } = await useFetch(`/api/github/repos?user=${user.value}`, {
    key: user.value,
  });
  const end = performance.now();

  repos.value = data.value;
  responseTimeMs.value = Math.round(end - start);
};
</script>

<template>
  <div class="p-4">
    <input
      v-model="user"
      @keyup.enter="fetchRepos"
      class="border p-2"
      placeholder="Enter GitHub username"
    />
    <button
      @click="fetchRepos"
      class="ml-2 px-3 py-2 bg-blue-600 text-white rounded"
    >
      Fetch Repos
    </button>

    <div v-if="repos?.data" class="mt-4">
      <p>⏱ Response Time: {{ responseTimeMs }} ms</p>
      <ul>
        <li v-for="repo in repos.data" :key="repo.id">
          <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

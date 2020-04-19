<template>
  <nav class="pagination-container">
    <ul class="pagination">
      <li
        @click="
          changePage(
            currentPage > totalPages[0] ? currentPage - 1 : totalPages[0]
          )
        "
        class="page-item"
      >
        <p class="page-link">Anterior</p>
      </li>
      <div v-for="(page, index) in totalPages" :key="index">
        <li class="page-item">
          <p
            :class="{ 'page-selected': page === currentPage }"
            class="page-link"
            @click="changePage(page)"
          >
            {{ page }}
          </p>
        </li>
      </div>

      <li
        @click="
          changePage(
            currentPage < totalPages[totalPages.length - 1]
              ? currentPage + 1
              : totalPages[totalPages.length - 1]
          )
        "
        class="page-item"
      >
        <p class="page-link">Próxima</p>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: ["items", "totalPages", "currentPage"],
  methods: {
    changePage(page) {
      this.$emit("click", page);
    }
  }
};
</script>

<style>
.pagination-container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.page-link:hover {
  cursor: pointer;
  background-color: #007bff;
  color: white !important;
}

.page-selected {
  background-color: #007bff;
  color: white !important;
}
</style>

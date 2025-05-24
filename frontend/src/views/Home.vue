<template>
    <div>
      <ProductForm
        :editing="editingProduct"
        :onSave="fetchProducts"
        @doneEditing="editingProduct = null"
      />
      <hr />
      <h1>Daftar Produk</h1>
      <div v-if="loading">Memuat...</div>
      <div v-else class="grid">
        <ProductCard
          v-for="p in products"
          :key="p._id"
          :product="p"
          @edit="editingProduct = $event"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import ProductCard from '@/components/ProductCard.vue'
  import ProductForm from '@/components/ProductForm.vue'
  
  const products = ref([])
  const loading = ref(true)
  
  const editingProduct = ref(null)
  
  onMounted(async () => {
    await fetchProducts()
    loading.value = false
  })
  
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products')
      products.value = await res.json()
    } catch (err) {
      console.error(err)
    }
  }
  </script>  
<template>
    <div class="card">
      <img :src="product.image" alt="product" width="100" />
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p><strong>Rp{{ product.price }}</strong></p>
      <button @click="emitEdit">Edit</button>
      <button @click="deleteProduct">Hapus</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({ product: Object })
  const emit = defineEmits(['edit'])
  
  const emitEdit = () => {
    emit('edit', props.product)
  }
  
  const deleteProduct = async () => {
    if (confirm(`Hapus produk "${props.product.name}"?`)) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${props.product._id}`, {
          method: 'DELETE'
        })
        if (!res.ok) throw new Error('Gagal hapus produk')
        alert('Produk dihapus!')
        location.reload()
      } catch (err) {
        console.error(err)
        alert('Gagal menghapus produk')
      }
    }
  }
  </script>  
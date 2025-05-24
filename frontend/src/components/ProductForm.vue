<template>
    <form @submit.prevent="submitProduct">
      <input v-model="name" placeholder="Nama produk" required />
      <textarea v-model="description" placeholder="Deskripsi produk" />
      <input v-model.number="price" placeholder="Harga" type="number" required />
      <input v-model="image" placeholder="Link gambar" />
      <input v-model.number="stock" placeholder="Stok" type="number" />
      <button type="submit">{{ props.editing ? 'Update' : 'Tambah' }} Produk</button>
    </form>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'

const props = defineProps({ editing: Object, onSave: Function })
const emit = defineEmits(['doneEditing'])

const name = ref('')
const description = ref('')
const price = ref(0)
const image = ref('')
const stock = ref(0)

watch(() => props.editing, (val) => {
  if (val) {
    name.value = val.name
    description.value = val.description
    price.value = val.price
    image.value = val.image
    stock.value = val.stock
  }
})

const submitProduct = async () => {
  const payload = {
    name: name.value,
    description: description.value,
    price: price.value,
    image: image.value,
    stock: stock.value
  }

  try {
    let res
    if (props.editing) {
      res = await fetch(`http://localhost:5000/api/products/${props.editing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    } else {
      res = await fetch(`http://localhost:5000/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    }

    if (!res.ok) throw new Error('Gagal simpan')
    alert('Produk disimpan!')
    props.onSave()
    emit('doneEditing')
    name.value = ''
    description.value = ''
    price.value = 0
    image.value = ''
    stock.value = 0
  } catch (err) {
    alert('Terjadi kesalahan')
  }
}
  </script>  
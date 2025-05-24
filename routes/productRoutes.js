import express from 'express'
import Product from '../models/productModel.js'
import { getProducts, createProduct } from '../controllers/productController.js'

const Router = express.Router()

Router.get('/', getProducts)
Router.post('/', createProduct)

Router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ message: 'Produk tidak ditemukan' })
        res.json({ message: 'Produk dihapus' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

Router.put('/:id', async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updated) return res.status(404).json({ message: 'Produk tidak ditemukan' })
        res.json(updated)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

export default Router
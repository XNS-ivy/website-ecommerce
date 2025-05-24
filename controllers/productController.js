import Product from "../models/productModel.js"

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createProduct = async (req, res) => {
    const { name, description, price, image, stock } = req.body
    try {
        const newProduct = new Product({ name, description, price, image, stock })
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export { getProducts, createProduct }
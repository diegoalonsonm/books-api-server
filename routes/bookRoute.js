import express from 'express'
import { Book } from '../models/bookModel.js'

export const bookRouter = express.Router()

bookRouter.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).json(books)
    } catch (err) {
        console.log('Error: ', err.message)
        res.status(404).json({message: 'No books found'})
    }
})

bookRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)

        return res.status(200).json(book)
    } catch (err) {
        console.log('Error: ', err.message)
        res.status(404).json({message: 'Book not found'})
    }
})

bookRouter.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({message: 'All fields are required'})
        }

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        })

        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch (err) {
        console.log('Error: ', err.message)
        res.status(500).json({message: 'Server error'})
    }
})

bookRouter.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({message: 'All fields are required'})
        }

        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).json({message: 'Book not found'})
        }
        res.status(200).json({message: 'Book updated'})
    } catch (err) {
        console.log('Error: ', err.message)
        res.status(404).json({message: 'Book not found'})
    }
})

bookRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).json({message: 'Book not found'})
        }
        res.status(200).json({message: 'Book deleted'})
    } catch (err) {
        console.log('Error: ', err.message)
        res.status(404).json({message: 'Book not found'})
    }
})
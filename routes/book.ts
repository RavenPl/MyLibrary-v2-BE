import {Router} from "express";
import {BookRecord} from "../records/book-record";
import {ValidationError} from "../utils/errors";
import {CreateBookEntity} from "../types";

export const BookRouter = Router();

BookRouter

    .get('/', async (req, res) => {

        const found = await BookRecord.getAll();

        res.render('home', {found})
    })

    .get('/:id', async (req, res) => {

        const found = await BookRecord.getOne(req.params.id);
        if (!found) {
            throw new ValidationError('There is no book with this ID')
        }

        res.render('book-edit', {found})
    })

    .post('/', async (req, res) => {

        const newBook = new BookRecord(req.body as CreateBookEntity);
        await newBook.insert();

        res
            .redirect('/')
    })

    .delete('/:id', async (req, res) => {

        const found = await BookRecord.getOne(req.params.id);
        if (!found) {
            throw new ValidationError('There is no such book with that ID!')
        }
        await found.delete();

        res.redirect('/')
    })
    .put('/:id', async (req, res) => {

        const found = await BookRecord.getOne(req.params.id);
        if (!found) {
            throw new ValidationError('Wrong id!')
        }
        await found.update(req.body);

        res.redirect('/')
    })
import {Router} from "express";
import {BookRecord} from "../records/book-record";
import {NoFoundError, ValidationError} from "../utils/errors";
import {CreateBookEntity} from "../types";

export const BookRouter = Router();

BookRouter

    .get('/', async (req, res) => {

        res.render('home', {
            books: await BookRecord.getAll(),
        })
    })

    .get('/:id', async (req, res) => {


        const found = await BookRecord.getOne(req.params.id);
        if (!found) {
            throw new NoFoundError()
        }

        res.render('book-edit', {found})
    })

    .post('/', async (req, res) => {

        const newBook = new BookRecord(req.body as CreateBookEntity);
        await newBook.insert();

        res
            .redirect('/book')
    })

    .delete('/:id', async (req, res) => {

        const found = await BookRecord.getOne(req.params.id);
        if (!found) {
            throw new ValidationError('There is no such book with that ID!')
        }
        await found.delete();

        res.redirect('/book')
    })

    .put('/edit/:id', async (req, res) => {

        const found = await BookRecord.getOne(req.params.id);
        if (!found) {
            throw new ValidationError('Wrong id!')
        }
        await found.update(req.body);

        res.redirect('/book')
    })
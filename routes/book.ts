import {Router} from "express";
import {BookRecord, CreateBookEntity} from "../records/book-record";
import {ValidationError} from "../utils/errors";

export const BookRouter = Router();

BookRouter

    .get('/', async (req, res) => {

        const resp = await BookRecord.getAll();
        res.render('home', {resp})
    })

    .get('/:id', async (req, res) => {

        const {id} = req.params;

        const resp = await BookRecord.getOne(id);
        if (!resp) {
            throw new ValidationError('There is no book with this ID')
        }

        res.render('book-edit', {resp})
    })

    .post('/', async (req, res) => {

        const newBook = new BookRecord(req.body as CreateBookEntity);
        await newBook.insert();

        res
            .redirect('/')
    })

    .delete('/:id', async (req, res) => {

        const {id} = req.params
        const found = await BookRecord.getOne(id);

        if (!found) {
            throw new ValidationError('There is no such book with that ID!')
        }

        await found.delete();

        res.redirect('/')
    })
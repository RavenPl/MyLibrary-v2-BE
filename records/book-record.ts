import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid'
import {ValidationError} from "../utils/errors";
import {BookEntity, BookRecordResults} from "../types";


export class BookRecord implements BookEntity {

    id: string;
    title: string;
    author: string;
    pages: number;
    status: string;

    constructor(obj: BookRecord) {

        this.id = obj.id;
        this.title = obj.title;
        this.author = obj.author;
        this.pages = obj.pages;
        this.status = obj.status;

        if (obj.title === "" || obj.title.length < 2 || obj.title.length > 100) {
            throw new ValidationError('Book title should have at least 2 characters, but no more than 100!');
        }

        if (obj.author === "" || obj.author.length < 2 || obj.author.length > 100) {
            throw new ValidationError('Book author should have at least 2 characters but no more than 100!');
        }

        if (obj.pages < 10 || obj.pages > 3000) {
            throw new ValidationError('Book pages should have at least 10 pages but no more than 3000!');
        }

    }

    static async getAll(): Promise<BookRecord[] | null> {

        const [resp] = await pool.execute('SELECT * FROM `books` ORDER BY `title` ASC') as BookRecordResults;
        return resp.length === 0 ? null : resp.map(obj => new BookRecord(obj))
    }

    static async getOne(id: string): Promise<BookRecord> {

        const [book] = await pool.execute('SELECT * FROM `books` WHERE `id` = :id', {id}) as BookRecordResults;
        return book.map(obj => new BookRecord(obj))[0]
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid()
        }

        const [allBooks] = await pool.execute('SELECT * FROM `books` ORDER BY `title` ASC') as BookRecordResults;
        const [found] = allBooks.filter(obj => obj.title.toUpperCase() === this.title.toUpperCase());

        if (found) {
            throw new ValidationError('You already have this title!')
        }

        await pool.execute('INSERT INTO `books`(`id`,`title`,`author`,`pages`,`status`) VALUES(:id, :title, :author, :pages, :status)', {
            id: this.id,
            title: this.title,
            author: this.author,
            pages: this.pages,
            status: this.status
        })
    }

    async delete(): Promise<void> {

        await pool.execute('DELETE FROM `books` WHERE `id` = :id', {
            id: this.id
        })
    }

    async update(obj: BookRecord): Promise<void> {

        await pool.execute("UPDATE `books` SET `title` = :title, `author` = :author, `status` = :status, `pages` = :pages WHERE `id` = :id", {
            title: obj.title,
            author: obj.author,
            pages: obj.pages,
            status: obj.status,
            id: this.id,
        })
    }

    async checkUpdatedBookTitle(id: string, titleUpdate: string): Promise<BookRecord | undefined> {

        const listOfBooks = await BookRecord.getAll();
        const filterBooks = listOfBooks ? listOfBooks.filter(book => book.id !== id) : [];

        return filterBooks.find(obj => obj.title.toLowerCase() === titleUpdate.toLowerCase());

    }
}
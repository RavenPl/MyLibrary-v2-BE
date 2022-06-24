import 'express-async-errors';
import express, {json, urlencoded} from "express";
import {engine} from "express-handlebars";
import './utils/db'
import {BookRouter} from "./routes/book";
import {handlebarsHelpers} from "./utils/handlebarsHelpers";
import {handleError} from "./utils/errors";
import methodOverride from "method-override";

const app = express();

app.use(json());
app.use(methodOverride('_method'))
app.use(urlencoded({
    extended: true,
}))
app.use(express.static(__dirname + '/public/'))
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');
app.use('/books', BookRouter);

app.use(handleError);


app.listen(3000, 'localhost', () => {
    console.log('Listening on 3000... http://localhost:3000');
})
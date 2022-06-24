import express, {json, urlencoded} from "express";
import 'express-async-errors';
import './utils/db'
import {engine} from "express-handlebars";
import methodOverride from "method-override";
import {handleError} from "./utils/errors";
import {handlebarsHelpers} from "./utils/handlebarsHelpers";
import {bookRouter} from "./routes/book";
import {homeRouter} from "./routes/home";

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
app.use('/', homeRouter)
app.use('/books', bookRouter);

app.use(handleError);


app.listen(3000, 'localhost', () => {
    console.log('Listening on 3000... http://localhost:3000');
})
import {FieldPacket} from "mysql2";
import {BookRecord} from "../records/book-record";

export interface BookEntity {
    id: string;
    title: string;
    author: string;
    pages: number;
    status: string;
}

export type BookRecordResults = [BookRecord[], FieldPacket[]];




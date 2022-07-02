import {NextFunction, Request, Response} from "express";

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {

    if (err instanceof NoFoundError) {

        res
            .status(404)
            .render('errors', {
                message: 'There is no book with this ID!',
            })
    } else {

        res
            .status(err instanceof ValidationError ? 400 : 500)
            .render('errors', {
                message: err instanceof ValidationError ? err.message : 'Sorry, try again later',
            });
    }

}

export class ValidationError extends Error {
}

export class NoFoundError extends Error {
}

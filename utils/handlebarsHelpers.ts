export const handlebarsHelpers = {

    isRead: (status: string) => {
        return status === 'read' ? 'read' : 'not read'
    },

    selected: (info: string, value: string) => {

        return (info === "" || info === value) && `selected`

    },

    clearButton: (list: boolean) => {
        return list ? 'inline-block' : 'none'
    },

    numberOfBooks: (list: boolean | number) => {
        if (!list) {
            return '0 books'
        } else if (list === 1) {
            return '1 book'
        } else {
            return `${list} books`
        }
    }
}
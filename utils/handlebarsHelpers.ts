export const handlebarsHelpers = {

    isRead: (status: string) => {
        return status === 'read' ? 'read' : 'not read'
    },

    selected: (info: string, value: string) => {

        return (info === "" || info === value) && `selected`

    }
}
export const handlebarsHelpers = {

    isRead: (status: string) => {
        return status === 'read' ? 'read' : 'notRead'
    },

    selected: (info: string, value: string) => {

        if (info === "") {
            return `selected`
        } else {
            return info === value && `selected`
        }
    }
}
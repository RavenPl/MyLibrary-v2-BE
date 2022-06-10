export const handlebarsHelpers = {

    isRead: (status: string) => {
        return status === 'read' ? 'read' : 'not read'
    }
}
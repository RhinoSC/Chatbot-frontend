

export const hasIdParam = (to, from, next) => {
    if (to.params.id === undefined) return from.fullPath
    next()
}
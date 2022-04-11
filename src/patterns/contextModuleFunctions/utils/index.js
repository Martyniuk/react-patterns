function generateId() {
    return Math.random().toString(23).slice(2)
}

export { generateId }
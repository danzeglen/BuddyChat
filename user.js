const users = []

const addUser = (name, room) => {
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if(existingUser) return {error: "username has already been taken"}
    if(!name && !room) return {error: "username and room required"}
    if(!name) return {error: "username is required"}
    if(!room) return {error: "room is required"}

    const user = {name, room}
    users.push(user)

    return {user}
}

const getUser = id => {
    let user = users.find(user => user.id == id)

    return user
}

const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id ===id );
    if(index !== -1) return users.splice(index,1)[0]
}

const getUsers = (room) => users.filter(user => user.room === room)

module.exports = {addUser, getUser, deleteUser, getUsers}
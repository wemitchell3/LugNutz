const url = "http://localhost:8088";

export default {
    getAll() {
        return fetch(`${url}/users`).then(l => l.json())
    },
    postUser(newUser) {
        return fetch(`${url}/users`, {
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(data => data.json())
    }
}
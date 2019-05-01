const url = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${url}/garage/${id}`).then(l => l.json())
    },
    getAll(currentUserId) {
        return fetch(`${url}/garage?userId=${currentUserId}&isComplete=false`).then(l => l.json())
    },
    postVehicle(newVehicle) {
        return fetch(`${url}/garage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newVehicle)
        }).then(data => data.json())
    }
}
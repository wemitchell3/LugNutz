const url = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${url}/maintenanceTasks/${id}`).then(l => l.json())
    },
    getAll(currentUserId) {
        return fetch(`${url}/maintenanceTasks?userId=${currentUserId}&isComplete=false`)
        .then(l => l.json())
    },
    getVehicleTasks(currentUserId, vehicleId) {
        return fetch(`${url}/maintenanceTasks?userId=${currentUserId}&vehicleId=${vehicleId}&isComplete=false`)
        .then(l => l.json())
    },
    postTask(newTask) {
        return fetch(`${url}/maintenanceTasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(data => data.json())
    },
    putTask(editedTask) {
        return fetch(`${url}/maintenanceTasks/${editedTask.id}`, {
            method:"PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(editedTask)
        }).then(data => data.json())
    },
    patchTask(editedTask) {
        return fetch(`${url}/maintenanceTasks/${editedTask.id}`, {
            method:"PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(editedTask)
        }).then(data => data.json())
    },
    deleteTask(id) {
        return fetch(`${url}/maintenanceTasks/${id}`, {
            method: "DELETE"
        })
    }
}
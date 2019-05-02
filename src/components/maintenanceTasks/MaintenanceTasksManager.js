const url = "http://localhost:8088"

export default {
    getAll(currentUserId) {
        return fetch(`${url}/maintenanceTasks?userId=${currentUserId}&isComplete=false`)
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
    }
}
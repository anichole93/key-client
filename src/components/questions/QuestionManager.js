export const getQuestions = () => {
    return fetch("http://localhost:8000/questions", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}
export const getSingleQuestion = (id) => {
    return fetch(`http://localhost:8000/questions/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const createQuestion = (question) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        },
        body: JSON.stringify(question)
    }
    return fetch(`http://localhost:8000/questions`, fetchOptions)
        .then(res => res.json())
        .then(getQuestions)
}

export const updateQuestion = (question, id) => {
    return fetch(`http://localhost:8000/questions/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        },
        body: JSON.stringify(question)
    })
        .then(getQuestions)
}

export const deleteQuestion = questionId => {
    return fetch(`http://localhost:8000/questions/${questionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    }).then(getQuestions)
};

export const searchQuestions = (searchTerm, projectId) => {
    return fetch(`http://localhost:8000/questions?q=${searchTerm}&project_id=${projectId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const getQuestionsByProject= (projectId) => {
    return fetch(`http://localhost:8000/questions?project_id=${projectId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}
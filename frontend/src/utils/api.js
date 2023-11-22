import { URL } from "./constants"
import { formatDateTimeToDate } from "./utils"

const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return res.json().then((err) => Promise.reject(err))
}
const headersWithContentType = { "Content-Type": "application/json" }

export const registerUser = (
    username,
    password,
    email,
    phone,
    car_brand,
    car_model
) => {
    return fetch(`${URL}/clients/`, {
        method: "POST",
        headers: headersWithContentType,
        body: JSON.stringify({
            username,
            password,
            email,
            phone,
            car_brand,
            car_model,
        }),
    }).then(checkResponse)
}

export const loginUser = (username, password) => {
    return fetch(`${URL}/token/login/`, {
        method: "POST",
        headers: headersWithContentType,
        body: JSON.stringify({ username, password }),
    })
        .then(checkResponse)
        .then((data) => {
            if (data.auth_token) {
                localStorage.setItem("auth_token", data.auth_token)
                return data
            }
            return null
        })
}

export const logoutUser = () => {
    return fetch(`${URL}/token/logout/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    }).then((res) => {
        if (res.status === 204) {
            localStorage.removeItem("auth_token")
            return res
        }
        return null
    })
}

export const getUser = () => {
    return fetch(`${URL}/clients/me/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    }).then(checkResponse)
}

export const updateUser = (user) => {
    return fetch(`${URL}/clients/me/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(user),
    }).then(checkResponse)
}

export const getAppointments = (datetime) => {
    let date = formatDateTimeToDate(datetime)
    return fetch(`${URL}/appointment/date/${date}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(checkResponse)
}

export const getServiceGroups = () => {
    return fetch(`${URL}/service-groups/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(checkResponse)
}

export const makeRecord = (userId, appointmentId) => {
    return fetch(`${URL}/records/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ client: userId, appointment: appointmentId }),
    }).then(checkResponse)
}

export const getRecord = () => {
    return fetch(`${URL}/records/me/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    }).then(checkResponse)
}

export const deleteRecord = (client) => {
    return fetch(`${URL}/records/${client}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    }).then((res) => {
        if (res.status === 204) {
            return { status: true }
        }
        return { status: false }
    })
}

export const getProducts = (categoryId) => {
    return fetch(`${URL}/products/${categoryId}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(checkResponse)
}

export const getProductsCategory = () => {
    return fetch(`${URL}/products-category/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(checkResponse)
}

export const getServices = (carType, wheelDiameter) => {
    return fetch(
        `${URL}/services/?group__title=${carType}&description=${wheelDiameter}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then(checkResponse)
}

export const getSearchedProducts = (searchValue) => {
    return fetch(`${URL}/searched-products?search=${searchValue}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(checkResponse)
}

export const getFAQ = (searchValue) => {
    return fetch(`${URL}/faq/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(checkResponse)
}

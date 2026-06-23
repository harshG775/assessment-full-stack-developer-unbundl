export class ApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.name = "ApiError"
        this.status = status
    }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
    body?: unknown
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { body, headers, ...rest } = options

    let response: Response

    try {
        response = await fetch(path, {
            ...rest,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body !== undefined ? JSON.stringify(body) : undefined,
        })
    } catch {
        throw new ApiError("Network error — please check your connection.", 0)
    }

    if (!response.ok) {
        throw new ApiError(`Request failed with status ${response.status}`, response.status)
    }

    try {
        return (await response.json()) as T
    } catch {
        throw new ApiError("Received an unexpected response from the server.", response.status)
    }
}

export const api = {
    get: <T>(path: string, options?: RequestOptions) => {
        return request<T>(path, { ...options, method: "GET" })
    },
    post: <T>(path: string, body?: unknown, options?: RequestOptions) => {
        return request<T>(path, { ...options, method: "POST", body })
    },
}

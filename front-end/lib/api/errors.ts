type ApiErrorLike = {
    response?: {
        data?: {
            message?: unknown;
        };
    };
    message?: unknown;
};

export function getErrorMessage(error: unknown, fallback: string) {
    if (typeof error !== "object" || error === null) {
        return fallback;
    }

    const apiError = error as ApiErrorLike;

    if (typeof apiError.response?.data?.message === "string") {
        return apiError.response.data.message;
    }

    if (typeof apiError.message === "string") {
        return apiError.message;
    }

    return fallback;
}

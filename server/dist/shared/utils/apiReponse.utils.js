export function successResponse(data, message) {
    return {
        success: true,
        data,
        message,
    };
}
export function errorResponse(message, error) {
    return {
        success: false,
        message,
        error: error ? error : null,
    };
}
export function apiResponse(res, status, json) {
    return res.status(status).json(json);
}
export function sendToken(res, accessToken, refreshToken) {
    const ACCESS_TOKEN_EXPIRY_MS = Number(process.env.JWT_ACCESS_VALID_SECS) * 1000;
    const REFRESH_TOKEN_EXPIRY_MS = Number(process.env.JWT_REFRESH_VALID_SECS) * 1000;
    res.cookie("refreshToken", refreshToken, {
        maxAge: REFRESH_TOKEN_EXPIRY_MS,
        httpOnly: true,
        domain: ".helixo.com",
        secure: process.env.NODE_ENV === "production",
    });
    res.cookie("accessToken", accessToken, {
        maxAge: ACCESS_TOKEN_EXPIRY_MS,
        httpOnly: true,
        sameSite: "lax",
        domain: ".helixo.com",
        secure: process.env.NODE_ENV === "production",
    });
}
export function removeToken(res) {
    res.cookie("refreshToken", null, {
        maxAge: 0,
        httpOnly: true,
        domain: ".helixo.com",
        secure: process.env.NODE_ENV === "production",
    });
    res.cookie("accessToken", null, {
        maxAge: 0,
        httpOnly: true,
        sameSite: "lax",
        domain: ".helixo.com",
        secure: process.env.NODE_ENV === "production",
    });
}
//# sourceMappingURL=apiReponse.utils.js.map
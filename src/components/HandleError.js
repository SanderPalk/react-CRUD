const errorMessages = {
    429: "Too many requests!! Try again in a minute!",
    403: "Forbidden",
    0: "Unable to communicate with server via HTTP(s)",
    default: "Unknown error"
};

export default function HandleError(errorCode) {
    return alert(errorMessages[errorCode] || errorMessages.default);
}
import { configs } from "../constants";

const getAllCalls = async (currentDate: string) => {
    const filterDate = currentDate
        .replace(new RegExp("/", 'g'), "-")
        .split("-").reverse().join("-");
    const endpoint = `${configs.API_URI}/api/v2/calls/all?d=${filterDate}`;
    const token = localStorage.getItem(configs.TOKEN_NAME);

    if (token == "" || token == null) return null;

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        const resp = await response.json();
        if (!resp.success) return null;
        return resp.payload;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return null;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addNewCall = async (val: any) => {
    const endpoint = `${configs.API_URI}/api/v2/calls/create`;
    const token = localStorage.getItem(configs.TOKEN_NAME);
    if (token == "" || token == null) return { success: false, message: "unauthorized access" };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(val)
        });

        const resp = await response.json();
        return resp;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return { success: false, message: "unknown error" };;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editCall = async (val: any) => {
    const endpoint = `${configs.API_URI}/api/v2/calls/update`;
    const token = localStorage.getItem(configs.TOKEN_NAME);
    if (token == "" || token == null) return { success: false, message: "unauthorized access" };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(val)
        });

        const resp = await response.json();
        return resp;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return { success: false, message: "unknown error" };;
    }
}


export const callService = { getAllCalls, addNewCall, editCall };
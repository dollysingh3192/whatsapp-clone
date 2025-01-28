import { useEffect, useState } from "react";
import { WS_URL } from "../constants";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No token found");
            setLoading(false);
            return;
        }

        const url = `${WS_URL}`;
        const ws = new WebSocket(url);

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: 'auth',
                token
            }));
            setLoading(false);
            setSocket(ws);
        };

    }, []); 

    return {
        socket,
        loading,
        error,
    };
}
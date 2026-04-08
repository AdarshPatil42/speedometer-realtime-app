const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchLatestSpeed = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/speed/latest`);

        if (!res.ok) {
            throw new Error("Failed to fetch latest speed");
        }

        return await res.json();
    } catch (error) {
        console.error("API error:", error);
        return null;
    }
};
import axios from "axios";

export const Log = async (stack, level, pkg, message) => {
    try {
        await axios.post(
            "http://20.244.56.144/evaluation-service/logs",
            {
                stack,
                level,
                package: pkg,
                message,
            },
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_LOGGING_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.warn("Logging failed:", error.message);
    }
};

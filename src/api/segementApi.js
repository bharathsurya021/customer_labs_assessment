import { showToast } from "../components/ToastNotification";

export const saveSegment = async (data) => {
        try {
                const webhookUrl = "https://webhook.site/de331622-643f-4195-976b-a034fc9bef85";
                const response = await fetch(webhookUrl, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                });

                if (!response.ok) {
                        throw new Error("Failed to send data.");
                }
                showToast("success", "Data sent successfully!");
        } catch (error) {
                showToast("error", `Error: ${error.message}`);
        }
};

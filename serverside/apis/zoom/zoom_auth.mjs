import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ZOOM_AUTH_URL = "https://zoom.us/oauth/token";
const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

const getZoomAccessToken = async () => {
    try {
        const response = await axios.post(
            ZOOM_AUTH_URL,
            null,
            {
                params: {
                    grant_type: "account_credentials",
                    account_id: ZOOM_ACCOUNT_ID
                },
                auth: {
                    username: ZOOM_CLIENT_ID,
                    password: ZOOM_CLIENT_SECRET
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("Error getting Zoom access token:", error.response?.data || error.message);
        throw new Error("Failed to get Zoom access token");
    }
};

export default getZoomAccessToken;

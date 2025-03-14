import dotenv from "dotenv";
import axios from "axios";
import getZoomAccessToken from "./zoom_auth.mjs";

dotenv.config();

const PORT = process.env.PORT || 5000;
const ZOOM_API_BASE_URL = process.env.ZOOM_API_BASE_URL;

const createZoomMeeting = async (topic, date, time, duration = 40, hostEmail = "me") => {
    try {
        if (!topic || !date || !time) {
            throw new Error("Topic, date, and time are required.");
        }

        const accessToken = await getZoomAccessToken();

        
        const meetingStartTime = new Date(`${date}T${time}Z`).toISOString();
        console.log(meetingStartTime)

        
        const meetingDuration = parseInt(duration, 10) || 60;

        const response = await axios.post(
            `${ZOOM_API_BASE_URL}/users/${hostEmail}/meetings`,
            {
                topic,
                type: 2, // Scheduled meeting
                start_time: meetingStartTime,
                duration: meetingDuration,
                timezone: "UTC",
                settings: {
                    host_video: true,
                    participant_video: true,
                    join_before_host: false,
                    mute_upon_entry: true,
                    approval_type: 0,
                    waiting_room: true,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return {
            success: true,
            meeting: {
                meetingID: response.data.id,
                meetingTopic: response.data.topic,
                startTime: response.data.start_time,
                joinURL: response.data.join_url,
                hostURL: response.data.start_url,
                password: response.data.password,
            },
        };
    } catch (error) {
        console.error("Error creating Zoom meeting:", error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data || "Failed to create Zoom meeting",
        };
    }
};





export default createZoomMeeting;

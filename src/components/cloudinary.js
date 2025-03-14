import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'ddwdpds5t', 
    api_key: '265515646134327', 
    api_secret: 'EI_nm4KnOzRja3G0lYuI2vLEpWQ',
    secure :true
});

// Function to upload an image to Cloudinary
export const uploadImageToCloudinary = async (imageFile) => {
  try {
    const response = await cloudinary.uploader.upload(imageFile, {
      folder: "faculty_profile_pictures", // Optional: Specify a folder in Cloudinary
    });
    return response.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
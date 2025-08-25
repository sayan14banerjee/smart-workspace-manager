const dbVariables = {
  region: process.env.AWS_REGION || "ap-south-1", // Default to Mumbai region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,     // Read from .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Read from .env
};

export default dbVariables;
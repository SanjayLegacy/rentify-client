export const ENV = import.meta.env;
console.log("ENV", ENV);

export const API_URL = ENV.VITE_API_URL;
console.log("API_URL", API_URL);

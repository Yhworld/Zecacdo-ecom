// utils/timeout.js
export const withTimeout = (promise, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Request timed out'));
      }, timeout);
  
      promise
        .then((response) => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  };
  

  export const processImageUrl = (url) => {
    if (url?.startsWith("s3://")) {
      const encodedFilePath = encodeURIComponent(url.substring(5));
      return `${process.env.REACT_APP_API_BASE_URL}rest/files?fileRef=s3%3A%2F%2F${encodedFilePath}`;
    }
    return url || "";
  };
  
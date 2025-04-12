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
  

  const processImageUrl = (url) => {
    if (!url) return '';
  
    const base = process.env.REACT_APP_API_BASE_URL;
    
    if (url.startsWith('fs://') || url.startsWith('s3://')) {
      const encoded = encodeURIComponent(url.substring(5)); // Remove "fs://" or "s3://"
      return `${base}rest/files?fileRef=${url.startsWith('fs://') ? 'fs' : 's3'}%3A%2F%2F${encoded}`;
    }
  
    return url;
  };
  
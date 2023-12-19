import Cookies from 'js-cookie';

const cookieUtils = {
  setCookieValue: (key, value) => {
    Cookies.set(key, value, { expires: 7 }); // Expires in 7 days, adjust as needed
  },
  
  getCookieValue: (key) => {
    return Cookies.get(key);
  },

  addCookieChangeListener: (key, callback) => {
    const listener = (event) => {
      const { detail } = event;
      if (detail && detail.key === key) {
        callback(detail.value);
      }
    };

    document.addEventListener('cookieChange', listener);
  },

  removeCookieChangeListener: (key, callback) => {
    const listener = (event) => {
      const { detail } = event;
      if (detail && detail.key === key) {
        callback(detail.value);
      }
    };

    document.removeEventListener('cookieChange', listener);
  },
  
};

export default cookieUtils;
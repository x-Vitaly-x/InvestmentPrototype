import axios from 'axios';

const instance = axios.create({
  headers: {
    'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content
  }
});

export default instance;

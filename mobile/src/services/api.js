import axios from 'axios';

/* baseURL
  iphone: 'http://localhost:port_backend'
  android:
    - emulador studio: http://10.0.2.2:port'3333
    - genymotion: http://10.0.3.2:port3333
    -USB: IP da máquina na rede: http://192.168.1.107:3333
*/

const api = axios.create({
  baseURL: 'http://192.168.1.107:3333',
});

export default api;

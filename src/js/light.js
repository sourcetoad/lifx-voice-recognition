import 'whatwg-fetch';
import { label, accessToken } from './env';

export function sendLightRequest(action, data) {
  const baseUrl = `https://api.lifx.com/v1/lights/label:${encodeURIComponent(label)}`;
  let urlData = {};

  switch (action) {
    case 'power':
      urlData = {
        method: 'POST',
        endPoint: 'toggle'
      };
      break;
    case 'brightness':
    case 'color':
      const body = {};
      body[action] = data;
      urlData = {
        method: 'PUT',
        endPoint: 'state',
        body
      };
      break;
    default:
      break;
  }

  fetch(`${baseUrl}/${urlData.endPoint}`, {
    method: urlData.method,
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }),
    body: urlData.body ? JSON.stringify(urlData.body) : null
  });
}

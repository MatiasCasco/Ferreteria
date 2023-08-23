// Usar el API REST de SPRING DATA CON SPRING BOOT
const IP = '192.168.56.1'; //'192.168.0.183'; //'192.168.56.1';//'192.168.43.69';
const GET_MCS_MSG = 'An error occurred while trying to get data: ';
const POST_MCS_MSG = 'Error getting data from server';

export function buildURLWithParams(url, params) {
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`{${key}}`, value);
  }
  return url;
}


export function buildURL(baseURL, endpoint, queryParams){
  let url = `${baseURL}${endpoint}`;
  if (queryParams) {
    url += '?';
    for (const [key, value] of Object.entries(queryParams)) {
      url += `${key}=${value}&`;
    }
    url = url.slice(0, -1);
  }
  return url;
}

export async function getMCS(url) {
  try {
    let answer = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      }
    });
    let json = await answer.json();
    //debugger
    return json;
  }
  catch(ex){
      console.error(GET_MCS_MSG, ex);
  }
}

export async function postMCS(url, data) {
  try{
      let answer = await fetch(url, {
        "method": 'POST',
        "headers": {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data),
      });
      if (answer.ok) {
        let json = await answer.json();
        return json;
      } else {
        throw new Error(POST_MCS_MSG);
      }
  } catch(ex){
    console.error(POST_MCS_MSG,ex);
  }
}



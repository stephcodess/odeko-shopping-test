import { AUTH_TOKEN } from "../secrets"; // Api Key
import HOST from "./HOST"; // base url

// request headers and config
const headers = {
  "Authorization": `Token ${AUTH_TOKEN}`,
  "Content-Type": "application/json"
}
// Creats interface for the request function  defines the allowed props and their types
interface RequestOptionType {
    method?: string,
    body?: string,
    headers?: any,
}

/**
 * @function request
 * @param method The request method
 * @param body The request body
 * @desciption The sends request to the server and rettrieves reponse from the given endpoint.
 * @returns Response fom the request made
 */
export default async function request<T>(route: string, method?: string, body?: any): Promise<T> {
    // Takes the header from the RequestOptionType
    let options: RequestOptionType = {
        headers
    }

    if(method) options.method = method; // set the method
    if(body) options.body = JSON.stringify(body); // set the body

    return await fetch(
        `${HOST}/api/v1/${route}`,
        options
    )
    .then(function (response: Response) {
        if (!response.ok) {
            throw Error(`Unsuccessful response: ${response.statusText}`);
        }
        return response.json();
    })
    .then(function (json) {
        return json;
    });
}
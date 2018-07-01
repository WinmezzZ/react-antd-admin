import axios from './axios'
import qs from 'qs'
export const baseUrl = 'https://winmee.cn';

export default async(url, params = {}, method = 'POST', isUpload = false) => {
	if(!url.includes('mock')) {
		url = baseUrl + url;
	}
	method = method.toUpperCase();
	if (method === 'GET') {
		let dataStr = '';
		Object.keys(params).forEach(key => {
			dataStr += key + '=' + params[key] + '&';
		});
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
		const res = await axios.get(url);
		return res.data
	}else if(method === 'POST') {
		const normal = { 
			transformRequest: [
			function(data) { 
				return qs.stringify(data) 
			}
		]};
		const upload = { 
			headers: {
				'Content-Type':'multipart/form-data'
			}
		};
		const res = await axios.post(url, params, isUpload ? upload : normal);
		return res.data
	}
}
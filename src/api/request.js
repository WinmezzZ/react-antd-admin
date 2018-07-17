import axios from './axios'
import qs from 'qs'

export default async(url, params = {}, method = 'POST', isUpload = false) => {
	method = method.toUpperCase();
	if (method === 'GET') {
		const res = await axios.get(url, {
			params
		});
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
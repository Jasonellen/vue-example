
export default async (url = '', params = {}, type = 'GET') => {
	type = type.toUpperCase()
	let option = {}
	// GET url
	if (type == 'GET' || 'FORM') {
		let str = ''
		Object.keys(params).map((key) => {
			str += key + '=' + params[key] + '&'
		})
		url = url + '?' + str.slice(0, -1)
	}
	// POST option
	if (type == 'POST') {
		option = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		}
	} else if (type == 'FORM') {
		option = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				'Cache-Control': 'no-cache'
			},
			body: params
		}
	}
	// 请求
	if (type == 'GET') {
		try {
			const response = await fetch(url)
			const responseJson = await response.json()
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		try {
			const response = await fetch(url, option)
			const responseJson = await response.json()
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	}
}

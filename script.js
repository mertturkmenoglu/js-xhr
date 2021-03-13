const getButton = document.getElementById('getBtn');
const postButton = document.getElementById('postBtn');

const fetchData = (method, url, body) => {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = () => {
			const data = JSON.parse(xhr.response);
			if (xhr.status >= 400) {
				reject(data);
			} else {
				resolve(data);
			}
		}

		xhr.onerror = () => {
			reject('XHR error');
		}

		xhr.send(JSON.stringify(body));
	});

	return promise;
}

const getBtnHandler = () => {
	fetchData('GET', 'https://api.github.com/users/mertturkmenoglu')
		.then(res => {
			console.log(res['login']);
		}).catch(err => {
			console.error(err);
		})
}

const postBtnHandler = () => {
	fetchData('POST', 'https://jsonplaceholder.typicode.com/posts', {
		title: 'Post Button',
		body: 'Post button clicked',
		userId: 1
	}).then(res => {
		console.log(res);
	}).catch(err => {
		console.error(err);
	})
}

getButton.addEventListener('click', getBtnHandler);
postButton.addEventListener('click', postBtnHandler);
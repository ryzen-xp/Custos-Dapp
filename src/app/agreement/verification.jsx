const url = 'https://identity-verification-from-id.p.rapidapi.com/verify-identity';
const data = new FormData();
data.append('fullname', 'JOHN DOE');

const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': 'c064e7fc82msh4ff36057fe8dc81p1f230fjsn7c0322a4f9ff',
		'x-rapidapi-host': 'identity-verification-from-id.p.rapidapi.com'
	},
	body: data
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
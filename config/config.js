var port = 3010;

const isPro = process.env.NODE_ENV == 'production';

module.exports = {
	port: port,
	pathUrl: 'http://192.168.0.222:' + port,
	apiUrl: isPro ? 'http://192.168.0.188:5000' : '/api',
	api: 'http://192.168.0.188:5000',
	end: 'dev'
}
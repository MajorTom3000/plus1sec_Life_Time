import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.yelp.com/v3',
	headers: {
		Authorization: "Bearer ILMv8on4T5I4irTowil_m3-7u7LCoH0iG4V3bcml5acQitiqDjNiX9IHRk0GeZokHMshWIWoQkHOB8zRmscF6Qv2GDaPaEg3GxL-TZ7aBA5p1vesqcMj2ntKKXqcWnYx"
	}
});

class YelpService {
	getCoffeeShops() {
		return api
			.get('/businesses/search', {
				params: {
					latitude: 37.321996988,
					longitude: -122.0325472123455,
					limit: 10,
					categories: 'Diet Food'
				}
			})
			.then(res =>
				res.data.businesses.map(business => ({
					name: business.name,
					coordinates: business.coordinates
				}))
			)
			.catch(error => console.error(error));
	}
}

export default new YelpService();

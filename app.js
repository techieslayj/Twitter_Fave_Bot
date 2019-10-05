var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set up search parameters ideally q is assigned fitness tag because we want to look at tweets that have #fitness in them
var parameters = {
	q: '#fitness',
	count: 10,
	result_type: 'recent',
	lang: 'en'
}

//Initiate your search using the above parameters

// Get on the npm module 'Twitter'
T.get('search/tweets', parameters, function(err, data, response) {
	//no error = proceed
	if(!err){
		//loop returned tweets
		for(let i = 0; i < data.statuses.length; i++){
			//get tweet ID from returned data
			let id = { id: data.statuses[i].id_str}
			//favorite the tweet
			T.post('favorites/create', id, function(err, response) {
				//if can't favorite, log the error message
				if(err){
					console.log(err[0].message);
				}
				// If favorited, log the url of the tweet
				else{
					let username = response.user.screen_name;
					let tweetId = response.id_str;
					console.log('Favorited: ', 'https://twitter.com/${username}/status/${tweetId}')
				}
			});
		}
	} else{
		console.log(err);
	}
})
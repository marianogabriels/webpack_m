var MarbelApi = { 
    characters: function(query,fn){
        let xhr = new XMLHttpRequest();
        console.log(query);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var chars = JSON.parse(this.responseText);
                return fn(chars)
                //chars["data"]["results"]
            }
        };
        xhr.open("GET", "http://gateway.marvel.com:80/v1/public/characters?ts=1&nameStartsWith=" + query + "&limit=100&apikey=039eb48267ed197802f5e77e78d0f3f5&hash=e90ab34566660a82686c9d188a356fbd");
        xhr.send();
    },
    comics: function(query, fn) {
        let xhr = new XMLHttpRequest();
        console.log(query);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var chars = JSON.parse(this.responseText);
                return fn(chars)
            }
        };
        xhr.open("GET", "http://gateway.marvel.com:80/v1/public/comics?ts=1&titleStartsWith=" + query + "&limit=100&apikey=039eb48267ed197802f5e77e78d0f3f5&hash=e90ab34566660a82686c9d188a356fbd");
        xhr.send();
    }
} 
export default MarbelApi;

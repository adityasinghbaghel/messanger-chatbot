const axios = require('axios').default;






axios.get("https://api.github.com/users/adityasinghbaghel")
   .then((response) => {
       console.log(response.data.bio);
   });
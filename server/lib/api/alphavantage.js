const axios = require('axios');
const apiKey = process.env.ALPHAVANTAGE_KEY || "";
const av = {};

function createApiFunction(avFunction, avParams){
  return async (sym) => {
    try{
      const res = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: avFunction,
            symbol: sym,
            apikey: apiKey,
            ...avParams
          }
        });

      console.log(`AV SUCCESS ${sym} ${avFunction}`); 
      return res.data;
    }catch(error){
      console.log('AV ERROR: ', error); 
    }
  }
}

av.getOverview = createApiFunction('OVERVIEW', {});
av.getTSWeekly = createApiFunction('TIME_SERIES_WEEKLY_ADJUSTED', {});
av.getTSDaily = createApiFunction('TIME_SERIES_DAILY_ADJUSTED', {});

module.exports = av;





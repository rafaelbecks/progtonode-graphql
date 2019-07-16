import { Client } from 'disconnect';
import camelize from 'camelize';

let client;

const getDiscogsClient = () => {

  if(!client){
    client = new Client({
      consumerKey: process.env.DISCOGS_CONSUMER_KEY, 
      consumerSecret: process.env.DISCOGS_CONSUMER_SECRET
    }).database();  
  }

  return client;
}

const search = async (query, { type, perPage, page }, ) => (new Promise((resolve, reject) => {
  getDiscogsClient().search(query, { type, per_page: perPage, page }, (err, results) =>  {
    if(err) reject(err);
    resolve(camelize(results));
  })
}));

const getArtist = async (id) => (new Promise((resolve, reject) => {
  getDiscogsClient().getArtist(id, (err, data) =>  {
    if(err) reject(err);
    resolve(camelize(data));
  })
}));

export { search, getArtist };


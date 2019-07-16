import { search, getArtist } from '../../api';
import { graphBuilder } from './graphBuilder';

export const queriesResolver = {
  async artistSearch(parents, { query, type, perPage, page}, context){
    return await search(query, { type, perPage, page });
  },
  async graphConstruct(parents, { artistId }, context){

    const artist = await getArtist(artistId);

    return { artist, graph: graphBuilder(artist, 0) }

  } 
}
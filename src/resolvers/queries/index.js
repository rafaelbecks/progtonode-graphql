import { search, getArtist } from '../../api';
import { graphBuilder, getGraph} from './graphBuilder';

export const queriesResolver = {

  async artistSearch(parents, { query, type, perPage, page}, context){
    return await search(query, { type, perPage, page });
  },

  async graphConstruct(parents, { artistId, level, withReleases }, context){

    return await getGraph(artistId, level, withReleases);

  } 
}
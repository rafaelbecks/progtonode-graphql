import { search, getArtist } from '../../api';
import { graphBuilder, getGraph, symptonGraphBuilder, getGenericGraph } from './graphBuilder';
import Diseases from '../../../data/models/Diseases';

export const queriesResolver = {

  async artistSearch(parents, { query, type, perPage, page}, context){
    return await search(query, { type, perPage, page });
  },

  async graphConstruct(parents, { artistId, level, withReleases }, context){

    return await getGraph(artistId, level, withReleases);

  },
  async diseaseSearch(parents, { query }, context){
    const regexCriteria = { $regex: `.*${query}.*`, $options: 'i'};
    const diseases = await Diseases.find({ name: regexCriteria });
    return { results: diseases };
  },
  async diseaseGraph(parents, { name, level }, context){
    const sympton = await Diseases.findOne({ name });
    const graph = await getGenericGraph(sympton, level);
    return { graph };
  } 
}
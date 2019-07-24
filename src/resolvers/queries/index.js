import { search, getArtist } from '../../api';
import { graphBuilder, getGraph, symptonGraphBuilder } from './graphBuilder';
import Symptons from '../../../data/models/Symptons';

export const queriesResolver = {

  async artistSearch(parents, { query, type, perPage, page}, context){
    return await search(query, { type, perPage, page });
  },

  async graphConstruct(parents, { artistId, level, withReleases }, context){

    return await getGraph(artistId, level, withReleases);

  },
  async symptonSearch(parents, { query }, context){
    const regexCriteria = { $regex: `.*${query}.*`, $options: 'i'};
    const symptons = await Symptons.find({ name: regexCriteria });
    return { results: symptons };
  },
  async symptonGraph(parents, { name, level }, context){
    const sympton = await Symptons.findOne({ name });

    const graph = symptonGraphBuilder(sympton);
    console.log(graph);
    //return { graph };
  } 
}
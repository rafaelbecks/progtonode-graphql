import { getArtist, getReleasesByArtist } from '../../api';
import { mergeNodesAndLinks } from '../../utils';

const graphBuilder = async (artist) => {

    const relationship = (artist.members || artist.groups) || [];

    const firstNode = [{
        id: artist.id,
        label: artist.name,
        group:0
    }]
    
    const assoc = relationship.map((item) => ({
        id: item.id,
        label: item.name,
        active: item.active,
        group: 1
    }));

    let nodes = [...firstNode, ...assoc];

    let links = relationship.map((item) => ({
        source: artist.id,
        target: item.id
    }));

    return { nodes, links }

};

const getGraph = async (artistId, level, withReleases) => {
    let artist = await getArtist(artistId);

    if(withReleases){
        let { releases } = await getReleasesByArtist(artistId);
        let artistsFromReleases = [...new Set(releases.map(({artist}) => artist))];    
    }

    let graph = await graphBuilder(artist);

    if(level > 1){
        const nextLevelGraphs = await Promise.all(
            graph.nodes.map(
                async ({id}) => await getGraph(id,level - 1))
        ); 
    
    graph = mergeNodesAndLinks(graph,nextLevelGraphs);
    }
    return { artist, graph };
}

const symptonGraphBuilder = async (sympton) => {

    const relationship = (sympton.diseases || sympton.symptons) || [];

    const firstNode = [{
        id: sympton,
        label: sympton,
        group:0
    }]
    
    const assoc = relationship.map((item) => ({
        id: item,
        label: item,
        active: true,
        group: 1
    }));

    let nodes = [...firstNode, ...assoc];

    let links = relationship.map((item) => ({
        source: sympton,
        target: item
    }));

    return { nodes, links }

};

export { graphBuilder, getGraph, symptonGraphBuilder };
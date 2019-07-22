import { getArtist } from '../../api';
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

const getGraph = async (artistId, level) => {
    let artist = await getArtist(artistId);
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

export { graphBuilder, getGraph };
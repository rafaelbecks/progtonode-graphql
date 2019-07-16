const graphBuilder = (artist, level) => {

    const relationship = artist.members || artist.groups;

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

    const nodes = [...firstNode, ...assoc];

    const links = relationship.map((item) => ({
        source: artist.id,
        target: item.id
    }));

    return { nodes, links }

};

export { graphBuilder };
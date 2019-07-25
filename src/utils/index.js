
const mergeNodesAndLinks = (graph, nextLevelGraphs) => {

	nextLevelGraphs.forEach((item) => {
		item && item.graph.nodes.forEach(node => {
			if(!graph.nodes.find((eachNode) => eachNode.id === node.id))
				graph.nodes.push(node);
		});

		item.graph.links.forEach(link => {
			if(!graph.links.find((eachLink) => (eachLink.source === link.source ) && (eachLink.target === link.target)))
				graph.links.push(link);
		});
	})

	return graph;
}

export { mergeNodesAndLinks };
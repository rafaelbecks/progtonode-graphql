export const rootTypesDef = `

scalar image
scalar genericResult

type Result {
  _id: ID
  name: String
  diseases: [String]
  TFIDFScore: Int
}

type Pagination {
  perPage: Int
  pages: Int
  page: Int
  items: Int
}

type SearchResult { 
  id: Int
  title: String
  uri: String
  type: String
  thumb: String
}

type SearchResultResponse {
  pagination: Pagination
  results: [SearchResult]
}

type Artist{
  id: String
  name: String
  profile: String
  images: [image]
}

type Node {
  id: String
  label: String
  active: Boolean
  group: Int
}

type Link {
  source: String
  target: String
}

type Graph {
  nodes: [Node]
  links: [Link]
}

type GraphSearchResponse { 
  artist: Artist
  graph: Graph
}

type GenericGraphResponse {
  name: String,
  graph: Graph
}

type GenericSearchResponse {
  results: [Result]
}

`
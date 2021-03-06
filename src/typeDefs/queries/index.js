export const queriesDef = `
type Query {
  artistSearch(query: String, type: String, perPage: Int, page: Int): SearchResultResponse
  graphConstruct(artistId: String, level: Int, withReleases: Boolean): GraphSearchResponse
  diseaseSearch(query: String): GenericSearchResponse
  diseaseGraph(name: String, level: Int): GenericGraphResponse
}
`
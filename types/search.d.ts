declare interface SearchStoreState{
  completed?:boolean,
  loading?:boolean,
  results?:Array<SearchResult>,
  error?:string|any
}


declare interface SearchResult{
  account_id:number,
  avatarfull:string,
  personaname:string,
  last_match_time:string,
  similarity:number
}

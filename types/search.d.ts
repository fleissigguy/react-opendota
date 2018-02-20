declare interface SearchStoreState{
  completed?:boolean,
  loading?:boolean,
  results?:Array<SearchResult>
}


declare interface SearchResult{
  account_id:number,
  avatarfull:string,
  personname:string,
  similarity:number
}

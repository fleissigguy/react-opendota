declare interface SearchStoreState{
  completed?:boolean,
  loading?:boolean,
  results?:Array<ShortPlayerInfo>,
  error?:string|any,
  query?: string
}

declare interface ShortPlayerInfo{
  account_id:number,
  avatarfull:string,
  personaname:string,
  last_match_time:string,
  similarity:number
}

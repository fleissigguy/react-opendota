declare interface SearchStoreState{
  completed?:boolean,
  loading?:boolean,
  results?:Array<ShortPlayerInfo>,
  error?:string|any
}

declare interface ShortPlayerInfo{
  account_id:number,
  avatarfull:string,
  personaname:string,
  last_match_time:string,
  similarity:number
}

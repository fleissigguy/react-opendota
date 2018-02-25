declare interface SearchStoreState{
  completed?:boolean,
  loading?:boolean,
  results?:Array<ShortPlayerInfo>,
  error?:string|any
}

declare interface SearchStoreState{
  completed?:boolean,
  loading?:boolean,
  results?:Array<ShortUserInfo>,
  error?:string|any
}

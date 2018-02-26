declare interface PlayerStoreState{
  completed?:boolean,
  loading?:boolean,
  fullPlayer?:PlayerInfo | null,
  wl?: WLInfo | null,
  error?:string|any
}


declare interface WLInfo{
  win:number,
  lose:number
}


declare interface PlayerInfo{
  tracked_until:string,
  solo_competitive_rank:string,
  competitive_rank:string,
  rank_tier:number,
  leaderboard_rank:number,
  mmr_estimate:EstimateMMR,
  profile:PlayerProfile
}


declare interface EstimateMMR{
  estimate:number,
  stdDev:number,
  n:number
}

declare interface PlayerProfile{
  account_id:number,
  personaname:string,
  name:string,
  cheese:number,
  steamid:string,
  avatar:string,
  avatarmedium:string,
  avatarfull:string,
  profileurl:string,
  last_login:string,
  loccountrycode:string,
}
/*
{
  "tracked_until": "string",
  "solo_competitive_rank": "string",
  "competitive_rank": "string",
  "rank_tier": 0,
  "leaderboard_rank": 0,
  "mmr_estimate": {
    "estimate": 0,
    "stdDev": 0,
    "n": 0
  },
  "profile": {
    "account_id": 0,
    "personaname": "string",
    "name": "string",
    "cheese": 0,
    "steamid": "string",
    "avatar": "string",
    "avatarmedium": "string",
    "avatarfull": "string",
    "profileurl": "string",
    "last_login": "string",
    "loccountrycode": "string"
  }
}
 */

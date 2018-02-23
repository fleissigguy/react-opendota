declare interface UserStoreState{
  completed?:boolean,
  loading?:boolean,
  user?:UserInfo | null,
  shortUser?: ShortUserInfo | null,
  error?:string|any
}



declare interface ShortUserInfo{
  account_id:number,
  avatarfull:string,
  personaname:string,
  last_match_time:string,
  similarity:number
}



declare interface UserInfo{
  tracked_until:string,
  solo_competitive_rank:string,
  competitive_rank:string,
  rank_tier:number,
  leaderboard_rank:number,
  mmr_estimate:EstimateMMR,
  profile:UserProfile
}


declare interface EstimateMMR{
  estimate:number,
  stdDev:number,
  n:number
}

declare interface UserProfile{
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

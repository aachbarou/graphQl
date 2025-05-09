import { GetUserId } from "./api.js";
export let UserId = localStorage.getItem('UserId');
export async  function query () { 
  if  (UserId == 0 || UserId == null) {
    UserId = await GetUserId();
    console.log("daba a= ahwa  : " ,UserId);
  }
  console.log("user  ID : " ,UserId , typeof UserId);
  return  `
{
  user : user_by_pk(id: ${UserId}) {
    id
    login
    attrs
    email
    campus
    profile
    lastName
    firstName
    avatarUrl
    auditRatio
    totalUp
    totalUpBonus
    totalDown
    roles {
      slug
    }
    labels {
      labelName
      labelId
    }
    records {
      startAt
      endAt
      message
      createdAt
      type {
        canAccessPlatform
        isPermanent
        canBeAuditor
        label
        type
      }
    }
    transactions(
      order_by: [{ type: desc }, { amount: desc }]
      distinct_on: [type]
      where: {
        userId: { _eq: ${UserId} }
        type: { _like: "skill_%" }
      }
    ) {
      type
      amount
    }
  }
}
`};


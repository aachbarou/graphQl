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
    email
    lastName
    firstName
    avatarUrl
    auditRatio
    campus
     xps {
      amount
      path
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


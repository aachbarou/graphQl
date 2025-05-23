//import { GetUserId } from "./api.js";
//export let UserId = localStorage.getItem('UserId');
export function query() {
  return `
{
  user {
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
        type: { _like: "skill_%" }
      }
    ) {
      type
      amount
    }
  }
}
`};


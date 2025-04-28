  export const query =  `{
  user {
      firstName
      lastName
      email
      auditRatio
  }
  
  xp_view(where: { path: { _ilike: "%module%" } }) {
    path
    amount
  }

}
`;
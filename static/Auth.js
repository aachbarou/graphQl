import { GenerateToken  } from "./api.js";
import  { login } from "./script.js";
export  function  Auth(JWtoken = null) {
    GenerateToken();
    login();
}
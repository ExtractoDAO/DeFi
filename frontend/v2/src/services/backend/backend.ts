import AxiosService from "../axios";
import { Environment } from "../environment";
import { GraphQL } from "./graphql";
import { Login } from "./login";

class Backend {
    login: Login
    graphql: GraphQL

    constructor(env: Environment, axiosInstance: AxiosService) {
        this.login = new Login(env, axiosInstance)
        this.graphql = new GraphQL
    }
}


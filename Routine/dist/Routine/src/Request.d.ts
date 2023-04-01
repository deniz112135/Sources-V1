import 'dotenv/config';
import * as Database from '../../Database';
export interface ExchangeToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    error?: string;
    error_description?: string;
    code: number;
    message: string;
}
export interface Refresh {
    success?: boolean;
    updated?: boolean;
    deleted?: boolean;
    httpError?: string;
}
export interface getUserInfos {
    success?: boolean;
    user?: User;
    httpError?: string;
}
export interface User {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    flags: number;
    locale: string;
    message: string;
    code: number;
}
export default class Request {
    getUserInfos(access_token: string): Promise<getUserInfos>;
    refreshToken(auth: Database.Auths, clientId: string, clientSecret: string): Promise<Refresh>;
}

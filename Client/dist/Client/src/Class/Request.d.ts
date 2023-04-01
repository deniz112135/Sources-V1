import 'dotenv/config';
import User from '../Interfaces/DiscordAPI/user';
export interface ExchangeToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    error?: string;
    error_description?: string;
    message: string;
    code: number;
}
export interface JoinSuccess {
    flags: number;
    is_pending: boolean;
    joined_at: string;
    pending: boolean;
    roles: [];
    user: {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
        public_flags: number;
    };
    mute: boolean;
    deaf: boolean;
}
export interface JoinError {
    message: string;
    code: number;
}
export interface RateLimit {
    global: boolean;
    message: string;
    retry_after: number;
}
export default class Request {
    exchangeToken(code: string, client_id: string, client_secret: string): Promise<ExchangeToken>;
    JoinServer(access_token: string, guildID: string, userID: string, token: string): Promise<boolean | JoinSuccess | JoinError | RateLimit>;
    getUserInfos(access_token: string): Promise<User>;
}

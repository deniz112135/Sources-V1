import { Model } from "sequelize";
export declare class Auths extends Model {
    id: number;
    bot: string;
    user: string;
    guild: string;
    locale: string;
    access_token: string;
    refresh_token: string;
    userInformationsFailed: number;
    refreshFailed: number;
    expires_in: number;
    scope: string;
    token_type: string;
    expireDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
export default Auths;

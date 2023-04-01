import { Model } from "sequelize";
export declare class LogsJoin extends Model {
    id: number;
    bot: string;
    guild: string;
    user: string;
    stats: string;
    createdAt: Date;
    updatedAt: Date;
}
export default LogsJoin;

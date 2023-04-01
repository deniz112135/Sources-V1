import { Model } from "sequelize";
export declare class LogsCommands extends Model {
    id: number;
    bot: string;
    command: string;
    args: string;
    success: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export default LogsCommands;

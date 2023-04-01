import { Model } from "sequelize";
export declare class Bots extends Model {
    id: string;
    type: number;
    account: string;
    secret: string;
    token: string;
    buyer: string[];
    owners: string[];
    logHook: string;
    createdAt: Date;
    updatedAt: Date;
}
export default Bots;

import { Model } from "sequelize";
export declare class Blacklist extends Model {
    guild: string;
    reason: string;
}
export default Blacklist;

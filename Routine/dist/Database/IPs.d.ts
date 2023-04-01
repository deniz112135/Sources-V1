import { Model } from "sequelize";
export declare class IPs extends Model {
    id: number;
    user: string;
    v4: string;
    v6: string;
}
export default IPs;

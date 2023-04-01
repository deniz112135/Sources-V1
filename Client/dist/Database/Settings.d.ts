import { Model } from "sequelize";
export declare class Settings extends Model {
    id: number;
    bot: string;
    guild: string;
    role: string;
    successTitle: string;
    successMessage: string;
    successColor: string;
}
export default Settings;

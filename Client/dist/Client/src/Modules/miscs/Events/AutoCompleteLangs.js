"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCompleteLangs = void 0;
const __1 = require("../../../..");
exports.AutoCompleteLangs = {
    name: 'interactionCreate',
    run: async (interaction) => {
        if (!interaction.isAutocomplete())
            return;
        if (interaction.options.getFocused(true).name != 'locale')
            return;
        let oAuths;
        oAuths = await __1.Client.database.Auths.findAll({ where: { bot: __1.Client.user.id }, order: [['id', 'ASC']], raw: true, attributes: ['locale'] });
        // add the quantity of each locale
        var locales = oAuths.map((oAuth) => oAuth.locale);
        locales = locales.filter((locale, index) => locales.indexOf(locale) === index);
        locales = locales.slice(0, 20);
        const quantity = locales.map((locale) => oAuths.filter((oAuth) => oAuth.locale == locale).length);
        interaction.respond(locales.map((locale) => ({
            name: locale.charAt(0).toUpperCase() + locale.slice(1) + ` (${quantity[locales.indexOf(locale)]})`,
            value: locale
        }))).catch(() => { });
    }
};
//# sourceMappingURL=AutoCompleteLangs.js.map
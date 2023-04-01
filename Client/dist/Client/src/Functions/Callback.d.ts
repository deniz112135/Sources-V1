interface Query {
    code: string;
    state: string & {
        guild: string;
        bot: string;
    };
    ip: string;
}
declare const _default: (query: Query) => Promise<unknown>;
export default _default;

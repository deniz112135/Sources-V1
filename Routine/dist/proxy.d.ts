declare const getProxy: () => {
    infos: {
        host: string;
        port: string;
        auth: string;
    };
    agent: any;
};
export default getProxy;

declare const getProxy: () => {
    infos: {
        host: string;
        port: string;
        auth: string;
    };
    agent: import("https-proxy-agent/dist/agent").default;
};
export default getProxy;

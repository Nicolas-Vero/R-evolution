const sleep = m => new Promise(r => setTimeout(r, m));

export default class SystemHelper {
    static sleep = async ms => {
        await sleep(ms);
    };
}

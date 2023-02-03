export const parseJson = (object: any, defaultValue: any = undefined) => {
    try {
        return JSON.parse(object);
    }
    catch (e) {
        return defaultValue !== undefined ? defaultValue : object;
    }
}
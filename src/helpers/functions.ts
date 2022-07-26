export const replaceNull = (someObj: any, replaceValue = "") => {
    const replacer = (key: any, value: any) =>
        String(value) === "null" || String(value) === "undefined" ? replaceValue : value;
    return JSON.parse(JSON.stringify(someObj, replacer));
}

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<K, T[]>);
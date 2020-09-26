function isNumber(value: string): boolean {
    return value.match(/^\d+$/) != null;
}

export {
    isNumber
};
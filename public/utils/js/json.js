JSON.stringifyCircular = circ => {
    var cache = [];
    const result = JSON.stringify(circ, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.includes(value)) return;
            cache.push(value);
        }
        return value;
    });
    cache = null;
    return result;
};
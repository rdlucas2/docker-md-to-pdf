function hasEqualStructure(obj1, obj2) {
    return Object.keys(obj1).every((key) => {
        const v = obj1[key];

        if (typeof v === 'object' && v !== null) {
            return hasEqualStructure(v, obj2[key]);
        }

        return obj2.hasOwnProperty(key);
    });
}

function toMatchStructure(actual, expected) {
    const pass = hasEqualStructure(actual, expected);

    return {
        message: () => `expected ${expected} to match structure ${actual}`,
        pass
    };
}

exports.toMatchStructure = toMatchStructure;

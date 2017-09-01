module.exports = {
    "extends": "tui/es6",
    "parserOptions": {
        "sourceType": "module"
    },
    "env": {
        "es6": true,
        "browser": true,
        "jasmine": true,
        "commonjs": true
    },
    "globals": {
        "tui": true,
        "fixture": true
    },
    "plugins": ["babel"],
    "rules": {
        "lines-around-directive": 0,
        "newline-before-return": 0,
        "sort-imports": "error",
        "no-useless-rename": "error",
        "no-duplicate-imports": ["error", { "includeExports": true }],
        "dot-notation": ["error", { "allowKeywords": true }],
        "prefer-destructuring": [
            "error", {
                "VariableDeclarator": {
                    "array": true,
                    "object": true
                },
                "AssignmentExpression": {
                    "array": false,
                    "object": false
                }
            },
            {
                "enforceForRenamedProperties": false
            }
        ],
        "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
        "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }]
    }
};

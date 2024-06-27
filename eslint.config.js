import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
    { files: ['**/*.{js,mjs,cjs,vue}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    eslintPluginPrettierRecommended,
    {
        rules: {
            'prettier/prettier': [
                'warn',
                {
                    semi: false,
                    endOfLine: 'auto',
                    usePrettierrc: true,
                },
            ],
        },
    },
]

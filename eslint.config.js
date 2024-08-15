// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
	{
    rules: {
			'style/no-tabs': 'off',
			'style/quote-props': 'off',
			'vue/html-indent': 'off',
			'style/indent': 'off',
			'node/prefer-global/process': 'off',
			'node/prefer-global/buffer': 'off',
			'unused-imports/no-unused-vars': 'off',
			'vue/singleline-html-element-content-newline': 'off',
			'no-console': 'off',
			'no-unused-vars': 'off',
			'no-undef': 'off',
			'no-dupe-keys': 'off',
			'regexp/no-unused-capturing-group': 'off',
			'regexp/no-legacy-features': 'off',
			'no-new-wrappers': 'off',
			'vue/return-in-computed-property': 'off',
			'no-empty-pattern': 'off',
			'unicorn/no-new-array': 'off',
			'prefer-promise-reject-errors': 'off',
			'vue/no-mutating-props': 'off',
		},
  },
)

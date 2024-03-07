/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	tabWidth: 2,
	useTabs: true,
	singleQuote: false,
	jsxSingleQuote: false,
	trailingComma: "all",
	jsxBracketSameLine: false,
	endOfLine: "auto",
	semi: true,
	printWidth: 80,
	arrowParens: "always",
	plugins: ["prettier-plugin-tailwindcss"],
};

export default config;

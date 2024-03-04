/** @type {import("prettier").Options}*/
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
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;

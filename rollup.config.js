import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: [
		{ file: pkg.main, format: 'cjs', sourcemap: true },
		{ file: pkg.module, format: 'esm', sourcemap: true }
	],
	plugins: [
		external({
			includeDependencies: true
		}),
		postcss({
			// modules: true
		}),
		babel({
			babelrc: false,
			presets: ['@babel/preset-env', '@babel/preset-react'],
			exclude: 'node_modules/**'
		}),
		replace({
			exclude: 'node_modules/**',
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		commonjs({
			include: /node_modules/
		}),
		resolve()
	]
};

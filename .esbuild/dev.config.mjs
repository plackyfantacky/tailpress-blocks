import esbuild from 'esbuild'

await esbuild.build({
    entryPoints: [
        { out: 'build2/shared/block-code', in: 'src/shared/block-code.js' },
    ],
    bundle: true,
    outdir: './',
    target: ['es2018'],
    minify: false,
    sourcemap: true,
    logLevel: 'info',
    plugins: [],
	loader: { '.js': 'jsx' },
})

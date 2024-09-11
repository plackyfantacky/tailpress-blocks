import esbuild from 'esbuild'

await esbuild.build({
    entryPoints: [
        { out: 'shared/dist/block-code', in: 'shared/src/block-code.js' },
    ],
    bundle: true,
    outdir: './',
    target: ['es2018'],
    minify: false,
    sourcemap: true,
    logLevel: 'info',
    plugins: [],
})

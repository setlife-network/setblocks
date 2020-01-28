const path = require('path')
const fs = require('fs')

const projectDirectory = fs.realpathSync(process.cwd())
const resolve = relativePath => path.resolve(projectDirectory, relativePath)

module.exports = {
    appIndex: resolve('web/index.js'),
    appRoot: path.resolve(__dirname, '..'),
    components: resolve('web/components'),
    config: resolve('config'),
    ducks: resolve('web/ducks'),
    htmlRoot: resolve('web/index.html'),
    nodeModules: resolve('node_modules'),
    pages: resolve('web/pages'),
    public: resolve('public'),
    scripts: resolve('web/scripts'),
    source: resolve('web'),
    styles: resolve('web/styles'),
}
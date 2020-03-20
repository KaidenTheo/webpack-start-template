const path              = require('path');
const fs                = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = class Html {
    static PATH = path.resolve(__dirname, '../src/pug/pages');
    static EXT = '.pug';

    static create() {
        const files = fs.readdirSync(Html.PATH).filter((file) => file.endsWith(Html.EXT));
        return files.map((filename) => {
            const basename = path.basename(filename, Html.EXT);

            return new HtmlWebpackPlugin({
                template: path.join(Html.PATH, filename),
                filename: `${basename}.html`,
                inject  : true,
                minify  : false,
                chunks  : [basename]
            });
        });
    }
};

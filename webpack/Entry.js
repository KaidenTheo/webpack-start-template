const path = require('path');
const fs   = require('fs');

module.exports = class Entry {
    static PATH = path.resolve(__dirname, '../src/js');
    static EXT  = '.js';

    static create() {
        const files = fs.readdirSync(Entry.PATH).filter((file) => file.endsWith(Entry.EXT));
        return files.reduce((acc, filename) => {
            const basename = path.basename(filename, Entry.EXT);
            return {...acc, [basename]: path.join(Entry.PATH, filename)}
        }, {});
    }
};

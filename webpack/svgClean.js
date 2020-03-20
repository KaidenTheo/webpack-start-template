module.exports = function svgClean(source) {
    source = source.replace(/(fill=".+?"|stroke=".+?")/g, '');
    source = source.replace(/(>)\n(<)/g, '$1$2');
    return source;
};

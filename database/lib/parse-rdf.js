'use strict';

const cheerio = require('cheerio');

module.exports = rdf => {
    const $ = cheerio.load(rdf);
    const book = {};
    book.title = $('dcterms\\:title').text();
    book.id =                     // Set the book's id.
    +                            // Unary plus casts the result as a number.
    $('pgterms\\:ebook')        // Query for the <pgterms:ebook> tag.
    .attr('rdf:about')         // Get the value of the rdf:about attribute.
    .replace('ebooks/', '');  // Strip off the leading 'ebooks/' substring.
    book.authors = $('pgterms\\:agent pgterms\\:name')
    .toArray().map(elem => $(elem).text());
    book.subjects = $('[rdf\\:resource$="/LCSH"]')
    .parent().find('rdf\\:value')
    .toArray().map(elem => $(elem).text());
    return book;
};
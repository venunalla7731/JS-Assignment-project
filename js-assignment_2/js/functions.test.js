const functions = require('./functions.js')

test('gets price when price is given directly', () => {
	var product = {"price":{"regular":2990,"selling":2990}};
	
    expect(functions.getSellingPrice(product)).toBe(2990)
})

test('gets price when price range is given', () => {
	var product = {"priceRange":{"regular":{"high":60,"low":40},"selling":{"high":48,"low":32},"type":"special"}};
	
    expect(functions.getSellingPrice(product)).toBe("32 - 48")
})
SELECT * FROM products;
SELECT row_to_json(brand_obj) FROM (SELECT * FROM brands) brand_obj;

SELECT p.*,
    (
    SELECT row_to_json(brand_obj)
    FROM (
        SELECT * FROM brands
        WHERE "brandId"=p."brandId"
    ) brand_obj
    ) AS brad,
        (
    SELECT row_to_json(pdt_object)
    FROM (
        SELECT * FROM "pdTypes"
        WHERE "pdTypeId"=p."pdTypeId"
    ) pdt_object
    ) AS pdt
FROM products p
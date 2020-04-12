select country, city, customerName
from customers;

-- selects suppliers from the USA 
select country, city, supplierName
from suppliers
where country = 'USA';

-- selects customers in the USA
select *
from customers
where country = 'USA';

-- selects customers in the USA or Paris and sorts by country ascending and city descending
select *
from customers
where country = 'USA' or city = 'Paris'
order by country, city desc;


-- updates data
update [shippers]
set phone = '(000) 000-0001'
where id = 3;

-- deletes data
delete from [shipper]
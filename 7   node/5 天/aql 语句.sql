-- select * from my_db_01.users where status=1
-- select username , password from my_db_01.users
-- insert into my_db_01.users (username,password) values ('tony stark1234','123456')

-- UPDATE my_db_01.users SET password='999999',status=1 WHERE id=5
-- delete from my_db_01.users where id=3
select count(*) as total from my_db_01.users where status=0
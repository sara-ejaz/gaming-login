create database login_game;

use login_game;

drop table user;

create table user(
email varchar(50) unique not null,
password varchar(30) not null
);

insert into user
values
("sara@gmail.com","sara1234"),
("sunny@gmail.com","sunny1234"),
("sameer@gmail.com","sameer1234"),
("baba@gmail.com","baba1234");

select * from user;

SELECT email,password FROM user
 WHERE email = ? AND password = ?;

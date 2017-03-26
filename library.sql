create table book(
    bno varchar(7),
    type varchar(10),
    title varchar(10),
    press varchar(15),
    year date,
    author varchar(10),
    price float,
    total int,
    stock int,
    primary key (bno)
);

create table card(
    cno varchar(11),
    name varchar(5),
    department varchar(10),
    type varchar(5),
    primary key (cno)
);

create table admin(
    id varchar(3),
    password varchar(15),
    name varchar(5),
    telephone varchar(11),
    primary key (id)
);

create table borrow(
    cno varchar(11),
    bno varchar(7),
    borrow_date date,
    return_date date,
    manager varchar(3),
    primary key (cno,bno),
    foreign key (cno) references card(cno) on delete cascade on update cascade,
    foreign key (bno) references book(bno) on delete cascade on update cascade,
    foreign key (manager) references admin(id) on delete cascade on update cascade
);

insert into book value('E0001','英语','英语小说欣赏','北京大学出版社','2011-02-23','李鸣',30.00,20,20);
insert into book value('A0012','历史','世界历史100问','清华大学出版社','2013-02-20','吴江',20.00,10,10);
insert into book value('S0001','物理','大学物理','浙江大学出版社','2010-07-10','郑大方',40.00,15,15);
insert into book value('C0001','计算机','C语言程序设计','浙江大学出版社','2014-08-27','白洪欢',20.00,50,50);
insert into book value('T0001','数学','微积分','机械工业出版社','2013-06-23','苏德矿',80.00,20,20);

insert into card value('3150102356','小明','外语学院','学生');
insert into card value('3150101023','小红','传媒学院','学生');
insert into card value('3150102019','小王','机械学院','学生');
insert into card value('3150104110','小强','计算机学院','学生');
insert into card value('3150105321','小宝','建筑学院','学生');

insert into admin value('001','123456','吴朝晖','13817864187');


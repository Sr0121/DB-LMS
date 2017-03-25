create table book(
    bno varchar(7),
    type varchar(10),
    name varchar(10),
    press varchar(15),
    year date,
    author varchar(10),
    price float,
    total int,
    stock int,
    primary key (bno)
);

create table card(
    cno varchar(5),
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
    cno varchar(5),
    bno varchar(7),
    borrow_date date,
    return_date date,
    manager varchar(3),
    primary key (cno,bno),
    foreign key (cno) references card(cno) on delete cascade on update cascade,
    foreign key (bno) references book(bno) on delete cascade on update cascade,
    foreign key (manager) references admin(id) on delete cascade on update cascade
);
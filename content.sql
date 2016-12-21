USE yslaw2;

CREATE TABLE content (
  id int(11) NOT NULL AUTO_INCREMENT,
  titleinput varchar(45) NOT NULL,
  doc MEDIUMTEXT,
  PRIMARY KEY (id)
) AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

INSERT INTO content (titleinput, doc) VALUES
  ("인사말", "{\n  \"ops\": [\n    {\n      \"insert\": \"dsd\\n \\n\"\n    }\n  ]\n}");

CREATE TABLE pic (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(45) NOT NULL,
    type varchar(45) NOT NULL,
    parentid varchar(45),
    parenttable varchar(45),
    doc MEDIUMTEXT,
    PRIMARY KEY (id)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE galleryall (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(45) NOT NULL,
    type varchar(45) NOT NULL,
    detail TEXT,
    createdAt DATETIME,
    PRIMARY KEY (id)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

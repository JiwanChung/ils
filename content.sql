USE yslaw2;

CREATE TABLE content (
  id int(11) NOT NULL AUTO_INCREMENT,
  titleinput varchar(45) NOT NULL,
  doc MEDIUMTEXT,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

INSERT INTO content (titleinput, doc) VALUES
  ("인사말", "{\n  \"ops\": [\n    {\n      \"insert\": \"dsd\\n \\n\"\n    }\n  ]\n}");

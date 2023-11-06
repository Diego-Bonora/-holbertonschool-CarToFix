drop database CarToFix_dev_db;
  
CREATE DATABASE IF NOT EXISTS CarToFix_dev_db;
CREATE USER IF NOT EXISTS 'CarToFix_dev'@'localhost' IDENTIFIED BY 'CarToFix_dev_pwd';
GRANT ALL PRIVILEGES ON CarToFix_dev_db.* TO 'CarToFix_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'CarToFix_dev'@'localhost';
FLUSH PRIVILEGES;
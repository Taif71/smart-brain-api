BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined ) values ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');

INSERT into login ( hash, email ) values('adwadlklkdksfdk2323kn2n3k2nk32e2e', 'jessie@gmail.com');

COMMIT;


# Emailer:
- [x] Establishes an SMTP connection
- [x] Sends an email with the bugdet to approve
- [ ] Waits for confirmation
- [ ] Sends a finalization notification once the services are done

## Send an email with the budget to approve:
Use `sendbdgt()`;
```
emailer = Emailer()
emailer.sendbdgt(user, budget, client)
```
It'll process the budget to make a predefined message out of it.

## See the predefined message:
Use `message()`;
In a `file.py`:
```
emailer = Emailer()
print(emailer.message(budget, client))
```
And then:
```
$ python3 file.py
Subject: New Budget To Confirm

Dear ET,

We would like you to confirm or reject the following budget:
	total price: 400.0
	installments: 0
	due date: 2023-11-02 20:01:21
	created at: 2023-10-26T20:01:22.000000
	payment method: Credit-Card
	warranty: 0
	issue date: 2023-10-26 20:01:21

The following services will be carried out:
	note: A piano was required
	price: 200000.0
	description: Summertime - George Gershwin
	title: Kill delivery service

	note: A piano was required
	price: 200000.0
	description: Summertime - George Gershwin
	title: Kill delivery service

	note: A piano was required
	price: 200000.0
	description: Summertime - George Gershwin
	title: Kill delivery service

To approve it please reply:
	ok: 0c20333f-76c4-46d5-879e-f4001f7a691f
To refuse it please reply:
	no: 0c20333f-76c4-46d5-879e-f4001f7a691f

Please make sure the body of the response contains ONLY one of the previous lines
```

## Get and process all the recieved messages:
Use `read()`, it will read and **delete** the read messages
In a `file.py`:
```
emailer = Emailer()
emailer.read(user)
```
and then
```
$ python3 file.py
[{'sender': 'testingemaileremail@gmail.com', 'body': 'Dear ET,\r\n\r\nWe would like you to confirm or reject the following budget:\r\n\tcreated at: 2023-10-26T20:01:22.000000\r\n\tpayment method: Credit-Card\r\n\twarranty: 0\r\n\tissue date: 2023-10-26 20:01:21\r\n\ttotal price: 400.0\r\n\tinstallments: 0\r\n\tdue date: 2023-11-02 20:01:21\r\n\r\nThe following services will be carried out:\r\n\ttitle: Kill delivery service\r\n\tnote: A piano was required\r\n\tprice: 200000.0\r\n\tdescription: Summertime - George Gershwin\r\n\r\n\ttitle: Kill delivery service\r\n\tnote: A piano was required\r\n\tprice: 200000.0\r\n\tdescription: Summertime - George Gershwin\r\n\r\n\ttitle: Kill delivery service\r\n\tnote: A piano was required\r\n\tprice: 200000.0\r\n\tdescription: Summertime - George Gershwin\r\n\r\nTo approve it please reply:\r\n\tok: 0c20333f-76c4-46d5-879e-f4001f7a691f\r\nTo refuse it please reply:\r\n\tno: 0c20333f-76c4-46d5-879e-f4001f7a691f\r\n'}]
```

### For now:
* it does not set `budget.sent` as `True`
* it does not set `budget.active` and `budget.confirmed` as `True` or `False`
* read() returns a list of dictionaries containing the recieved mails sender and body

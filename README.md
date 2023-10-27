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
Dear ET,

We would like you to confirm or reject the following budget:
        created at: 2023-10-26T20:01:22.000000
        payment method: Credit-Card
        warranty: 0
        issue date: 2023-10-26 20:01:21
        total price: 400.0
        installments: 0
        due date: 2023-11-02 20:01:21

The following services will be carried out:
        title: Kill delivery service
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
```

For now it does not set `budget.sent` as `True`

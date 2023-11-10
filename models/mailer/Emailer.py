#!/usr/bin/python3
"""
This module establishes a conection with the SMTP email server
and class Emailer() handles the emails
"""

import email
from email.header import decode_header
from email.utils import parseaddr
import imaplib
from models.budget import Budget
from models.client import Client
from models import storage
from models.user import User
from models.vehicle import Vehicle
import smtplib


class Emailer():
    """Manages email messages"""

    def __init__(self):
        """Initializes an Emailer"""
        self.server = "smtp.gmail.com"
        self.user = next((usr for usr in storage.all(User).values() if usr.mail == "cartofixcostumers@gmail.com"), None)
        self.mail = None

    def connect(self):
        """Connects to the SMTP server"""
        self.mail = smtplib.SMTP(self.server, 587)
        self.mail.starttls()
        self.mail.login(self.user.mail, self.user.password)

    def terminate(self):
        """Terminates the connection"""
        self.mail.quit()

    @staticmethod
    def message(budget, client):
        """Returns the predefined message to send"""
        body = "Subject: New Budget To Confirm\n\n"
        body += f"Dear {client.name},\n\n"
        body += f"We would like you to confirm or reject the following budget:\n"

        # Format budget details
        for key, value in budget.to_dict().items():
            if key not in ["id", "__class__", "sent", "active", "vehicle_id", "confirmed", "services"]:
                formatted_key = " ".join(key.split("_"))
                body += f"\t{formatted_key}: {value}\n"

        body += "\nThe following services will be carried out:"

        # Format service details
        services = budget.services if isinstance(budget.services, list) else [budget.services]
        for service in services:
            body += "\n"
            for key, value in service.to_dict().items():
                if key not in ["id", "user_id", "done", "vehicle_id", "budget_id", "__class__", "worker", "created_at"]:
                    formatted_key = " ".join(key.split("_"))
                    body += f"\t{formatted_key}: {value}\n"

        # Instructions for approval and rejection
        body += f"\nTo approve it please reply:\n\tok: {budget.id}\n"
        body += f"To refuse it please reply:\n\tno: {budget.id}\n"
        body += "\nPlease make sure the body of the response contains ONLY ONE of the previous LINES\n"

        return body

    def send(self, client, budget=None, msg=None):

        try:
            self.connect()

            if not budget and not msg:
                raise ValueError("Either budget or message should be provided")
            if budget:
                if budget.sent:
                    raise ValueError("Buget was already sent")

            if not msg:
                body = self.message(budget, client)
            else:
                body = msg

            self.mail.sendmail(self.user.mail, client.email, body)
            
            if budget:
                budget.sent = True

            storage.save()
            print(body)

        finally:
            self.terminate()

    def read(self):
        """
        Reads all the mails and calls to __procmsg() to process it.
        """
        try:
            # Connect to the IMAP server
            mail = imaplib.IMAP4_SSL("imap.gmail.com")
            mail.login(self.user.mail, self.user.password)
            mail.select("inbox")

            # Search for all emails in the inbox
            status, messages = mail.search(None, "ALL")
            messages = messages[0].split()
            email_list = []

            # Iterate over each email
            for msg_id in messages:
                try:
                    _, msg_data = mail.fetch(msg_id, "(RFC822)")
                    msg = email.message_from_bytes(msg_data[0][1])

                    # Get the sender's email
                    _, sender = parseaddr(msg.get("From"))

                    # Get the email body
                    if msg.is_multipart():
                        body = ""
                        for part in msg.walk():
                            if part.get_content_type() == "text/plain":
                                body += part.get_payload(decode=True).decode("utf-8", errors="ignore")
                    else:
                        body = msg.get_payload(decode=True).decode("utf-8", errors="ignore")

                    email_list.append({"sender": sender, "body": body})

                    # Mark the email for deletion
                    mail.store(msg_id, "+FLAGS", "(\Deleted)")
                except Exception as e:
                    logging.error(f"Error processing email {msg_id}: {e}")

            return self.__prcmsgs(email_list)
        finally:
            if messages:
                mail.expunge()
            mail.logout()

    def __prcmsgs(self, msgs):
        """ Process the messages """
        come_again = "Subject: Please try again\n\nResponse not understood, read the instrucctions in the confirmation mail and try again"
        for msg in msgs:
            msg["body"] = msg["body"].split("\n")[0]

            # If the sender is a client
            print(msg)
            sender = next((client for client in storage.all(Client).values() if client.email == msg["sender"]), None)

            # Iterate over the messages, extracts the response, budget.id, and sender
            if len(msg["body"].split(": ")) == 2:
                acptd, bdgt = msg["body"].split(": ")
                bdgt =  storage.get(Budget, bdgt.replace("\r\n", ""))
                client = storage.get(Client, bdgt.client_id)

                # If the budget is found and the sender is the same as the workshop costumer
                if bdgt and client.email == sender.email:

                    # If it was previously confirmed
                    if bdgt.confirmed == True:
                        self.send(sender, msg="Subject: Can't re-confirm\n\nBudget already confirmed, reach out to the workshop")

                    # If it was approved
                    elif acptd == "ok":
                        print(f"Budget: {bdgt.id} accepted :)")
                        bdgt.confirmed = True
                        bdgt.active = True
                        self.send(sender, msg="Subject: Budget Approved\n\nBudget successfully approved")

                    # If it was not approved
                    elif acptd == "no":
                        print(f"Budget: {bdgt.id} rejected :(")
                        bdgt.confirmed = True
                        self.send(sender, msg="Subject: Budget Rejected\n\nBudget successfully rejected")

                    # If confirmation is not contemplated
                    else:
                        print("Not able to understand:", msg["body"])
                        self.send(sender, msg=come_again)

                # If the budget was not found or the sender does not match
                else:
                    tpritn = msg['body'].split(': ')[1].replace('\n', '')
                    print(f"Budget: {tpritn} not found")
                    self.send(sender, msg="Subject: Please try again\n\nEither sender or budget invalid")

            # If the splited message is not as expected
            else:
                print("Not able to understand:", msg["body"])
                self.send(sender, msg=come_again)

        storage.save()
        return msgs

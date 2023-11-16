#!/usr/bin/python3
"""
This module establishes a conection with the SMTP email server
and class Emailer() handles the emails
"""

from datetime import datetime
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
    def message(budget, client, sub=None):
        """Returns the predefined message to send"""
        body = ""

        if not sub:
            body += "Subject: New Budget To Confirm\n\n"
        else:
            body += sub

        body += f"Dear {client.name},\n\n"
        body += f"We would like you to confirm or reject the following budget:\n"

        dontadd = ["id", "created_at", "__class__", "sent", "active", "vehicle_id", "confirmed", "services", "user_id", "client_id"]

        # Format budget details
        for key, value in budget.to_dict().items():
            if key not in dontadd:
                formatted_key = " ".join(key.split("_"))
                body += f"\t{formatted_key}: {value}\n"

        body += "\nThe following services will be carried out:"

        # Format service details
        services = budget.services if isinstance(budget.services, list) else [budget.services]
        for service in services:
            body += "\n"
            for key, value in service.to_dict().items():
                if key not in ["done", "budget_id", "worker"] and key not in dontadd:
                    formatted_key = " ".join(key.split("_"))
                    body += f"\t{formatted_key}: {value}\n"

        # Instructions for approval and rejection
        body += f"\nTo approve it please reply:\n\tok\n"
        body += f"To refuse it please reply:\n\tno\n"
        body += "\nPlease make sure the body of the response contains ONLY 'ok' or 'no'\n"

        return body

    def send(self, client, budget=None, msg=None):

        try:
            self.connect()

            if not client:
                raise ValueError("Client must be provided")
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
        messages = None
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
        come_again = "Subject: Please try again\n\nResponse not understood, read the instructions in the confirmation mail and try again"
    
        for msg in msgs:
            msg["body"] = msg["body"].split("\r\n")[0]
    
            # If the sender is a client
            print(msg)
            sender = next((client for client in storage.all(Client).values() if client.email == msg["sender"]), None)
            if not sender:
                continue
    
            bdgts = [b for b in storage.all(Budget).values() if b.client_id == sender.id]
            bdgt = max(bdgts, key=lambda x: x.created_at if not x.confirmed else datetime.min)
    
            if not bdgt:
                print(sender.name, "has no budget to confirm")
                self.send(sender, msg="Subject: Please try again later\n\nNo budget to confirm was found")
                continue
    
            print("Budget found...")
            if "ok" in msg["body"].lower() and "no" in msg["body"].lower():
                print("Body contains ok and no, not able to understand")
                self.send(sender, msg=come_again)
    
            if bdgt.confirmed:
                print(sender.name, "tried to re-confirm")
                self.send(sender, msg="Subject: Can't re-confirm\n\nBudget already confirmed, try again later or reach out to the workshop")

            elif "ok" in msg["body"].lower():
                print(f"Budget: {bdgt.id} accepted :)")
                bdgt.confirmed = True
                bdgt.active = True
                self.send(sender, msg="Subject: Budget Approved\n\nBudget successfully approved")

            elif "no" in msg["body"].lower():
                print(f"Budget: {bdgt.id} rejected :(")
                bdgt.confirmed = True
                self.send(sender, msg="Subject: Budget Rejected\n\nBudget successfully rejected")

            else:
                print("Not able to understand:", msg["body"])
                self.send(sender, msg=come_again)
    
        storage.save()
        return msgs
    

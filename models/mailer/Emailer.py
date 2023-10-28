#!/usr/bin/python3
"""
This module establishes a conection with the SMTP email server
and class Emailer() handles the emails
"""

import imaplib
import email
from email.header import decode_header
import smtplib


class Emailer():
    """Manages email messages"""

    def __init__(self):
        """Initializes an Emailer"""
        self.server = "smtp.gmail.com"
        self.mail = None

    def connect(self, user):
        """Connects to the SMTP server"""
        self.mail = smtplib.SMTP(self.server, 587)
        self.mail.starttls()
        self.mail.login(user.mail, user.password)

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
        for service in budget.services:
            body += "\n"
            for key, value in service.to_dict().items():
                if key not in ["id", "user_id", "done", "vehicle_id", "budget_id", "__class__", "worker", "created_at"]:
                    formatted_key = " ".join(key.split("_"))
                    body += f"\t{formatted_key}: {value}\n"

        # Instructions for approval and rejection
        body += f"\nTo approve it please reply:\n\tok: {budget.id}\n"
        body += f"To refuse it please reply:\n\tno: {budget.id}\n"
        body += "\nPlease make sure the body of the response contains ONLY one of the previous lines\n"

        return body

    def sendbdgt(self, user, budget, client):
        try:
            self.connect(user)

            body = self.message(budget, client)

            self.mail.sendmail(user.mail, client.email, body)
        finally:
            self.terminate()

    def read(self, user):
        """
        Reads all the mails and calls to procmsg() to process it.
        """
        try:
            # Connect to the IMAP server
            mail = imaplib.IMAP4_SSL("imap.gmail.com")
            mail.login(user.mail, user.password)
            mail.select("inbox")

            # Search for all emails in the inbox
            status, messages = mail.search(None, "ALL")
            messages = messages[0].split()

            email_list = []

            # Iterate over each email
            for msg_id in messages:
                _, msg_data = mail.fetch(msg_id, "(RFC822)")
                msg = email.message_from_bytes(msg_data[0][1])

                # Get the sender's email
                sender, encoding = decode_header(msg.get("From"))[0]
                if isinstance(sender, bytes):
                    sender = sender.decode(encoding or "utf-8")

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

            return self.__prcmsgs(email_list)

        finally:
            mail.expunge()
            mail.logout()

    def __prcmsgs(self, msgs):
        """ Process the messages """
        for msg in msgs:
            if len(msg["body"].split(": ")) == 2:
                acptd, bdgt = msg["body"].split(": ")
                bdgt = bdgt.strip()
                if acptd == "ok":
                    print(f"Budget: {bdgt} accepted :)")
                elif acptd == "no":
                    print(f"Budget: {bdgt} rejected :(")
                else:
                    print("Not able to understand:", msg["body"])
            else:
                print("Unexpected format in message:", msg["body"])
        return msgs

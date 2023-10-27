#!/usr/bin/python3
"""
This module establishes a conection with the SMTP email server
and class Emailer() handles the emails
"""

import imaplib
import email
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

        for key, value in budget.to_dict().items():
            if key not in ["id", "__class__", "sent", "active", "vehicle_id", "confirmed", "services"]:
                key = " ".join(key.split("_"))
                body += f"\t{key}: {value}\n"
        
        body += "\nThe following services will be carried out:"
        for service in budget.services:
            body += "\n"
            for key, value in service.to_dict().items():
                if key not in ["id", "user_id", "done", "vehicle_id", "budget_id", "__class__", "worker", "created_at"]:
                    key = " ".join(key.split("_"))
                    body += f"\t{key}: {value}\n"

        return body

    def sendbdgt(self, user, budget, client):
        try:
            self.connect(user)

            body = self.message(budget, client)

            self.mail.sendmail(user.mail, client.email, body)
        finally:
            self.terminate()

    def read(self):
        pass

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
    def message(budget):
        """Returns the predefined message to send"""
        return budget

    def sendbdgt(self, user, budget, client):
        try:
            self.connect(user)

            subject = "New Budget To Confirm!"
            msg = self.message(budget)
            body = f"Subject: {subject}\n\n{msg}"

            self.mail.sendmail(user.mail, client.email, body)
        finally:
            self.terminate()

    def read(self):
        pass

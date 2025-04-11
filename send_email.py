import os
import yagmail

receiver = os.getenv("EMAIL_RECEIVER")
subject = "CI/CD Pipeline Success"
body = """
Hi Team,

The Bitbucket CI/CD pipeline has successfully run and deployed the code to the production server.

Thank you,
CI/CD Bot
"""
yag = yagmail.SMTP(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
yag.send(to=receiver, subject=subject, contents=body)
print("Notification email sent successfully!")

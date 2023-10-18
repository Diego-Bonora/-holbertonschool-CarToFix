""" This module can be used to create multiple Budgets (with no services) """

from models.budget import Budget
from models import storage

budget = Budget(total_price=400.0, payment_method="Credit-Card", installments=0, warranty=0,confirmed=False,sent=False,active=False)
print(budget)
storage.new(budget)
storage.save()

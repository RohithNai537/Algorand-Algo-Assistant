from algopy import ARC4Contract, arc4, gtxn, Global, itxn, log
from algopy.arc4 import abimethod

# Struct to store task information
class QAEntry(arc4.Struct, frozen=False):
    user: arc4.Address
    question: arc4.String
    answer: arc4.String
    resolved: arc4.Bool

class AlgorandAssistant(ARC4Contract):
    admin: arc4.Address 

@arc4.abimethod(create=True)
def create(self, admin: arc4.Address):
    self.admin = admin

@arc4.abimethod
def register_user(self):
    from algopy import App, Txn, Int
    App.localPut(Txn.sender, arc4.Bytes("registered"), Int(1))

@arc4.abimethod
def submit_question(self, query_id: arc4.UInt64, question: arc4.String, user: arc4.Address):
    self.boxes[query_id] = QAEntry(
        user=user,
        question=question,
        answer=arc4.String(""),
        resolved=arc4.Bool(False)
    )


from algopy import ARC4Contract, arc4, gtxn, Global, itxn, log
from algopy.arc4 import abimethod

# Struct to store task information
class Task(arc4.Struct, frozen=False):
    creator: arc4.Address
    description: arc4.String
    reward: arc4.UInt64
    is_complete: arc4.Bool

class AlgorandAssistant(ARC4Contract):
    admin: arc4.Address 

@arc4.abimethod(create=True)
def create(self, admin: arc4.Address):
    self.admin = admin

@arc4.abimethod
def register_user(self):
    from algopy import App, Txn, Int
    App.localPut(Txn.sender, arc4.Bytes("registered"), Int(1))

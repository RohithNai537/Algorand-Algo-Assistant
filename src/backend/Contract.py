from algopy import ARC4Contract, arc4, gtxn, Global, itxn, log

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

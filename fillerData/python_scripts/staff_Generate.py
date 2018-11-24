import sqlite3
import random

conn = sqlite3.connect("F:\\Users\\Matt\\Desktop\\DBFiller\\FillerDB_staff.db")

conn.execute("CREATE TABLE staff (staffID VARCHAR(6) PRIMARY KEY ,name VARCHAR(255), specialty VARCHAR(255), phoneNumber VARCHAR(10))")

Fn = open("FirstNames.txt")
FnL = Fn.readlines()

randomInt = random.randint(100000,999999)

specialty = "spec_"

def randPhone():
    return str(random.randint(1000000000,9999999999))

for itr,idx in enumerate(range(200)):
    SQLinsert = "INSERT INTO staff (staffID ,name, specialty, phoneNumber) VALUES ('%s','%s','%s', '%s')" % (str(randomInt + idx).zfill(8), ''.join([i for i in (random.choice(FnL)) if i.isalpha()]).lower(), "spec_" + str(random.randint(1,20)), str(randPhone())) 
    #print(SQLinsert)
    conn.execute(SQLinsert)
    conn.commit()

conn.close()



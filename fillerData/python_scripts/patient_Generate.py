import sqlite3
import random

conn = sqlite3.connect("F:\\Users\\Matt\\Desktop\\DBFiller\\FillerDB.db")

conn.execute("CREATE TABLE patient (id VARCHAR(8) PRIMARY KEY ,firstname VARCHAR(255), lastname VARCHAR(255), age INTEGER, sex CHAR(1))")=

Sn = open("Surnames.txt")
SnL = Sn.readlines()

Fn = open("FirstNames.txt")
FnL = Fn.readlines()

Sx = ["m","f"]

randomInt = random.randint(900000,1000000)

for itr,idx in enumerate(range(1000)):
    SQLinsert = "INSERT INTO patient (id ,firstname, lastname, age, sex) VALUES ( '%s' ,'%s','%s', %u, '%c')" 
        get_ipython().run_line_magic('(', "str(randomInt + idx).zfill(8), ''.join([i for i in (random.choice(FnL)) if i.isalpha()]).lower(),''.join([i for i in (random.choice(SnL)) if i.isalpha()]).lower(), random.randint(1,12), random.choice(Sx))")
    #print(SQLinsert)
    conn.execute(SQLinsert)
    conn.commit()

conn.close()




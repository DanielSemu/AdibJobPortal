import pyodbc
try:
    conn = pyodbc.connect(
        driver='{ODBC Driver 17 for SQL Server}',
        server='INAPP-DB-SRVR\\ADIBTESTDBSERVER',
        database='ADIB_JobPortal',
        uid='sa',
        pwd='Adib@Te5t'
    )
    print("Success! SQL Server version:", conn.getinfo(pyodbc.SQL_DBMS_VER))
except pyodbc.Error as e:
    print("Connection failed:", e)
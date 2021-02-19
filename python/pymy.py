

from flask import Flask

# 웹서버 생성
app = Flask(__name__)
#print(app)
#print(__name__)


from flask_cors import CORS
CORS(app)

#url
@app.route('/brand')
def brandName():
    return jsonString

    
if __name__ == '__main__':
     app.run(debug=True, port=8000)




import pymysql
project_db = pymysql.connect(
user='aia',
passwd='aia',
host='openproject.cjo3m3qn9rnp.ap-northeast-2.rds.amazonaws.com',
db='open',
charset='utf8'
)
cursor1 = project_db.cursor()

hashtag_name = '걸크러쉬'
sql = "SELECT ootdidx FROM ootd where ootdhashtag like \'%{}%\'" .format(hashtag_name)
print(sql)
cursor1.execute(sql) 

ootdidx = []
while True :
 
    row = cursor1.fetchone()
 
    if row==None :
        break;
    print(row[0])
    print(type(row[0]))
    ootdidx.append(row[0])
    
print(ootdidx)
a = '하하'
b = '호호'

project_db.close()


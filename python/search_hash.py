from flask import Flask, request
import pymysql
import json


# 웹서버 생성
app = Flask(__name__)
#print(app)
#print(__name__)


from flask_cors import CORS
CORS(app)

#url
@app.route('/hashsearch', methods =['GET'])
def hashSearch() :
    hashtag = request.args.get('hash', default = '없음', type = str)
    #hashtag_name =  request.args.get(hash) 
    print('해시태그네임', hashtag)



    project_db = pymysql.connect(
    user='aia',
    passwd='aia',
    host='openproject.cjo3m3qn9rnp.ap-northeast-2.rds.amazonaws.com',
    db='open',
    charset='utf8'
    )
    cursor1 = project_db.cursor()

    #hashtag_name = '걸크러쉬'
    sql = "SELECT * FROM ootd where ootdhashtag like \'%{}%\'" .format('걸크러쉬')
    print(sql)
    cursor1.execute(sql) 

    ootdidx = []
    while True :
 
        row = cursor1.fetchone()
 
        if row==None :
            break;

        tupleTodict(row)
        ootdidx.append(row[0])

    jsonString = json.dumps(ootdidx, ensure_ascii=False)
    #print(jsonString)

    
    project_db.close()



    return jsonString

def tupleTodict(tp) :
    print('튜플드렁옴')
    print(tp)
    print(tp[15])



if __name__ == '__main__':
     app.run(debug=True, port=8000)
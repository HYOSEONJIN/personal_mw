from urllib import request

from bs4 import BeautifulSoup as bs
import re
import pymysql

url = 'https://search.musinsa.com/ranking/brand'

target = request.urlopen(url)
soup = bs(target, 'html.parser')

brand = soup.select('.brandLogo img')
rankup = soup.select('.rank')
result_list = soup.find_all('span', class_="rank")

brandname = []
brandrank = []
brandrank_data = []
rank_data = []
search_data = []





for span in result_list[:10] :
    brandrank_data.append(span.text)

print(brandrank_data)

print('----------------------------시작------------------------')

for alt in brand[:10] :
    #print(alt.get('alt'))
    brandname.append(alt.get('alt'))


print(brandname)
print(brandname[0])
print('----------------------------------------------------')


for cla in rankup[:10] :
    brandrank.append(cla.get('class'))

print(brandrank)
print('----------------------------------------------------')


for i in range(10) :
    rank_data.append(
        {
            'name':brandname[i],
            'rank':brandrank_data[i]
        }
        
        )

print(rank_data)
print('----------------------------------------------------')





import json
jsonString = json.dumps(rank_data, ensure_ascii=False)

print(jsonString)


from flask import Flask, request

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


def tupleTodict(tp) :
    print('들어온 튜플', tp)
    search_data.append({
        'ootdidx' : tp[0],
        'ootdphotoname' : tp[1],
        'ootdnic' : tp[2],
        'ootdloc' : tp[3],
        'ootdlikecnt' : tp[4]
    })
    print(search_data)



#url
@app.route('/hashsearch', methods =['GET'])
def hashSearch() :
    hashtag = request.args.get('hash', default = '없음', type = str)
    #hashtag_name =  request.args.get(hash) 
    print('해시태그네임', hashtag)

    ootdidx = []
    
    return_data = []

    project_db = pymysql.connect(
    user='aia',
    passwd='aia',
    host='openproject.cjo3m3qn9rnp.ap-northeast-2.rds.amazonaws.com',
    db='open',
    charset='utf8'
    )
    cursor1 = project_db.cursor()

    #hashtag_name = '걸크러쉬'
    sql = "SELECT ootdidx, ootdphotoname, ootdnic, ootdloc, ootdlikecnt FROM ootd where ootdhashtag like \'%{}%\'" .format(hashtag)
    print('113번째줄', sql)
    cursor1.execute(sql) 
    search_data.clear()





    while True :
 
        row = cursor1.fetchone()
 
        if row==None :
            break;

        tupleTodict(row)
        ootdidx.append(row[0])
    
    
    print('현재써치데이터', search_data)
    jsonString = json.dumps(search_data, ensure_ascii=False)
    print('만들어진제이슨결과', jsonString)
    
    project_db.close()



    return jsonString






    


    
if __name__ == '__main__':
     app.run(debug=True, port=8000, host='ec2-13-125-232-157.ap-northeast-2.compute.amazonaws.com')
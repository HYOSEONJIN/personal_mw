from urllib import request
from bs4 import BeautifulSoup as bs
import re

url = 'https://search.musinsa.com/ranking/brand'

target = request.urlopen(url)
soup = bs(target, 'html.parser')

brand = soup.select('.brandLogo img')
rankup = soup.select('.rank')
brandname = []
brandrank = []

#print(brand)
#print(rankup)
print('----------------------------시작------------------------')

for alt in brand[:10] :
    #print(alt.get('alt'))
    brandname.append(alt.get('alt'))


print(brandname)
print('----------------------------------------------------')


for cla in rankup[:10] :
    brandrank.append(cla.get('class'))

print(brandrank)
print('----------------------------------------------------')



















import json
jsonString = json.dumps(brandname, ensure_ascii=False)

#print(jsonString)


from flask import Flask

# 웹서버 생성
app = Flask(__name__)
#print(app)
#print(__name__)

#url
@app.route('/brand')
def brandName():
    return jsonString
    
if __name__ == '__main__':
     app.run(debug=True, port=8000)
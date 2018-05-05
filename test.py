# -*- coding: UTF-8 -*-  
import urllib  
import urllib2
from bs4 import BeautifulSoup  
  
#下载数据  
url = "http://www.weather.com.cn/weather/101260101.shtml"  
content = urllib2.urlopen(url).read()  
soup = BeautifulSoup(content,"html.parser")  
#print(soup.title.get_text())  
  
content = ""  
name = soup.find_all(attrs={"class":"sky skyid lv3 on"})  
for u in name:  
    wea = u.find(attrs={"class":"wea"}).get_text()  
    tem = u.find(attrs={"class":"tem"}).get_text()  
    content = "天气:" + wea + " 温度:" + tem  
    content = content.replace("\n","")  
    print(content)


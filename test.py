# -*- coding: UTF-8 -*-  
import urllib  
import urllib2
import re
from bs4 import BeautifulSoup  
import datetime
import time
  
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

if url:
    if 1:
        #nowTime=datetime.datetime.now().microsecond
        nowTime=time.time()
        strTime='3天前'
        tm = re.match(r'(.*)(分钟|小时|天)前', strTime, re.M|re.I)
        print 'nowTime'
        print tm
        print tm.group()
        print tm.group(1)
        print nowTime
        if tm:
            try:
                if (tm.group().index('分钟') != -1):
                    nowTime = nowTime - int(tm.group(1)) * 60
            except ValueError:
                try:
                    if (tm.group().index('小时') != -1):
                        nowTime = nowTime - int(tm.group(1)) * 60 * 60
                except ValueError:
                    try:
                        if (tm.group().index('天') != -1):
                            nowTime = nowTime - int(tm.group(1)) * 60 * 60 * 24
                    except ValueError:
                        print nowTime
        print nowTime


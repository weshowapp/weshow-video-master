# -*- coding: UTF-8 -*-  
from selenium import webdriver      
from selenium.webdriver.common.keys import Keys
import selenium.webdriver.support.ui as ui
import re
import os
import codecs
import sys
#import MySQLdb
import pymysql
import datetime
import time
import urllib
import urllib2
from bs4 import BeautifulSoup

#打开Firefox浏览器 设定等待加载时间
#driver = webdriver.Firefox()  
#wait = ui.WebDriverWait(driver,10)

reload(sys)
sys.setdefaultencoding('utf-8')

#获取
def getPage():  
    print 'getPage'  
    number = 0
    #texts = driver.find_element_by_xpath("//div[@id='papelist']").text
    print '页码', texts
    m = re.findall(r'(\w*[0-9]+)\w*',texts) #正则表达式寻找数字
    print '页数：' + str(m[1])
    return int(m[1])     

#主函数
def main():
    print 'main'
    beginIndex = int(sys.argv[1])
    endIndex = int(sys.argv[2])
    print beginIndex
    #获取txt文件总行数  
    count = len(open("Bishijie_info_detail_URL.txt",'rU').readlines())
    print count  
    n = 0  
    urlfile = open("Bishijie_info_detail_URL.txt",'r')

    #循环获取文章   
    while n < count:
        url = urlfile.readline()  
        url = url.strip("\n")  
        print url  
        #driver.get(url)  

        #nowTime=datetime.datetime.now().microsecond
        nowTime=time.time()
        print 'nowTime'
        print nowTime
        #time.sleep(2)  
  
        #数据库操作结合  
        conn=pymysql.connect(host='localhost', user='root',  use_unicode='true', charset="utf8mb4",
                             passwd='weshowapp1', port=3306, db='weshow')  
        cur=conn.cursor() #数据库游标  
        try:

            #报错:UnicodeEncodeError: 'latin-1' codec can't encode character  
            #conn.set_character_set('utf8mb4')  
            cur.execute('SET NAMES utf8mb4;')  
            cur.execute('SET CHARACTER SET utf8mb4;')  
            cur.execute('SET character_set_connection=utf8mb4;')

            #具体内容处理  
            m = beginIndex #第1页  
            while m <= endIndex:  
                ur = url + str(m)  
                print ur  
                #driver.get(ur)  
                urldata = urllib2.urlopen(ur).read()
                soup = BeautifulSoup(urldata,"html.parser")
                #print soup

                #标题
                #article_title = driver.find_elements_by_xpath("//div[@class='title']")
                article_title = soup.find_all(class_="title")
                if article_title:
                    print 'article_title'  
                    print article_title  
                    for title in article_title:  
                        #print url  
                        con = title.text  
                        con = con.strip("\n")  
                        #print con + '\n'  
                else:
                    m = m + 1
                    continue

                #摘要  
                #article_digest = driver.find_elements_by_xpath("//div[@class='abstract']")
                article_digest = soup.find_all(attrs={'class':'abstract'})
                for digest in article_digest:
                    con = digest.text  
                    con = con.strip("\n")  
                    #print con + '\n'  

                #Content
                #article_content = driver.find_elements_by_xpath("//div[@class='contentContainer']")
                article_content = soup.find_all('section', class_="contentContainer")
                #print 'article_content'  
                #print article_content
                for item in article_content:
                    con = item.text
                    con = con.strip("\n")
                    #print con + '\n'
                    #print 'section '
                    #print item

                #Author
                #article_author = driver.find_elements_by_xpath("//div[@class='author']")
                article_author = soup.find_all(class_="author")
                if article_author:
                    for item in article_author:
                        con = item.text
                        con = con.strip("\n")
                    #print con + '\n'
                else:
                    article_author = soup.find_all(class_="authorName")
                    #article_author = ['Unknown'];

                #source
                #article_source = driver.find_elements_by_xpath("//div[@class='source']")
                article_source = soup.find_all(class_="source")
                for item in article_source:
                    con = item.text
                    con = con.strip("\n")
                    #print con + '\n'

                #time
                #article_time = driver.find_elements_by_xpath("//div[@class='time']")
                article_time = soup.find_all(class_="time")
                for item in article_time:
                    con = item.text
                    con = con.strip("\n")
                    print con + '\n'

                num = 0  
                print u'长度', len(article_title)  
                while num < 1:  
                    #插入数据 8个值  
                    sql = '''insert into weshow_article 
                                (author_name,source_name,source_url,pub_time_str,pub_time,title,digest,image0,content,rawtext,rawdata) 
                            values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''  
                    title = article_title[num].text
                    digest = article_digest[num].text
                    content = article_content[num].text
                    author = article_author[num].text
                    source = article_source[num].text
                    pubTime = article_time[num].text
                    rawdata = unicode(article_content[num])
                    #print digest
                    rawSoup = BeautifulSoup(rawdata)
                    image0 = ''
                    imgObj = rawSoup.find('img')
                    #print 'imgObj'
                    #print imgObj
                    if imgObj:
                        image0 = imgObj.attrs['src']
                        #print 'image0'
                        #print image0
                    rawdata = rawdata.replace('<img', '<img width=100%')
                    author = author.replace('作者：', '')
                    author = author.replace('作者:', '')
                    #tm = time.match(/(.)+(分钟|小时|天)前/i);
                    tm = re.match(r'(.*)(分钟|小时|天)前', unicode(article_time[num].text), re.M|re.I)
                    print 'nowTime'
                    print pubTime
                    print tm
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

                    cur.execute(sql, (author, source, ur, pubTime, nowTime, title, digest, image0, content, rawdata, rawdata))
                    print 'execute\n'

                    num = num + 1
                else:
                    print u'数据库插入成功'
                m = m + 1  

        #异常处理  
        #except MySQLdb.Error,e:
        except pymysql.Error,e:
            print "Mysql Error %d: %s" % (e.args[0], e.args[1])  
        finally:  
            cur.close()
            conn.commit()
            conn.close()

        n = n + 1

    else:  
        urlfile.close()  
        print 'Load Over'  

main()
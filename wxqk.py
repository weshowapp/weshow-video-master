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

reload(sys)
sys.setdefaultencoding('utf-8')

#主函数
def main():
    print 'main'
    #获取txt文件总行数  
    count = len(open("Weixin_pub_url.txt",'rU').readlines())
    print count  
    n = 0  
    urlfile = open("Weixin_pub_url.txt",'r')

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
        time.sleep(2)

        #数据库操作
        conn=pymysql.connect(host='localhost', user='root',  use_unicode='true', charset="utf8mb4",
                             passwd='weshowapp1', port=3306, db='weshow')  
        cur=conn.cursor() #数据库游标  
        try:

            #报错:UnicodeEncodeError: 'latin-1' codec can't encode character  
            #conn.set_character_set('utf8mb4')  
            cur.execute('SET NAMES utf8mb4;')  
            cur.execute('SET CHARACTER SET utf8mb4;')  
            cur.execute('SET character_set_connection=utf8mb4;')

            #URL处理  
            urldata = urllib2.urlopen(url).read()
            soup0 = BeautifulSoup(urldata, "html.parser")
            #print soup

            #Avatar
            avatar = '';
            profile_avatar = soup0.find(class_="radius_avatar profile_avatar")
            if profile_avatar:
                profiledata = unicode(profile_avatar)
                profileSoup = BeautifulSoup(profiledata)
                profileObj = profileSoup.find('img')
                if profileObj:
                    avatar = profileObj.attrs['src'];

            #Desc
            desc = '';
            profile_desc = soup0.find(class_="profile_desc_value")
            if profile_desc:
                desc = profile_desc.text

            #link
            article_links = soup0.find_all(class_="weui_media_title")
            if article_links:
                print 'article_links'
                print article_links
                for link in article_links:
                    #print link
                    art_url = 'https://mp.weixin.qq.com' + link.attrs['hrefs']
                    print art_url

                    #URL处理  
                    contentdata = urllib2.urlopen(art_url).read()
                    soup = BeautifulSoup(contentdata, "html.parser")
                    #print soup

                    #Title
                    article_title = soup.find("title")
                    if article_title:
                        print 'article_title'
                        print article_title
                        #print con + '\n'  
                    else:
                        continue

                    #Content
                    article_content = soup.find('div', class_="rich_media_content")
                    print 'article_content'  
                    print article_content

                    #Author
                    article_author = soup.find(class_="rich_media_meta rich_media_meta_text rich_media_meta_nickname")
                    #article_author = 'Unknown';
                    print 'article_author'  
                    print article_author

                    #Time
                    article_time = soup.find(id="post-date")
                    print 'article_time'  
                    print article_time

                    #插入数据
                    sql = '''insert into weshow_article 
                                (author_name,source_name,source_url,pub_time_str,pub_time,title,digest,image0,image1,image2,image3,content,rawtext,rawdata) 
                            values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
                    sqlMagazine = '''insert into weshow_magazine 
                                (name,cover_url,description,add_time) 
                            values(%s, %s, %s, %s)'''
                    title = article_title.text
                    content = article_content.text
                    digest = content[0, 100]
                    author = article_author.text
                    source = author
                    pubTime = article_time.text

                    rawdata = unicode(article_content)
                    rawSoup = BeautifulSoup(rawdata)
                    image0 = ''
                    image1 = ''
                    image2 = ''
                    image3 = ''
                    imgObj = rawSoup.find_all('img')
                    #print 'imgObj'
                    #print imgObj
                    if imgObj:
                        image0 = imgObj[0].attrs['src']
                        if len(imgObj) > 1:
                            image1 = imgObj[1].attrs['src']
                        if len(imgObj) > 2:
                            image2 = imgObj[2].attrs['src']
                        if len(imgObj) > 3:
                            image3 = imgObj[3].attrs['src']
                        #print 'image0'
                        #print image0
                    rawdata = rawdata.replace('width=', 'wd0=')
                    rawdata = rawdata.replace('height=', 'hg0=')
                    rawdata = rawdata.replace('<img', '<img width=100%')
                    digest = digest.strip("\n")
                    nowTime = time.time()
                    print nowTime
                    timeStruct = time.strptime(pubTime, "%Y-%m-%d")
                    nowTime = int(time.mktime(timeStruct))
                    print nowTime

                    try:
                        cur.execute(sql, (author, source, art_url, pubTime, nowTime, title, digest, image0, image1, image2, image3, content, rawdata, rawdata))
                    except pymysql.Error, err:
                        print err
                    try:
                        nowTime = time.time()
                        cur.execute(sqlMagazine, (source, avatar, desc, nowTime))
                    except pymysql.Error, err1:
                        print err1
                    print 'execute\n'

                #else:
                #    print u'数据库插入成功'

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
        print 'Load Completed'  

main()
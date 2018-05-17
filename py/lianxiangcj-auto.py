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
import requests
import json
import ssl
from requests.auth import HTTPBasicAuth
import wxdb

#打开Firefox浏览器 设定等待加载时间
#driver = webdriver.Firefox()  
#wait = ui.WebDriverWait(driver,10)

reload(sys)
sys.setdefaultencoding('utf-8')

site = 'https://www.chainfor.com'

#主函数
def main():
    #print ('main')
    #index
    data = '';
    try :
        data = urllib2.urlopen(site + '/news').read()
        #data = urllib.request.urlopen(ur).read()
    #except (urllib.error.HTTPError):
    #    print ("URLLIB Error ")
    except (urllib2.HTTPError):
        print ("URLLIB2 Error ")
        #print (e0)

    soupBox = BeautifulSoup(data, "html.parser")
    url_box = soupBox.find('ul', class_="newsBox")
    soupIndex = BeautifulSoup(unicode(url_box), "html.parser")
    url_list = soupIndex.find_all('li')
    if url_list:
        print(len(url_list))
        print(url_list[0]['data-id'])

        #nowTime=datetime.datetime.now().microsecond
        nowTime = time.time()
        time.sleep(1)

        #数据库操作结合
        conn=pymysql.connect(host='localhost', user='root',  use_unicode='true', charset="utf8mb4",
                             passwd='weshowapp1', port=3306, db='weshow')  
        cur=conn.cursor()

        try:
            #报错:UnicodeEncodeError: 'latin-1' codec can't encode character  
            #conn.set_character_set('utf8mb4')  
            cur.execute('SET NAMES utf8mb4;')  
            cur.execute('SET CHARACTER SET utf8mb4;')  
            cur.execute('SET character_set_connection=utf8mb4;')

            #具体内容处理
            for urlitem in url_list:
                dataid = urlitem['data-id']
                ur = site + '/news/show/' + str(dataid) + '.html'
                print (ur)
                print (urlitem.p)

                if wxdb.wxdb_exist(cur, ur) == 1:
                    continue #DATA EXIST

                urldata = ''
                try :
                    urldata = urllib2.urlopen(ur).read()
                    #urldata = urllib.request.urlopen(ur).read()
                #except (urllib.error.HTTPError):
                #    print ("URLLIB Error ")
                #    m = m + 1
                #    continue
                except (urllib2.HTTPError):
                    print ("URLLIB2 Error ")
                    #print (e0)
                    continue
                soup = BeautifulSoup(urldata, "html.parser")
                #print soup

                title = ''
                content = ''
                digest = ''
                rawdata = ''
                image0 = ''
                image1 = ''
                image2 = ''
                image3 = ''
                author = ''
                source = '链向财经'
                source_id = 1
                type = 1
                pubtime = ''
                nowTime = time.time()

                print ('parse')
                #标题
                #article_title = driver.find_elements_by_xpath("//div[@class='title']")
                article_title = soup.find('h1', class_="m-i-title")
                if article_title:
                    print ('article_title')
                    title = article_title.text
                    print (title)
                else:
                    continue

                #摘要
                #article_digest = soup.find(attrs={'class':'abstract'})
                #if article_digest:
                #    print ('article_digest')
                #    digest = article_digest.text
                #    digest = digest.strip("\n")
                #    digest = digest.strip()
                #else:
                #    continue

                #Content
                #article_content = driver.find_elements_by_xpath("//div[@class='contentContainer']")
                article_content = soup.find('div', class_="m-i-bd")
                #print ('article_content')
                #print (article_content)
                if article_content:
                    content = unicode(article_content.text)
                    content = content.strip("\n")
                    content = content.strip()
                    content = content.strip("\n")
                    digest = content[0:128]
                    rawdata = unicode(article_content)
                    rawSoup = BeautifulSoup(rawdata)
                    imgObj = rawSoup.find_all('img')
                    image0 = wxdb.wxdb_getimage(imgObj, 0, 'src', site)
                    image1 = wxdb.wxdb_getimage(imgObj, 1, 'src', site)
                    image2 = wxdb.wxdb_getimage(imgObj, 2, 'src', site)
                    image3 = wxdb.wxdb_getimage(imgObj, 3, 'src', site)
                    rawdata = wxdb.wxdb_fm_image(rawdata)
                    rawdata = rawdata.replace('并第一时间同步至链向财经', '')
                    #rawdata = rawdata.replace('data-original', 'src')
                else:
                    continue

                #source
                #article_source = soup.find(class_="m-i-type-source rt")
                #if article_source:
                #    source = article_source.text
                #    source = source.strip("\n")
                #    source = source.strip()
                #    source = source.strip("\n")
                #    #print ('source')
                #    print (source)
                #else:
                #    print ('source empty')
                #    continue

                #Author
                #article_author = driver.find_elements_by_xpath("//div[@class='author']")
                article_author = soup.find(class_="m-i-type-source rt")
                if article_author:
                    author = article_author.text
                    author = author.replace('来源：', '')
                    author = author.strip("\n")
                    author = author.strip()
                    author = author.strip("\n")
                    #print ('author')
                    print (author)
                else:
                    print ('author empty')
                    #continue

                pubtime = '2018-04-01 01:01:01'
                #time
                article_time = soup.find(class_="m-i-type-timer lf")
                print ('article_time')
                print (article_time)
                if article_time:
                    pubtime = '2018-01-01 01：01'
                    if len(article_time.text) < 7:
                        pubtime = time.strftime('%Y-%m-%d ',time.localtime(time.time())) + article_time.text
                    else:
                        pubtime = '2018-' + article_time.text
                    try:
                        timeStruct = time.strptime(pubtime, "%Y-%m-%d %H:%M")
                        nowTime = int(time.mktime(timeStruct))
                    except ValueError, err1:
                        print (err1)
                        continue
                else:
                    continue

                if content:
                    wxdb.wxdb_insert(cur, type, author, source, source_id, ur, pubtime, nowTime, title, digest, image0, image1, image2, image3, content, rawdata)

        #异常处理
        #except MySQLdb.Error,e:
        #except pymysql.Error,e:
        except (pymysql.Error):
            print ("Mysql Error")
            #print ("Mysql Error %d: %s" % (e.args[0], e.args[1]))
        finally:  
            cur.close()
            conn.commit()
            conn.close()

    else:
        print ('Load Completed')

main()
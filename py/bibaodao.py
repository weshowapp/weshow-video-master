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
import random
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

#主函数
def main():
    #print ('main')
    #index
    data = '';
    try :
        data = urllib2.urlopen('http://www.bibaodao.com').read()
        #data = urllib.request.urlopen(ur).read()
    #except (urllib.error.HTTPError):
    #    print ("URLLIB Error ")
    except (urllib2.HTTPError):
        print ("URLLIB2 Error ")
        #print (e0)

    soupBox = BeautifulSoup(data, "html.parser")
    #url_box = soupBox.find('ul', class_="newsBox")
    #soupIndex = BeautifulSoup(unicode(url_box), "html.parser")
    url_list = soupBox.find_all('div', class_="newsl_jj")
    if url_list:
        print(len(url_list))
        #print(url_list[0])

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
                ur = '';
                if urlitem:
                    ur = 'http://www.bibaodao.com' + urlitem.a['href']
                    ur = ur.strip("\n")
                    ur = ur.strip()
                print (ur)

                if wxdb.wxdb_exist(cur, ur) == 1:
                    m = m + 1
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
                digest = urlitem.p.text
                rawdata = ''
                image0 = ''
                image1 = ''
                image2 = ''
                image3 = ''
                author = '币报道'
                source = '币报道'
                source_id = 11
                type = 11
                pubtime = ''
                nowTime = time.time()

                print ('parse')
                #标题
                #article_title = driver.find_elements_by_xpath("//div[@class='title']")
                article_title = soup.find('div', class_="artic_title")
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
                article_content = soup.find('div', class_="info_box")
                #print ('article_content')
                #print (article_content)
                if article_content:
                    content = unicode(article_content.text)
                    content = content.strip("\n")
                    content = content.strip()
                    content = content.strip("\n")
                    #digest = content[0:128]
                    digest = digest.strip("\n")
                    digest = digest.strip()
                    digest = digest.strip("\n")
                    rawdata = unicode(article_content)
                    image0 = ''
                    image1 = ''
                    image2 = ''
                    image3 = ''
                    rawSoup = BeautifulSoup(rawdata)
                    imgObj = rawSoup.find_all('img')
                    #print(imgObj)
                    if imgObj:
                        image0 = imgObj[0].attrs['src']
                        if image0.find("http://") == -1:
                            image0 = "http://www.bibaodao.com" + image0
                            rawdata = rawdata.replace('src=\"', 'src=\"http://www.bibaodao.com')
                        if len(imgObj) > 1:
                            image1 = imgObj[1].attrs['src']
                            if image1.find("http://") == -1:
                                image1 = "http://www.bibaodao.com" + image1
                        if len(imgObj) > 2:
                            image2 = imgObj[2].attrs['src']
                            if image2.find("http://") == -1:
                                image2 = "http://www.bibaodao.com" + image2
                        if len(imgObj) > 3:
                            image3 = imgObj[3].attrs['src']
                            if image3.find("http://") == -1:
                                image3 = "http://www.bibaodao.com" + image3
                        #print('image0')
                        #print(image0)
                    rawdata = rawdata.replace('width=', 'wd0=')
                    rawdata = rawdata.replace('height=', 'hg0=')
                    rawdata = rawdata.replace('<img', '<img width=100%')
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
                #article_author = soup.find('span', class_="author-name")
                #if article_author:
                #    author = article_author.text
                #    author = author.strip("\n")
                #    author = author.strip()
                #    author = author.strip("\n")
                #    source = author
                #    #print ('author')
                #    print (author)
                #else:
                #    print ('author empty')
                    #continue

                pubtime = '2018-04-01 01:01:01'
                #time
                #article_time = soup.find('span', class_="publish-time")
                article_time = urlitem.span
                print ('article_time')
                print (article_time)
                if article_time:
                    pubtime = article_time.text
                    pubtime = pubtime.strip()
                    timeStruct = time.strptime(pubtime, "%Y-%m-%d %H:%M:%S")
                    nowTime = int(time.mktime(timeStruct))
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
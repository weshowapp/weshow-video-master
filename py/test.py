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
from bs4 import BeautifulSoup
import requests
import json
import ssl
from requests.auth import HTTPBasicAuth

#reload(sys)
#sys.setdefaultencoding('utf-8')

#打开Firefox浏览器 设定等待加载时间
#driver = webdriver.Ie()  
#wait = ui.WebDriverWait(driver, 10)

url = "https://mp.weixin.qq.com/profile?src=3&timestamp=1525795667&ver=1&signature=1b3jo0JP2lZ4289MD4YVs9EW0l2IoA*4GxFBWjR7wk6USkUAQBHPEheX4sKj6GP0URyMVVECuhdDbbX8Wkd6rg=="
#url = "https://mp.weixin.qq.com/profile?src=3&timestamp=1525730654&ver=1&signature=8"

if url:
    #inputUrl = sys.argv[1]
    #if inputUrl:
    #    url = inputUrl
    print (url)
    urldata = urllib.request.urlopen(url).read()
    soup0 = BeautifulSoup(urldata, "html.parser")
    #print(soup)
    #driver.get(url)
    if soup0:
        name = soup0.title.string
        name = name.strip("\n")
        name = name.strip()
        name = name.strip("\n")
        avatar = '';
        profile_avatar = soup0.find(class_="radius_avatar profile_avatar")
        print ('profile_avatar')
        print (profile_avatar)
        if profile_avatar:
            profiledata = str(profile_avatar)
            print (profiledata)
            profileSoup = BeautifulSoup(profiledata)
            print (profileSoup.img)
            profileObj = profileSoup.find('img')
            if profileObj:
                avatar = profileObj.attrs['src'];
        print ('avatar')
        print (avatar)

        #Desc
        desc = '';
        profile_desc = soup0.find(class_="profile_desc_value")
        #print 'profile_desc'
        if profile_desc:
            #print (profile_desc)
            desc = profile_desc.text

        postUrl = "https://www.imcou.com/api/magazine/add"
        values = {}
        values['name'] = name
        values['cover_url'] = avatar
        values['description'] = desc
        response = requests.post(postUrl, values)
        #print (response.text)

        if soup0:
            print (soup0.app_msg_ext_info)
            article_links = soup0.find(text=re.compile("app_msg_ext_info"))
            print('article_links')
            print (len(article_links))
            mList = re.findall(r'var msgList = (.*);', str(article_links))
            #print (len(mList))

            jsonObj = json.loads(mList[0])
            #print (jsonObj['list'][0]['app_msg_ext_info'])

            urlList = [];
            if jsonObj['list']:
                for jsItem in jsonObj['list']:
                    #print (jsItem)
                    art_url = 'https://mp.weixin.qq.com' + jsItem['app_msg_ext_info']['content_url']
                    art_url = art_url.replace('amp;', '')
                    print(art_url)
                    urlList.append(art_url)
                    if jsItem['app_msg_ext_info']['multi_app_msg_item_list']:
                        for subItem in jsItem['app_msg_ext_info']['multi_app_msg_item_list']:
                            art_url = 'https://mp.weixin.qq.com' + subItem['content_url']
                            art_url = art_url.replace('amp;', '')
                            print(art_url)
                            urlList.append(art_url)

            if urlList:
                for art_url in urlList:
                    #URL处理  
                    contentdata = urllib.request.urlopen(art_url).read()
                    soup = BeautifulSoup(contentdata, "html.parser")
                    #print soup

                    #Title
                    article_title = soup.find('h2', id="activity-name")
                    title = ''
                    if article_title:
                        print('article_title')
                        #print(article_title)
                        title = article_title.text
                        #print(title)
                        title = title.strip("\n")
                        title = title.strip()
                        title = title.strip("\n")
                        print(title)
                    else:
                        continue

                    #Content
                    article_content = soup.find('div', class_="rich_media_content")
                    print ('article_content')
                    print (len(article_content.text))
                    print (len(str(article_content)))
                    content = str(article_content.text)
                    content = content.strip("\n")
                    content = content.strip()
                    content = content.strip("\n")
                    digest = content[0:256]
                    rawdata = str(article_content)
                    image0 = ''
                    image1 = ''
                    image2 = ''
                    image3 = ''
                    rawSoup = BeautifulSoup(rawdata)
                    imgObj = rawSoup.find_all('img')
                    #print(imgObj)
                    if imgObj:
                        image0 = imgObj[0].attrs['data-src']
                        if len(imgObj) > 1:
                            image1 = imgObj[1].attrs['data-src']
                        if len(imgObj) > 2:
                            image2 = imgObj[2].attrs['data-src']
                        if len(imgObj) > 3:
                            image3 = imgObj[3].attrs['data-src']
                        #print('image0')
                        #print(image0)
                    rawdata = rawdata.replace('width=', 'wd0=')
                    rawdata = rawdata.replace('height=', 'hg0=')
                    rawdata = rawdata.replace('<img', '<img width=100%')
                    #rawdata = rawdata.replace('data-src', 'src')

                    #Author
                    #article_author = soup.find(class_="rich_media_meta rich_media_meta_text rich_media_meta_nickname")
                    #article_author = 'Unknown';
                    #print ('article_author')
                    #print (article_author)

                    #Time
                    article_time = soup.find('em', id="publish_time")
                    print ('article_time')
                    print (article_time)
                    nowTime = time.time()
                    pubTime = ''
                    if article_time:
                        pubTime = article_time.text + ' 06'
                        timeStruct = time.strptime(pubTime, "%Y-%m-%d %H")
                        nowTime = int(time.mktime(timeStruct)) + random.randint(1, 60000)

                    addUrl = "https://www.imcou.com/api/upload/add"
                    values = {}
                    values['author_name'] = name
                    values['source_name'] = name
                    values['source_url'] = art_url
                    values['pub_time_str'] = pubTime
                    values['pub_time'] = nowTime
                    values['title'] = title
                    values['digest'] = digest
                    values['content'] = content
                    values['rawtext'] = rawdata
                    values['rawdata'] = rawdata
                    values['image0'] = image0
                    values['image1'] = image1
                    values['image2'] = image2
                    values['image3'] = image3
                    response = requests.post(addUrl, values)


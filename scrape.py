# Import the beautifulsoup  
# and request libraries of python. 
import requests, lxml, json, re, base64
import bs4 
from selenium import webdriver

# Make two strings with default google search URL 
# 'https://google.com/search?q=' and 
# our customized search keyword. 
# Concatenate them 

from selenium import webdriver 
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
# chrome_options.add_argument("--disable-extensions")
# chrome_options.add_argument("--disable-gpu")
# chrome_options.add_argument("--no-sandbox") # linux only
chrome_options.add_argument("--headless=new") # for Chrome >= 109
# chrome_options.add_argument("--headless")
# chrome_options.headless = True # also works
driver = webdriver.Chrome(options=chrome_options)

def Scrape(text):


    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36",
    
        }

    params = {
        "q": text,
        "hl": "en",
        "gl": "in",
        "tbm":"shop",
        "content-type": "image/png",
    }
  
# Fetch the URL data using requests.get(url), 
   
    # html = requests.get("https://www.google.com/search?", params=params, headers=headers)
    driver.get("https://www.google.com/search?hl=en&gl=in&tbm=shop&q="+text)
    html = driver.page_source
   
    soup = bs4.BeautifulSoup(html, "lxml")
    ad_results = []
    spon_ad = soup.select_one(".KZmu8e")
    if not spon_ad :
        ad_results.append({
            "type": "spon_ad",
            "title": "No Ads Found",
            "website_link": "No Ads Found",
            "found": False
        })
    else:
        spon_ad_title = spon_ad.select_one("h3").text
        spon_ad_website_link = spon_ad.select_one("a")["href"].split("url=")[1].split("&")[0]
        ad_results.append({
            "type": "spon_ad",
            "title": spon_ad_title,
            "website_link": spon_ad_website_link,
            "found": True
       
        })
        return ad_results
    ad_results = []
    first_ad =  soup.select_one(".i0X6df")
    if not first_ad :
        ad_results.append({
            "type": "ad",
            "title": "No Ads Found",
            "website_link": "No Ads Found",
            "found": False
       
        })
    else:
      
        title =     first_ad.select_one("h3").text
        website_link = first_ad.select_one(".mnIHsc a")["href"].split("url=")[1].split("&")[0]
        image = first_ad.select_one("img")["src"]
       # website_link = re.match(regex, website_link)
        ad_results.append({
            "type": "ad",
            "title": title,
            "website_link": website_link,
             "found": True,
            "image": image

        })
    # for index, ad_result in enumerate(soup.select(".mnr-c"), start=1):
    #     title = ad_result.select_one(".pymv4e").text
    #     #print(index, title)
    #     website_link = ad_result.select_one("a.tkXAec")["href"]
    #     # image = ad_result.select_one(".Gor6zc img")
    #     # print(image)
    #     # ad_link = ad_result.select_one("a.sVXRqc")["href"]
    #     # displayed_link = ad_result.select_one(".qzEoUe").text
    #     # tracking_link = ad_result.select_one(".v5yQqb a.sVXRqc")["data-rw"]
    #     # snippet = ad_result.select_one(".MUxGbd div span").text
    #     # phone = None if ad_result.select_one("span.fUamLb span") is None else ad_result.select_one("span.fUamLb span") .text

    #     # inline_link_text = [title.text for title in ad_result.select("div.bOeY0b .XUpIGb a")]
    #     # inline_link = [link["href"] for link in ad_result.select("div.bOeY0b .XUpIGb a")]

    #     ad_results.append({
    #         "position": index,
    #         "title": title,
    #         "website_link": website_link,
       
       
    #     })

    return ad_results
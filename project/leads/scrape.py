from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

def scrape_webpage(page):
  pass

def scrape_youtube(page):
  pass

def simple_get(url):
  """
  Attempts to get the content at `url` by making an HTTP GET request.
  If the content-type of response is some kind of HTML/XML, return the
  text content, otherwise return None.
  """
  try:
    with closing(get(url, stream=True)) as resp:
      if is_good_response(resp):
        return resp.content
      else:
        return None

  except RequestException as e:
    log_error('Error during requests to {0} : {1}'.format(url, str(e)))
    return None


def is_good_response(resp):
  """
  Returns True if the response seems to be HTML, False otherwise.
  """
  content_type = resp.headers['Content-Type'].lower()
  return (resp.status_code == 200 
    and content_type is not None 
    and content_type.find('html') > -1)


def log_error(e):
  """
  It is always a good idea to log errors. 
  This function just prints them, but you can
  make it do anything.
  """
  print(e)


def get_data(url):
  raw_html = simple_get(url)
  html = BeautifulSoup(raw_html, 'html.parser')
  output_data=dict()
  for title in html.select('title'):
    output_data['title']= title.text

  desc= html.findAll(attrs={"name":"description"})
  for d in desc:
    if d.attrs['name'] == 'description':
      output_data['description']= d.attrs['content']

  desc= html.findAll(attrs={"name":"keywords"})
  for d in desc:
    if d.attrs['name'] == 'keywords':
      output_data['keywords']= d.attrs['content']

  #import pdb;pdb.set_trace()

  return output_data
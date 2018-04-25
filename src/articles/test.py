#coding:utf-8
import json
import cgi
from wsgiref.simple_server import make_server
# with open("./test.md", "rb") as f:
#     with open("./test.json", "wb") as f2:
#         f2.write(json.dumps({'content':f.read()}))

class PathDispatcher:
    def __init__(self):
        self.pathmap = {}

    def __call__(self, environ, start_response):
        path = environ['PATH_INFO']
        method = environ['REQUEST_METHOD'].lower()
        handler = self.pathmap.get((method,path), notfound_404)
        try:
            payload_length = int(environ.get('CONTENT_LENGTH', 0))
            request_body = environ['wsgi.input'].read(payload_length)
            # d = urlparse.parse_qs(request_body)
            payload = json.loads(request_body)
            # print payload.get("phone", "")
        except Exception as e:
            payload = {}
            log.info("parse client request error %s" % e)
            log.info(traceback.format_exc)
        environ['payload'] = payload
        environ["params"] = urlparse.parse_qs(environ['QUERY_STRING'])
        result = handler(environ, start_response)
        return [json.dumps(result)]

    def register(self, method, path, function):
        self.pathmap[method.lower(), path] = function
        return function

if __name__ == '__main__':
  from wsgiref.simple_server import make_server
  def application(environ, start_response):
      start_response('200 OK', [('Content-Type', 'application/json')])
      with open("./test.md", "rb") as f:
        c = str(f.read(), encoding = "utf-8")
      return [bytes(json.dumps({"c": c}), encoding="utf-8")]
  if __name__ == '__main__':
      httpd = make_server('', 9999, application)
      print("Serving HTTP on port 9999...")
      httpd.serve_forever()

require "net/http"

class ApiController < ApplicationController
    def index
        # api_id = params[:id]
        api = "http://www1.xkm.com.tw/hr/DATA/HR" + params[:id] + ".htm"
        url = URI.parse(api)
        req = Net::HTTP::Get.new(url.to_s)
        res = Net::HTTP.start(url.host, url.port) {|http|
            http.request(req)
        }
        ic = res.body.encode("utf-8","big5")
        render :json => {
            :request_id => params[:id],
            :source_html => ic
        }
    end
    def http_test
        url = URI.parse("http://www.example.com/index.html")
        req = Net::HTTP::Get.new(url.to_s)
        res = Net::HTTP.start(url.host, url.port) {|http|
            http.request(req)
        }
        # puts res.body
        render :json => { body: res.body }
    end
end

require "net/http"
require "nokogiri"
require "open-uri"

class ApiController < ApplicationController
    def index
        # https://ruby-china.org/topics/101
        # https://stackoverflow.com/questions/33270851/how-can-i-use-nethttp-to-download-a-file-with-utf-8-characters-in-it
        # Encoding::UndefinedConversionError ("\xA7" from ASCII-8BIT to UTF-8):
        api = "http://www1.xkm.com.tw/hr/DATA/HR" + params[:id] + ".htm"
        doc = Nokogiri::HTML(open(api))
        john = doc.css("table td")
        render :json => {
            request_id: params[:id],
            # source_html: doc
            data: john
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

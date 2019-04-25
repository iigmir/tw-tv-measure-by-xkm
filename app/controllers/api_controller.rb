require "net/http"
require "nokogiri"
require "open-uri"

class ApiController < ApplicationController
    def index
        # https://ruby-china.org/topics/101
        # https://stackoverflow.com/questions/33270851/how-can-i-use-nethttp-to-download-a-file-with-utf-8-characters-in-it
        # Encoding::UndefinedConversionError ("\xA7" from ASCII-8BIT to UTF-8):
        api = "http://www1.xkm.com.tw/hr/DATA/HR" + params[:id] + ".htm"
        date = ""
        message = "No data"
        last_data = ""
        begin
            doc = Nokogiri::HTML( open(api) )
        rescue OpenURI::HTTPError => ex
            
            render :json => {
                message: message,
                date: date,
                meta_data:[],
                data: [],
                last_data: last_data
            }, status: 404
            return
        end

        source = doc.css("td")
        date = source[2].text
        meta_data = source[3, 8]
        data = source[11, source.length]
        message = "Success. Data length: " + data.length.to_s

        new_meta_data = []
        new_data = []
        obj = {}
        i = 0
        meta_data.each_with_index { |val,index|
            new_meta_data.push( val.text )
        }
        data.each_with_index { |val,index|
            obj[ new_meta_data[i] ] = val.text
            i += 1
            if i == new_meta_data.length
                new_data.push( obj )
                i = 0
                obj = {}
            end
        }
        last_data = new_data[ new_data.length - 1 ]
        new_data = new_data[ 0, new_data.length - 2 ]

        render :json => {
            message: message,
            date: date,
            meta_data: new_meta_data,
            data: new_data,
            last_data: last_data
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

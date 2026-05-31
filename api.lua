return function(imageUrl, w, h)
    w = w or 64
    h = h or 64
    
    local HttpService = game:GetService("HttpService")
    
    local siteUrl = "https://biel99lol.github.io/pixel/Index.html?url=" .. 
                    HttpService:UrlEncode(imageUrl) .. 
                    "&w=" .. w .. 
                    "&h=" .. h
    
    local function request(url)
        local fn = (syn and syn.request) or (http and http.request) or request
        local resp = fn({Url = url, Method = "GET"})
        return resp.Body
    end
    
    local html = request(siteUrl)
    
    local hasteLink = string.match(html, "https://hastebin%.com/raw/[a-zA-Z0-9]+")
    
    return hasteLink or error("Link nao encontrado")
end

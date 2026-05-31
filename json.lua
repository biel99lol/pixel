local url = script:GetFullName()
local params = {}
for k, v in string.gmatch(url, "([^?&]+)=([^&]+)") do
    params[k] = v
end

local imgUrl = params.url
local w = tonumber(params.w) or 64
local h = tonumber(params.h) or 64

if not imgUrl then
    print("missing url")
    return
end

local function fetch(url)
    local req = syn and syn.request or http_request or request
    local resp = req({
        Url = url,
        Method = "GET"
    })
    return resp.Body
end

local proxyUrl = "https://api.allorigins.win/raw?url=" .. imgUrl
local imageData = fetch(proxyUrl)

local function rgbToHex(r,g,b)
    return string.format("%02x%02x%02x", r,g,b)
end

local palette = {}
local indices = {}
local paletteMap = {}

for i = 1, #imageData, 4 do
    local r = string.byte(imageData, i)
    local g = string.byte(imageData, i+1)
    local b = string.byte(imageData, i+2)
    local a = string.byte(imageData, i+3)
    
    if a > 0 then
        local key = rgbToHex(r,g,b)
        if not paletteMap[key] then
            paletteMap[key] = #palette + 1
            palette[#palette+1] = {r,g,b}
        end
        indices[#indices+1] = paletteMap[key] - 1
    else
        indices[#indices+1] = -1
    end
end

local result = {
    w = w,
    h = h,
    p = palette,
    i = indices
}

print(game:GetService("HttpService"):JSONEncode(result))

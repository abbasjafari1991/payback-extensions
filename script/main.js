var supportedWebSite = [
    {url: 'allegro.pl', link: 'https://www.payback.pl/sklepy-online/allegro', coupons: "allegro-coupon-2.png"}
]

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var activeTab = tabs[0];
    var activeTabUrl = activeTab.url;
    var mainUrl = activeTabUrl.replace(/(https?:\/\/)?(www.)?/i, '').split('/')[0];
    var result = supportedWebSite.find(value => value.url === mainUrl);

    function createHtmlWhenPayBackIsActive(result) {

        return '<div style="width:300px;height:300px;">' +
            '<h3>you are using this website with payback points</h3>' +
            '<h3>for collecting point faster you can use coupons</h3>' +
            '<img src="/image/' + result.coupons + '" >' +
            '</div>';
    }

    function createHTMLForWhenPayBackIsNotActive(result) {
        return '<div style="width:160px;height:160px;">' +
            '<h3>this website is supported be payback, but you need redirect from payback page</h3>' +
            '<h3>for more informatiin click on this link<a href=' + result.link + ' target = "_blank">PAYBACK</a></h3>' +
            '<img src="/image/hello_extensions.png" style="width:150px;height:150px;" alt="PAYBACK">' +
            '</div>';
    }

    function createHTMLWhenWebsiteIsNotSupportedByPAYBACK() {
        return '<div style="width:160px;height:160px;">' +
            '<h3>this website is not supported by PAYBACK</h3>' +
            '<h3>for more informatiin click on this link<a href="https://www.payback.pl/" target = "_blank">PAYBACK</a></h3>' +
            '<img src="/image/hello_extensions.png" style="width:150px;height:150px;" alt="PAYBACK">' +
            '</div>';
    }

    if (result != null) {
        var html;
        if (activeTabUrl.includes("utm")) {
            html = createHtmlWhenPayBackIsActive(result);
        } else {
            html = createHTMLForWhenPayBackIsNotActive(result);
        }

    } else {
        html = createHTMLWhenWebsiteIsNotSupportedByPAYBACK();
    }
    document.getElementById('main').innerHTML = html;

});

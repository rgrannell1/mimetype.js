#!/usr/bin/env node
"use strict";

var request = require("request");
var fs = require("fs");
var URL = require("url");

var uris = ["http://facebook.com/", "http://twitter.com/", "http://google.com/", "http://youtube.com/", "http://wordpress.org/", "http://adobe.com/", "http://blogspot.com/", "http://wikipedia.org/", "http://linkedin.com/", "http://wordpress.com/", "http://yahoo.com/", "http://amazon.com/", "http://flickr.com/", "http://pinterest.com/", "http://tumblr.com/", "http://w3.org/", "http://apple.com/", "http://myspace.com/", "http://vimeo.com/", "http://microsoft.com/", "http://youtu.be/", "http://qq.com/", "http://digg.com/", "http://baidu.com/", "http://stumbleupon.com/", "http://addthis.com/", "http://statcounter.com/", "http://feedburner.com/", "http://miibeian.gov.cn/", "http://delicious.com/", "http://nytimes.com/", "http://reddit.com/", "http://weebly.com/",, "http://bbc.co.uk/", "http://blogger.com/", "http://msn.com/", "http://macromedia.com/", "http://goo.gl/", "http://instagram.com/", "http://gov.uk/", "http://icio.us/", "http://yandex.ru/", "http://cnn.com/", "http://webs.com/", "http://google.de/", "http://t.co/", "http://livejournal.com/", "http://imdb.com/", "http://mail.ru/", "http://jimdo.com/", "http://sourceforge.net/", "http://go.com/", "http://tinyurl.com/", "http://vk.com/", "http://google.co.jp/", "http://fc2.com/", "http://free.fr/", "http://joomla.org/", "http://creativecommons.org/", "http://typepad.com/", "http://networkadvertising.org/", "http://technorati.com/", "http://sina.com.cn/", "http://hugedomains.com/", "http://about.com/", "http://theguardian.com/", "http://yahoo.co.jp/", "http://nih.gov/", "http://huffingtonpost.com/", "http://google.co.uk/", "http://mozilla.org/", "http://51.la/", "http://aol.com/", "http://ebay.com/", "http://ameblo.jp/", "http://wsj.com/", "http://europa.eu/", "http://taobao.com/", "http://bing.com/", "http://rambler.ru/", "http://guardian.co.uk/", "http://tripod.com/", "http://godaddy.com/", "http://issuu.com/", "http://gnu.org/", "http://geocities.com/", "http://slideshare.net/", "http://wix.com/", "http://mapquest.com/", "http://washingtonpost.com/", "http://homestead.com/", "http://reuters.com/", "http://163.com/", "http://photobucket.com/", "http://forbes.com/", "http://clickbank.net/", "http://weibo.com/", "http://etsy.com/", "http://amazon.co.uk/", "http://dailymotion.com/", "http://soundcloud.com/", "http://usatoday.com/", "http://yelp.com/", "http://cnet.com/", "http://posterous.com/", "http://telegraph.co.uk/", "http://archive.org/", "http://google.fr/", "http://constantcontact.com/", "http://phoca.cz/", "http://phpbb.com/", "http://latimes.com/", "http://e-recht24.de/", "http://rakuten.co.jp/", "http://amazon.de/", "http://opera.com/", "http://miitbeian.gov.cn/", "http://php.net/", "http://scribd.com/", "http://bbb.org/", "http://parallels.com/", "http://ning.com/", "http://dailymail.co.uk/", "http://cdc.gov/", "http://sohu.com/", "http://wikimedia.org/", "http://deviantart.com/", "http://mit.edu/", "http://sakura.ne.jp/", "http://altervista.org/", "http://addtoany.com/", "http://time.com/", "http://google.it/", "http://stanford.edu/", "http://live.com/", "http://alibaba.com/", "http://squidoo.com/", "http://harvard.edu/", "http://gravatar.com/", "http://histats.com/", "http://nasa.gov/", "http://npr.org/", "http://ca.gov/", "http://eventbrite.com/", "http://wired.com/", "http://amazon.co.jp/", "http://nbcnews.com/", "http://blog.com/", "http://amazonaws.com/", "http://bloomberg.com/", "http://narod.ru/", "http://blinklist.com/", "http://imageshack.us/", "http://kickstarter.com/", "http://hatena.ne.jp/", "http://nifty.com/", "http://angelfire.com/", "http://google.es/", "http://ocn.ne.jp/", "http://over-blog.com/", "http://dedecms.com/", "http://google.ca/", "http://a8.net/", "http://weather.com/", "http://pbs.org/", "http://ibm.com/", "http://cpanel.net/", "http://prweb.com/", "http://bandcamp.com/", "http://barnesandnoble.com/", "http://mozilla.com/", "http://noaa.gov/", "http://goo.ne.jp/", "http://comsenz.com/", "http://xrea.com/", "http://cbsnews.com/", "http://foxnews.com/", "http://discuz.net/", "http://eepurl.com/", "http://businessweek.com/", "http://berkeley.edu/", "http://newsvine.com/", "http://bluehost.com/", "http://geocities.jp/", "http://loc.gov/", "http://yolasite.com/", "http://apache.org/", "http://mashable.com/", "http://usda.gov/", "http://nationalgeographic.com/", "http://whitehouse.gov/", "http://tripadvisor.com/", "http://ted.com/", "http://sfgate.com/", "http://biglobe.ne.jp/", "http://epa.gov/", "http://vkontakte.ru/", "http://oracle.com/", "http://seesaa.net/", "http://examiner.com/", "http://cornell.edu/", "http://hp.com/", "http://nps.gov/", "http://disqus.com/", "http://alexa.com/", "http://mysql.com/", "http://house.gov/", "http://sphinn.com/", "http://boston.com/", "http://techcrunch.com/", "http://un.org/", "http://squarespace.com/", "http://icq.com/", "http://freewebs.com/", "http://ezinearticles.com/", "http://ucoz.ru/", "http://independent.co.uk/", "http://mediafire.com/", "http://xinhuanet.com/", "http://google.nl/", "http://reverbnation.com/", "http://imgur.com/", "http://irs.gov/", "http://webnode.com/", "http://wunderground.com/", "http://bizjournals.com/", "http://who.int/", "http://soup.io/", "http://cloudflare.com/", "http://people.com.cn/", "http://ustream.tv/", "http://senate.gov/", "http://cbslocal.com/", "http://ycombinator.com/", "http://opensource.org/", "http://spiegel.de/", "http://oaic.gov.au/", "http://nature.com/", "http://businessinsider.com/", "http://drupal.org/", "http://last.fm/", "http://privacy.gov.au/", "http://skype.com/", "http://wikia.com/", "http://about.me/", "http://webmd.com/", "http://youku.com/", "http://gmpg.org/", "http://fda.gov/", "http://redcross.org/", "http://github.com/", "http://cbc.ca/", "http://umich.edu/", "http://jugem.jp/", "http://shinystat.com/", "http://google.com.br/", "http://ifeng.com/", "http://mac.com/", "http://wiley.com/", "http://discovery.com/", "http://topsy.com/", "http://paypal.com/", "http://google.cn/", "http://surveymonkey.com/", "http://moonfruit.com/", "http://dropbox.com/", "http://exblog.jp/", "http://google.pl/", "http://prnewswire.com/", "http://ft.com/", "http://uol.com.br/", "http://behance.net/", "http://goodreads.com/", "http://netvibes.com/", "http://auda.org.au/", "http://marketwatch.com/", "http://ed.gov/", "http://networksolutions.com/", "http://state.gov/", "http://sitemeter.com/", "http://liveinternet.ru/", "http://ftc.gov/", "http://census.gov/", "http://quantcast.com/", "http://economist.com/", "http://nydailynews.com/", "http://zdnet.com/", "http://cafepress.com/", "http://ow.ly/", "http://meetup.com/", "http://netscape.com/", "http://chicagotribune.com/", "http://theatlantic.com/", "http://google.com.au/", "http://1688.com/", "http://skyrock.com/", "http://list-manage.com/", "http://pagesperso-orange.fr/", "http://cdbaby.com/", "http://friendfeed.com/", "http://ehow.com/", "http://patch.com/", "http://upenn.edu/", "http://engadget.com/", "http://diigo.com/", "http://com.com/", "http://slashdot.org/", "http://washington.edu/", "http://columbia.edu/", "http://nhs.uk/", "http://abc.net.au/", "http://elegantthemes.com/", "http://utexas.edu/", "http://yale.edu/", "http://marriott.com/", "http://bigcartel.com/", "http://ucla.edu/", "http://usgs.gov/", "http://jigsy.com/", "http://hexun.com/", "http://hubpages.com/", "http://slate.com/", "http://purevolume.com/", "http://umn.edu/", "http://bloglines.com/", "http://so-net.ne.jp/", "http://wikispaces.com/", "http://cargocollective.com/", "http://howstuffworks.com/", "http://plala.or.jp/", "http://infoseek.co.jp/", "http://jiathis.com/", "http://usnews.com/", "http://xing.com/", "http://flavors.me/", "http://desdev.cn/", "http://hc360.com/", "http://usa.gov/", "http://edublogs.org/", "http://lycos.com/", "http://wisc.edu/", "http://thetimes.co.uk/", "http://state.tx.us/", "http://example.com/", "http://shareasale.com/", "http://biblegateway.com/", "http://is.gd/", "http://yellowbook.com/", "http://samsung.com/", "http://businesswire.com/", "http://g.co/", "http://dion.ne.jp/", "http://dagondesign.com/", "http://theglobeandmail.com/", "http://booking.com/", "http://storify.com/", "http://salon.com/", "http://ucoz.com/", "http://gizmodo.com/", "http://psu.edu/", "http://smh.com.au/", "http://reference.com/", "http://sun.com/", "http://unicef.org/", "http://devhub.com/", "http://artisteer.com/", "http://unesco.org/", "http://istockphoto.com/", "http://answers.com/", "http://trellian.com/", "http://cocolog-nifty.com/", "http://i2i.jp/", "http://t-online.de/", "http://intel.com/", "http://1und1.de/", "http://ebay.co.uk/", "http://sciencedaily.com/", "http://paginegialle.it/", "http://ask.com/", "http://springer.com/", "http://canalblog.com/", "http://timesonline.co.uk/", "http://de.vu/", "http://deliciousdays.com/", "http://smugmug.com/", "http://wufoo.com/", "http://globo.com/", "http://cmu.edu/", "http://domainmarket.com/", "http://odnoklassniki.ru/", "http://twitpic.com/", "http://ovh.net/", "http://home.pl/", "http://naver.com/", "http://google.ru/", "http://si.edu/", "http://newyorker.com/", "http://blogs.com/", "http://sciencedirect.com/", "http://hibu.com/", "http://hud.gov/", "http://hhs.gov/", "http://dmoz.org/", "http://dot.gov/", "http://cyberchimps.com/", "http://google.com.hk/", "http://jalbum.net/", "http://craigslist.org/", "http://zimbio.com/", "http://chronoengine.com/", "http://cnbc.com/", "http://uiuc.edu/", "http://vistaprint.com/", "http://symantec.com/", "http://prlog.org/", "http://360.cn/", "http://indiatimes.com/", "http://mtv.com/", "http://webeden.co.uk/", "http://java.com/", "http://cisco.com/", "http://japanpost.jp/", "http://4shared.com/", "http://github.io/", "http://mayoclinic.com/", "http://studiopress.com/", "http://admin.ch/", "http://virginia.edu/", "http://printfriendly.com/", "http://mlb.com/", "http://omniture.com/", "http://simplemachines.org/", "http://dell.com/", "http://accuweather.com/", "http://princeton.edu/", "http://fotki.com/", "http://comcast.net/", "http://chron.com/", "http://nyu.edu/", "http://wp.com/", "http://merriam-webster.com/", "http://nba.com/", "http://shop-pro.jp/", "http://lulu.com/", "http://furl.net/", "http://indiegogo.com/", "http://buzzfeed.com/", "http://tuttocitta.it/", "http://ox.ac.uk/", "http://mapy.cz/", "http://army.mil/", "http://csmonitor.com/", "http://bravesites.com/", "http://tamu.edu/", "http://rediff.com/", "http://toplist.cz/", "http://yellowpages.com/", "http://va.gov/", "http://tiny.cc/", "http://netlog.com/", "http://elpais.com/", "http://oakley.com/", "http://multiply.com/", "http://tmall.com/", "http://hostgator.com/", "http://nymag.com/", "http://fema.gov/", "http://blogtalkradio.com/", "http://china.com.cn/", "http://unblog.fr/", "http://fastcompany.com/", "http://earthlink.net/", "http://vinaora.com/", "http://msu.edu/", "http://aboutads.info/", "http://ucsd.edu/", "http://sogou.com/", "http://seattletimes.com/", "http://dyndns.org/", "http://123-reg.co.uk/", "http://sbwire.com/", "http://tinypic.com/", "http://acquirethisname.com/", "http://shutterfly.com/", "http://walmart.com/", "http://pen.io/", "http://arizona.edu/", "http://woothemes.com/", "http://scientificamerican.com/", "http://themeforest.net/", "http://spotify.com/", "http://cam.ac.uk/", "http://unc.edu/", "http://arstechnica.com/", "http://hao123.com/", "http://illinois.edu/", "http://bloglovin.com/", "http://nsw.gov.au/", "http://ihg.com/", "http://pcworld.com/"];

var uniqueTypes = [];

var fetchContentType = function (url) {

	var fpath = "" + __dirname + "/content-type.txt";

	try {

		request({
			url: url,
			headers: {
				Range: "bytes=0-0"
			}
		}, function (err, res, body) {

			console.log(url);

			if (err) {
				console.log(err.message);
				return;
			}

			if (res.headers && res.headers["content-type"]) {

				var type = res.headers["content-type"];

				if (uniqueTypes.indexOf(type) === -1) {

					console.log("writing " + type + " to " + fpath);
					uniqueTypes.push(type);

					fs.appendFile(fpath, "" + type + "\n", function (err) {
						"" + url + " failed.";
					});
				}
			}
		});
	} catch (err) {
		"" + url + " failed.";
	}
};

uris.forEach(fetchContentType);

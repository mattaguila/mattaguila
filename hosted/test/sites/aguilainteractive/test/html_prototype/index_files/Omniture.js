namespacing = {
    init: function(namespace) {
        var spaces = [];
        namespace.split('.').each(function(space) {
            var curSpace = window,
                i;
            spaces.push(space);
            for (i = 0; i < spaces.length; i++) {
                if (typeof curSpace[spaces[i]] === 'undefined') {
                    curSpace[spaces[i]] = {};
                }
                curSpace = curSpace[spaces[i]];
            }
        });
    }
};
namespacing.init('istock.tracking');
istock.tracking.Omniture = Class.create({
    _firstSearch: true,
    _firstSearchEvent: null,
    _fileInfo: null,
    initialize: function() {
        this._observeLanguage();
        this._observeSisterSite();
        this._observeErrorBubble();
        this._observeNewsTicker();
        this._observePriceRange();
        this._observeFileInfo();
        this._observeLegacyDownload();
        this._observeDownload();
        this._observeSearch();
        this._observeLightbox();
        this._observeImage();
        this._observeTrackExperience();
        this._observeToolsAppsLinks();
        this._observeSearchAddToCart();
        this._observeFileCloseup();
        this._observeImageZoom();
        this._observeCashCart();
        this._observeToasterClose();
        this._observeCheckoutPayPal();
        this._observePageLoadSpeed();
    },
    _trackExperience: function(experience) {
        this._setExperience(experience);
        this._setExperienceCookie(experience);
        if (this.tlTimeout) {
            clearTimeout(this.tlTimeout);
        }
        this.tlTimeout = setTimeout(function() {
            s.tl(this, 'o');
        }, 1000);
    },
    _setExperience: function(experience) {
        if (s.hasOwnProperty('prop65') && s.prop65 === experience) {
            return;
        }
        s.linkTrackVars = 'prop65,eVar65';
        s.prop65 = experience;
        s.eVar65 = experience;
    },
    _setExperienceCookie: function(experience) {
        var ajx = function() {
                var cookie = istock.cookie.getCookie('d_c__mb'),
                    obj;
                if (cookie.indexOf(encodeURIComponent(experience)) > 0) {
                    return;
                }
                obj = new Ajax.Request('/json/SetCookie', {
                    parameters: {
                        'namespace': '_mb',
                        'key': s.prop64,
                        'value': experience
                    }
                });
            };
        ajx.delay(1);
    },
    _trackLink: function(link, navType) {
        s.linkTrackVars = 'events,prop7,prop8,eVar38';
        s.linkTrackEvents = 'event13';
        s.prop8 = link;
        s.eVar8 = link;
        s.events = 'event13';
        s.tl('trackLink', navType, link);
    },
    _trackPriceRange: function(priceRange) {
        s.prop42 = s.eVar42 = priceRange;
    },
    _trackErrorBubble: function(errorMsg) {
        s.linkTrackVars = 'prop19,eVar19,eVar38';
        s.prop19 = errorMsg;
        s.eVar19 = s.prop19;
        s.tl('trackError', 'o', errorMsg);
    },
    _trackLightbox: function(name, events, eventType) {
        s.linkTrackVars = 'events,prop10,eVar10,eVar38';
        s.linkTrackEvents = events;
        s.events = events;
        s.eVar10 = s.prop10 = name;
        s.tl('trackLightbox', 'o', eventType);
    },
    _trackRowColumn: function(event) {
        var item = Event.element(event).up('.srItem');
        var isListLayout = false;
        if (typeof item == 'undefined') {
            item = event.element().up('.lsrRow');
            if (typeof item == 'undefined') {
                return;
            }
            isListLayout = true;
        }
        var id = item.id.split('_')[1];
        var count = 0;
        istock.search.resultsHandler.getResultSet(true).each(function(image) {
            if (id == image.id) {
                throw $break;
            }
            count++;
        }.bind(this));
        if (isListLayout) {
            var row = count + 1;
            var col = 1;
        } else {
            var numPerRow = Math.floor($('srchRslts').offsetWidth / item.offsetWidth);
            var row = (Math.floor(count / numPerRow)) + 1;
            var col = (count % numPerRow) + 1;
        }
        document.cookie = "omnitureImage=" + id + "|" + row + "|" + col + ';path=/';
    },
    _observeImage: function() {
        if ($('srchRslts') != null) {
            $('srchRslts').observe('click', function(event) {
                this._trackRowColumn(event);
            }.bind(this));
            if (!Prototype.Browser.WebKit) {
                $('srchRslts').observe('mouseup', function(event) {
                    if ((event.which && event.which == 2) || (event.buttons && event.buttons == 1)) {
                        this._trackRowColumn(event);
                    }
                }.bind(this));
            }
        }
    },
    _observeTrackExperience: function() {
        document.observe('omniture:trackExperience', function(event) {
            this._trackExperience(event.memo);
        }.bind(this));
    },
    _observeLanguage: function() {
        document.observe('omniture:language', function(event) {
            $$('a.e_languageOpt').each(function(event) {
                event.observe('click', function(event) {
                    this._trackLink('language selector: ' + event.currentTarget.innerHTML, 'o');
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },
    _buildLicenseString: function(licenses, availableLicenses) {
        var extLicenses = '';
        licenses.each(function(license) {
            if (availableLicenses[license] != null) {
                license = availableLicenses[license]['name'];
                var extLicense = license.replace(/[_(\/)\\-]/g, ' ');
                var outExtLicense = '';
                extLicense.split(' ').each(function(part) {
                    outExtLicense += part.substring(0, 1).toUpperCase();
                });
                extLicenses += outExtLicense + ' ';
            }
        });
        return extLicenses;
    },
    _observeSearchAddToCart: function() {
        document.observe('omniture:SearchAddToCart', function(event) {
            s.linkTrackVars = 'products,events,prop56';
            s.linkTrackEvents = 'scAdd';
            s.events = 'scAdd';
            s.products = event.memo.productString;
            s.tl('track cart update', 'o', 'update');
        }.bind(this));
    },
    _observeFileCloseup: function() {
        document.observe('omniture:FileCloseupAddToCart', function(event) {
            var cartInfo = event.memo;
            var file = FilePriceInformation[cartInfo.concreteTypeId];
            var abstractInfo = s.eVar13.split('|');
            var extLicenses = this._buildLicenseString(cartInfo.licenses, file['availableLicenses']);
            var licenseType = "Extended";
            if (extLicenses.empty()) {
                licenseType = "Standard";
                extLicenses = "none";
            }
            var format = "none";
            if (abstractInfo[1] == 'audio') {
                format = file.suffix;
            } else if (abstractInfo[1] == 'video') {
                format = file.format;
            }
            s.linkTrackVars = "products,events,prop56";
            s.linkTrackEvents = "scAdd";
            s.events = "scAdd";
            s.products = ';' + abstractInfo[0] + '|' + abstractInfo[1] + '|' + abstractInfo[2] + '|' + file.displayName + '|' + format + '|' + licenseType + '|' + extLicenses + ';;;;';
            s.tl('track cart update', 'o', 'update');
        }.bind(this));
        if ($('cash-toggle') != null) {
            $('cash-toggle').observe('click', function(event) {
                s.linkTrackVars = "events,prop52";
                s.linkTrackEvents = "event34";
                s.events = "event34";
                if ($('btn-credits').readAttribute('class') == "btn-toggle active") {
                    s.prop52 = "Credits";
                } else {
                    s.prop52 = "Cash";
                    s.events += ",prodView";
                    s.linkTrackVars += ",prodView";
                }
                s.tl('cash toggle', 'o', 'clicked');
            }.bind(this));
        }
        document.observe("omniture:trackFileCloseup", function(event) {
            s.linkTrackVars = "prop52";
            if ($j('div#cash-toggle > .active > span#currency-short-name').html() == null) {
                s.prop52 = "Credits";
            } else {
                s.prop52 = "Cash";
            }
        }.bind(this));
        document.observe("omniture:trackImageSave", function(event) {
            var existingVars = "",
                existingProps = "";
            for (var i = 1; i < 76; i++) {
                if (s["eVar" + i]) {
                    existingVars += ",eVar" + i;
                }
                if (s["prop" + i]) {
                    existingProps += ",prop" + i;
                }
            }
            s.linkTrackVars = "eVar62" + existingVars + existingProps;
            s.linkTrackEvents = "event33";
            s.events = "event33";
            switch (event.memo.type) {
            case "left":
                {
                    s.eVar62 = "SaveToDesktop-Left";
                    break;
                }
            case "right":
                {
                    s.eVar62 = "SaveToDesktop-Right";
                    break;
                }
            case "comp":
                {
                    s.eVar62 = "CompDownload";
                }
            }
            s.tl("trackLink", "d", this);
        }.bind(this));
    },
    _observeImageZoom: function() {
        document.observe("omniture:imageZoom", function(event) {
            s.linkTrackVars = "prop23,eVar13";
            s.prop23 = "Zoom";
            s.tl("image zoom", "o", "clicked");
            document.fire('image:zoom:tracked');
        }.bind(this));
    },
    _observeSisterSite: function() {
        $$('a.trackSisterSite').each(function(event) {
            event.observe('click', function(event) {
                this._trackLink('sister site: ' + event.currentTarget.innerHTML.stripTags(), 'e');
            }.bind(this));
        }.bind(this));
        if (!Prototype.Browser.WebKit) {
            $$('a.trackSisterSite').each(function(event) {
                event.observe('mouseup', function(event) {
                    if ((event.which && event.which == 2) || (event.buttons && event.buttons == 1)) {
                        this._trackLink('sister site: ' + event.currentTarget.innerHTML.stripTags(), 'e');
                    }
                }.bind(this));
            }.bind(this));
        }
        document.observe('omniture:gettyLink', function(event) {
            $$('a.trackSisterSite').each(function(event) {
                event.observe('click', function(event) {
                    this._trackLink('sister site: gettyimages.com', 'e');
                }.bind(this));
            }.bind(this));
            if (!Prototype.Browser.WebKit) {
                $$('a.trackSisterSite').each(function(event) {
                    event.observe('mouseup', function(event) {
                        if ((event.which && event.which == 2) || (event.buttons && event.buttons == 1)) {
                            this._trackLink('sister site: gettyimages.com', 'e');
                        }
                    }.bind(this));
                }.bind(this));
            }
        }.bind(this));
    },
    _observeCashCart: function() {
        $$('.cart-remove').each(function(element) {
            element.firstDescendant().observe('click', function(event) {
                var file = this._fileInfo[element.up('div').id];
                var productString = file['licenseType'] + '|' + file['type'] + '|' + file['taxonomy'] + '|' + file['size'] + '|' + file['format'] + '|' + file['license'] + '|' + file['extendedLicense'];
                s.linkTrackVars = "products, eVar13";
                s.linkTrackEvents = 'scRemove';
                s.events = 'scRemove';
                s.products = ';' + productString + ';;;;';
                s.eVar13 = ';' + productString + ';;;;';
                s.tl('trackLink', 'o', 'Remove from cart');
            }.bind(this));
        }.bind(this));
        document.observe('omniture:trackUpdateSize', function(event) {
            this._fileInfo[event.memo.FILEID]['concreteTypeId'] = event.memo.concreteTypeId;
            var concreteInfo = this._fileInfo[event.memo.FILEID]['concreteInfo'][event.memo.concreteTypeId];
            this._fileInfo[event.memo.FILEID]['size'] = concreteInfo['displayName'];
            if (this._fileInfo[event.memo.FILEID]['type'] == 'audio') {
                this._fileInfo[event.memo.FILEID]['format'] = concreteInfo['suffix'];
            } else if (this._fileInfo[event.memo.FILEID]['type'] == 'video') {
                this._fileInfo[event.memo.FILEID]['format'] = concreteInfo['format'];
            }
            var file = this._fileInfo[event.memo.FILEID];
            var productString = file['licenseType'] + '|' + file['type'] + '|' + file['taxonomy'] + '|' + file['size'] + '|' + file['format'] + '|' + file['license'] + '|' + file['extendedLicense'];
            s.linkTrackVars = "products, eVar13";
            s.linkTrackEvents = 'scAdd';
            s.events = 'scAdd';
            s.products = ';' + productString + ';;;;'
            s.eVar13 = ';' + productString + ';;;;';
            s.tl('trackLink', 'o', 'Update file size');
        }.bind(this));
        document.observe('omniture:trackUpdateLicense', function(event) {
            var concreteInfo = this._fileInfo[event.memo.FILEID]['concreteInfo'][this._fileInfo[event.memo.FILEID]['concreteTypeId']];
            this._fileInfo[event.memo.FILEID]['extendedLicense'] = this._buildLicenseString(event.memo.LICENSES, concreteInfo['availableLicenses']);
            var file = this._fileInfo[event.memo.FILEID];
            if (this._fileInfo[event.memo.FILEID]['extendedLicense'].empty()) {
                this._fileInfo[event.memo.FILEID]['license'] = "Standard";
                this._fileInfo[event.memo.FILEID]['extendedLicense'] = "none";
            } else {
                this._fileInfo[event.memo.FILEID]['license'] = "Extended";
            }
            var productString = file['licenseType'] + '|' + file['type'] + '|' + file['taxonomy'] + '|' + file['size'] + '|' + file['format'] + '|' + file['license'] + '|' + file['extendedLicense'];
            s.linkTrackVars = "products, eVar13";
            s.linkTrackEvents = 'scAdd';
            s.events = 'scAdd';
            s.products = ';' + productString + ';;;;';
            s.eVar13 = ';' + productString + ';;;;';
            s.tl('trackLink', 'o', 'Update file license');
        }.bind(this));
    },
    _observeToasterClose: function() {
        document.observe('omniture:trackToasterClose', function(event) {
            s.linkTrackEvents = 'event35';
            s.events = 'event35';
            s.tl('trackLink', 'o', 'close toaster');
        }.bind(this));
    },
    _observeNewsTicker: function() {
        document.observe("omniture:newsTickerEvent", function(event) {
            this._trackLink(event.memo, 'o');
        }.bind(this));
    },
    _observePriceRange: function() {
        document.observe("omniture:priceRangeEvent", function(event) {
            this._trackPriceRange(event.memo);
        }.bind(this));
    },
    _observeErrorBubble: function() {
        if (!(typeof jQuery == 'undefined')) {
            jQuery(document).bind('errorBubble', function(event, mssg) {
                event.stopPropagation();
                document.fire("omniture:errorBubble", mssg.trim());
            });
        }
        document.observe("omniture:errorBubble", function(event) {
            this._trackErrorBubble(event.memo);
            event.stop();
        }.bind(this));
        Event.observe(window, 'load', function(event) {
            $$('div.lineError').each(function(errElm) {
                var elm = errElm.identify();
                if ($(errElm).down() == null && $(errElm).getStyle('display') == 'block') {
                    this._trackErrorBubble(errElm.innerHTML.trim());
                }
            }.bind(this));
        }.bind(this));
    },
    _observeFileInfo: function() {
        document.observe("omniture:trackFileInfo", function(event) {
            this._fileInfo = event.memo;
        }.bind(this));
    },
    _observeLegacyDownload: function() {
        document.observe("omniture:trackLegacyDownload", function(event) {
            s.linkTrackVars = 'events,eVar4,prop4,eVar38';
            s.linkTrackEvents = 'event9';
            s.events = 'event9';
            s.tl('agreeBtn', 'o', 'Accept Agreement');
            var trackSplit = event.memo.split('~');
            s.linkTrackVars = "products,events,eVar13,eVar38,prop4,eVar4,eVar58";
            s.linkTrackEvents = "event23,event4";
            s.events = "event4,event23";
            s.products = ';;;;event23=' + trackSplit[1] + ';';
            s.eVar13 = trackSplit[0];
            s.eVar58 = trackSplit[2];
            s.tl("startDownload", "o", "trackDownloads");
            event.stop();
        }.bind(this));
    },
    _observeDownload: function() {
        document.observe('thankyou:downloadClicked', function(event) {
            var file = this._fileInfo[event.memo.fileId];
            var productString = file['licenseType'] + '|' + file['type'] + '|' + file['taxonomy'] + '|' + file['size'] + '|' + file['format'] + '|' + file['license'] + '|' + file['extendedLicense'];
            var existingVars = "",
                existingProps = "";
            for (var i = 1; i < 76; i++) {
                if (s["eVar" + i]) {
                    existingVars += ",eVar" + i;
                }
                if (s["prop" + i]) {
                    existingProps += ",prop" + i;
                }
            }
            s.linkTrackVars = "products,events,eVar13,eVar58,eVar62" + existingVars + ",prop56" + existingProps;
            s.linkTrackEvents = "event4,event23";
            s.events = "event4,event23";
            s.products = ';' + productString + ';;;;event23=0;';
            s.prop56 = event.memo.fileId;
            s.eVar13 = productString;
            s.eVar58 = file['creditsRemaining'];
            if (event.memo.repeat == true) {
                s.eVar62 = "re-download";
            } else {
                s.eVar62 = "cash";
            }
            s.tl("startDownload", "o", "trackDownloads");
        }.bind(this));
    },
    _observeLightbox: function() {
        var lightboxEvent = 'event5';
        if ($('LightboxForm') != null) {
            $('LightboxForm').observe('submit', function(event) {
                if ($('ID') == null) {
                    this._trackLightbox($('Name').value, 'event6', 'Create Lightbox');
                }
            }.bind(this));
        }
        document.observe("omniture:lightboxCreate", function(event) {
            if (event.memo.page === true) {
                lightboxEvent = 'event37';
            }
            this._trackLightbox(event.memo.name, lightboxEvent + ',event6', 'Create Lightbox');
            event.stop();
        }.bind(this));
        document.observe("omniture:lightboxAdd", function(event) {
            if (event.memo.page === true) {
                lightboxEvent = 'event37';
            }
            this._trackLightbox(event.memo.name, lightboxEvent, 'Add File Lightbox');
            event.stop();
        }.bind(this));
    },
    _trackCollections: function(results) {
        stats = {
            'agency': 0,
            'vetta': 0,
            'exclusive+': 0,
            'exclusive': 0,
            'plus': 0,
            'main': 0,
            'value': 0,
            'pump': 0
        }, $A(results.results).each(function(v) {
            collection = v.collection;
            if (!v.collection) {
                collection = 'main';
            }
            stats[collection]++;
        }.bind(this));
        s.linkTrackVars += ',prop38';
        s.prop38 = stats['main'] + '|' + stats['vetta'] + '|' + stats['value'] + '|' + stats['exclusive'] + '|' + stats['exclusive+'] + '|' + stats['agency'] + '|' + stats['plus'];
    },
    _parseSearch: function(event) {
        var breadBox = this._parseBreadBox();
        this._trackSearch(breadBox, event);
        if (breadBox.lightbox != '') {
            s.linkTrackVars = 'eVar10,prop10,eVar38';
            s.eVar10 = s.prop10 = breadBox.lightbox;
            s.tl('trackLightbox', 'o', 'Lightbox');
        }
    },
    _trackSearch: function(breadBox, event) {
        s.linkTrackVars = 'prop11,prop12,prop13,prop14,prop15,prop16,prop31,prop32,' + 'prop33,prop34,prop35,prop36,prop37,prop42,prop43,eVar11,eVar12,eVar13,eVar14,' + 'eVar15,eVar16,eVar31,eVar32,eVar33,eVar34,eVar35,eVar36,eVar37,eVar53,eVar38,eVar42,eVar43';
        var totalResults = istock.search.resultsHandler.getTotalResultCount();
        s.prop11 = breadBox.keywords;
        if (totalResults == 0) {
            s.prop11 = 'none:' + s.prop11;
        }
        s.prop12 = breadBox.portfolio;
        s.prop13 = totalResults.toString();
        s.prop14 = istock.search.resultsHandler.getCurrentPage().toString();
        s.prop15 = SearchSortOptions[istock.search.preferences.get('order')];
        s.prop16 = breadBox.fileTypes;
        s.prop31 = breadBox.photoIllustration;
        s.prop32 = $('colourSelectorInput').value;
        if (s.prop32 == 'HEX') {
            s.prop32 = '';
        }
        s.prop33 = breadBox.videoFilters;
        s.prop34 = breadBox.audioFilters;
        s.prop35 = breadBox.collections;
        s.prop36 = breadBox.more;
        s.prop37 = breadBox.categories;
        s.eVar53 = istock.search.preferences.get('perPage');
        s.eVar11 = s.prop11;
        s.eVar12 = s.prop12;
        s.eVar14 = s.prop14;
        s.eVar15 = s.prop15;
        s.eVar16 = s.prop16;
        s.eVar31 = s.prop31;
        s.eVar32 = s.prop32;
        s.eVar33 = s.prop33;
        s.eVar34 = s.prop34;
        s.eVar35 = s.prop35;
        s.eVar36 = s.prop36;
        s.eVar37 = s.prop37;
        if (typeof s.eVar42 === 'undefined') {
            s.eVar42 = s.prop42 = 'none';
        }
        s.eVar43 = s.prop43 = breadBox.license.toLowerCase()
        this._trackCollections(event.memo);
        if (!istock.search.resultsHandler.getResultSet().size()) {
            s.pageName = 'iStock|Search|ZeroResults';
        } else if ($('sortBy').value == "6") {
            s.linkTrackVars += ',prop39,eVar39'
            s.prop39 = istock.search.resultsHandler.getUserSegmentId();
            s.eVar39 = s.prop39;
        }
        if (this._firstSearch) {
            var firstSearchEvents = '',
                firstSearchEventsArray = new Array('event2');
            if (!istock.search.resultsHandler.getIsHistoryLoad()) {
                firstSearchEventsArray.push('event14');
            }
            firstSearchEvents = firstSearchEventsArray.join(',');
            if (typeof s.events == "undefined") {
                s.events = firstSearchEvents;
            } else {
                s.events += "," + firstSearchEvents;
            }
            s.t();
            this._firstSearch = false;
        } else {
            s.tl('trackSearch', 'o', 'Search');
        }
    },
    _parseBreadBox: function() {
        var data = {
            keywords: '',
            portfolio: omnitureTranslation['portfolio'],
            categories: '',
            photoIllustration: '',
            fileTypes: 'all files',
            license: '',
            videoFilters: '',
            audioFilters: '',
            collections: '',
            lightbox: '',
            more: ''
        };
        var firstChild = '';
        var breadBox = $('breadbox').childElements();
        for (var i = 0; i < breadBox.length; i++) {
            firstChild = breadBox[i].firstDescendant();
            switch (omnitureTranslation[firstChild.innerHTML.trim()]) {
            case 'Keywords':
                data.keywords = this._parseBreadBoxTerms(breadBox[i], false);
                break;
            case 'Portfolio':
                data.portfolio = 'memberID';
                break;
            case 'Categories':
                data.categories = this._parseBreadBoxTerms(breadBox[i], true);
                break;
            case 'Photos &amp; Illustration Filters':
                data.photoIllustration = this._parseBreadBoxTerms(breadBox[i], true);
                break;
            case 'File Types':
                data.fileTypes = this._parseBreadBoxTerms(breadBox[i], true);
                break;
            case 'License':
                data.license = this._parseBreadBoxTerms(breadBox[i], true);
                break;
            case 'Video Filters':
                data.videoFilters = this._parseBreadBoxTerms(breadBox[i], true);
                break;
            case 'Audio Filters':
                data.audioFilters = this._parseBreadBoxTerms(breadBox[i], true);
                break;
            case 'Collections':
                data.collections = this._parseBreadBoxTerms(breadBox[i], true);
                break;
            case 'More Attributes':
                data.more = this._parseBreadBoxTerms(breadBox[i], true);
                break;
            case 'Lightbox':
                data.lightbox = this._parseBreadBoxTerms(breadBox[i], false);
                break;
            default:
                break;
            }
        }
        return data;
    },
    _parseBreadBoxTerms: function(element, translate) {
        var facets = element.select('div.facetTitle');
        var facetString = '';
        var rawFacetString = '';
        for (var i = 0; i < facets.length; i++) {
            if (translate) {
                rawFacetString = facets[i].innerHTML.replace(/(<([^>]+)>)/ig, "").replace(/&nbsp;/gi, '').trim();
                if (typeof omnitureTranslation[rawFacetString] == 'undefined') {
                    facetString += rawFacetString;
                } else {
                    facetString += omnitureTranslation[rawFacetString];
                }
            } else {
                facetString += facets[i].innerHTML.replace(/(<([^>]+)>)/ig, "").replace(/&nbsp;/gi, '');
            }
            facetString += '|';
        }
        facetString = facetString.truncate(facetString.length - 1, '');
        return facetString;
    },
    _observeSearch: function() {
        try {
            Event.observe(document, istock.search.event.NEW_RESULTS, function(event) {
                if (!this._firstSearch) {
                    this._parseSearch(event);
                } else {
                    this._firstSearchEvent = event;
                }
            }.bind(this));
        } catch (exception) {}
        document.observe('omniture:firstSearch', function(event) {
            this._parseSearch(this._firstSearchEvent);
            event.stop();
        }.bind(this));
    },
    _observeToolsAppsLinks: function() {
        if ($('appsToolsPrimaryContainer') == null) {
            return;
        }
        var links = [
            ['#appsToolsPrimaryContainer section:first-child a:nth-child(5)', 'AdobePlugin', null],
            ['#appsToolsPrimaryContainer section:nth-child(2) a:nth-child(5)', 'iPhoneApp', null],
            ['#appsToolsPrimaryContainer section:nth-child(3) a:nth-child(5)', 'PowerPoint', null],
            ['#appsToolsPrimaryContainer section:nth-child(3) a:nth-child(6)', 'WordPlugin', null],
            ['#appsToolsSecondaryContainer section:first-child a', 'WordPress', null],
            ['#appsToolsSecondaryContainer section:nth-child(2) a', 'ViewCalendars', 'o'],
            ['#appsToolsSecondaryContainer section:nth-child(3) a', 'FaceBookApp', null],
            ['#appsToolsContribContainer section:nth-child(3) a', 'DeepMeta', null],
            ['#appsToolsContribContainer section:nth-child(4) a', 'Aperture', 'o']
        ];
        links.each(function(link) {
            $$(link[0])[0].observe('click', function(event) {
                s.linkTrackVars = 'events,eVar62';
                s.linkTrackEvents = 'event33';
                s.events = 'event33';
                s.eVar62 = link[1];
                s.pageName = 'iStock | Participate | ToolsApps';
                if (link[2] != null) {
                    s.tl(link[1], link[2], 'iStock Tools Apps');
                }
            }.bind(this));
        });
    },
    _observeCheckoutPayPal: function() {
        document.observe('checkout:paypal', function(event) {
            this._trackContinueToPayPal();
            event.stop();
        }.bind(this));
    },
    _trackContinueToPayPal: function() {
        s.events = 'event35';
        s.tl();
    },
    _observePageLoadSpeed: function() {
        document.observe('omniture:pageLoadFinished', function() {
            this._trackPageLoad();
        }.bind(this));
    },
    _trackPageLoad: function() {
        if (typeof window.timestamps === 'undefined') {
            return;
        }
        var t = window.timestamps;
        if (typeof s.linkTrackVars === 'string' && s.linkTrackVars !== '') {
            s.linkTrackVars += ',prop73,prop74,prop75';
        } else {
            s.linkTrackVars = 'prop73,prop74,prop75';
        }
        s.prop73 = t.serverEnd - t.serverStart;
        s.prop74 = t.cssEnd - t.htmlStart + s.prop73;
        s.prop75 = t.htmlEnd - t.cssEnd + s.prop74;
    }
});
document.observe('dom:loaded', function(ev) {
    var omnitureTracking = new istock.tracking.Omniture();
    document.fire('omniture:trackingLoaded');
});
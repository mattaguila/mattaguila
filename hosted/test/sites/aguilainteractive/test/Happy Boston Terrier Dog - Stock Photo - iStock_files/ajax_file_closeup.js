
namespacing={init:function(namespace){var spaces=[];namespace.split('.').each(function(space){var curSpace=window,i;spaces.push(space);for(i=0;i<spaces.length;i++){if(typeof curSpace[spaces[i]]==='undefined'){curSpace[spaces[i]]={};}
curSpace=curSpace[spaces[i]];}});}};fcu={load_select_widget:function(){$$('.widget_select').each(function(elm){new Autocompleter.SelectBox(elm,{'width':fcuVars.wdth});});},download_init:function(form_id){sffx=form_id.replace(/fcuForm/,'');cctID=$F('ConcreteTypeID'+sffx);fileID=$F('FileID'+sffx);if(cctID!=0)$('dnldSpinner'+sffx).show();switch(true){case(cctID==0):alert(fcuVars.mssg_errNoSize);break;default:var url="ajax_class_creator.php";var params="ajax_action=GetDialog&ajax_class=filecloseup&FileID="+fileID+"&ConcreteTypeID="+cctID;var myAjax=new Ajax.Request(url,{asynchronous:true,method:"get",parameters:params,onSuccess:fcu.showDialog.bind(this),on301:fcu.xhrError.bind(this),on400:fcu.xhrError.bind(this),on401:fcu.xhrError.bind(this),on403:fcu.xhrError.bind(this),on404:fcu.xhrError.bind(this),on500:fcu.xhrError.bind(this),on503:fcu.xhrError.bind(this),on504:fcu.xhrError.bind(this),onFailure:fcu.xhrError.bind(this)});break;}},showDialog:function(xhrReq){var json=xhrReq.responseText.evalJSON(true);$('dnldSpinner'+sffx).hide();if(typeof(json.goDownload)!='undefined'){lb.download_init("payg");return;}
ajaxWin.show(json);},xhrError:function(xhrReq){var mssg='XHR Error - Code '+xhrReq.status+' ';switch(xhrReq.status){case 301:mssg+='Content Moved';break;case 400:mssg+='Bad Request';break;case 401:mssg+='Unauthorized';break;case 403:mssg+='Forbidden';break;case 404:mssg+='Not Found';break;case 500:mssg+='Internal Server Error';break;case 503:mssg+='Service Unavailable';break;case 504:mssg+='Gateway Timeout';break;case 505:mssg+='HTTP Version Not Supported';break;}
mssg+="\n\nPlease clear your browser's cache,\nreload the page and try your request again."
alert(mssg);},setDefaultCreditType:function(id){if($('DefaultCreditType_PayAsYouGo')&&$F(id)!='payg')$('DefaultCreditType_PayAsYouGo').checked=false;if($('DefaultCreditType_Subscription')&&$F(id)!='subscription')$('DefaultCreditType_Subscription').checked=false;util_updateCreditPlan(0,$F(id));},license_init:function(cllctn){fileID=$F('FileID');collection=(cllctn=='sub')?'Subscription':'PayAsYouGo';var url="ajax_class_creator.php";var params="ajax_action=GetDialog&ajax_class=filecloseup&Collection="+collection+"&"+$('frm_'+fileID).serialize();var myAjax=new Ajax.Request(url,{asynchronous:true,method:"get",parameters:params,onSuccess:lb.showDialog.bind(this),on301:fcu.xhrError.bind(this),on400:fcu.xhrError.bind(this),on401:fcu.xhrError.bind(this),on403:fcu.xhrError.bind(this),on404:fcu.xhrError.bind(this),on500:fcu.xhrError.bind(this),on503:fcu.xhrError.bind(this),on504:fcu.xhrError.bind(this),onFailure:lb.xhrError.bind(this)});},togglePixelsInches:function(elm){if($(elm).hasClassName('dkgrey'))return;$$('span.dims').invoke('toggleClassName','h');['pixels','inches'].each(function(id){$(id).toggleClassName('dkgrey').toggleClassName('no_txt_dec')});},launchCalc:function(){var url="ajax_class_creator.php";var params="ajax_action=PixelCalculator&ajax_class=filecloseup";var myAjax=new Ajax.Request(url,{asynchronous:true,method:"get",parameters:params,onSuccess:lb.showDialog.bind(this),on301:fcu.xhrError.bind(this),on400:fcu.xhrError.bind(this),on401:fcu.xhrError.bind(this),on403:fcu.xhrError.bind(this),on404:fcu.xhrError.bind(this),on500:fcu.xhrError.bind(this),on503:fcu.xhrError.bind(this),on504:fcu.xhrError.bind(this),onFailure:lb.xhrError.bind(this)});},clickAgreeBtn:function(collection,isLightbox){$('agreeBtn').replace('<img src="'+istock.cookielessUrl+'/static/images/loading.gif" alt="" />');if(window._gaq){_gaq.push(['_trackPageview','/file_download_approved.php'])}
lb.file_init(collection,isLightbox);}}
try{document.fire("ajax_file_closeup:loaded");}catch(e){}
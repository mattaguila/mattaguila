
namespacing={init:function(namespace){var spaces=[];namespace.split('.').each(function(space){var curSpace=window,i;spaces.push(space);for(i=0;i<spaces.length;i++){if(typeof curSpace[spaces[i]]==='undefined'){curSpace[spaces[i]]={};}
curSpace=curSpace[spaces[i]];}});}};var $j=jQuery.noConflict();$j(document).ready(function(){$j(this).priceDisplay();});(function($){$.fn.priceDisplay=function(){var fileHandler={init:function(){fileHandler._updateTotal();fileHandler._updatePixel();fileHandler._displayViewCartLink();$('#showPixel, #showNonPixel').bind('click',function(){$('#showPixel, #showNonPixel').toggleClass('active');fileHandler._updatePixel();});$('#btn-credits, #btn-cash').bind('click',function(){if($('#btn-cash').length>0&&$('#btn-credits').length>0){$('#btn-cash, #btn-credits').toggleClass('active');fileHandler._updateTotal();fileHandler._displayViewCartLink();}});$('#filesGrid tr td').click(function(){$(this).parent().find('input[type=radio]').prop('checked',true);var selectedConcreteId=$(this).parent().find('input[type=radio]').val();$('.bgBlue').removeClass('bgBlue');$(this).parent().addClass('bgBlue');fileHandler.updateExtendedLicensePrices(selectedConcreteId);fileHandler._updateTotal();});$('#licensesGrid tr td, input[name=licenses]').click(function(){var checkbox=$(this).parent().find(':checkbox');if(checkbox.attr('disabled')!=='disabled'){checkbox.prop('checked',!checkbox.attr('checked'));}
fileHandler._updateTotal();});$('#license-toggle-standard').click(function(){$('input:checkbox[name=licenses]:checked:not(:disabled)').each(function(){$(this).attr('checked',false);});fileHandler._updateTotal();});$('#HD, #PAL, #NTSC').click(function(){var oldStandard=$('#standard .active').html();var newStandard=$(this).attr('id');var format=$('#format .active').html();var availableSizes='.'+newStandard+format;var oldRadioButton=oldStandard+format;var newRadioButton=newStandard+format;var toggleSelector='#standard';fileHandler.videoToggle(availableSizes,oldRadioButton,newRadioButton,toggleSelector,this);fileHandler._updateTotal();});$('#MOV,#MP4,#WMV').click(function(){var standard=$('#standard .active').html();var oldFormat=$('#format .active').html();var newFormat=$(this).attr('id');var availableSizes='.'+standard+newFormat;var oldRadioButton=standard+oldFormat;var newRadioButton=standard+newFormat;var toggleSelector='#format';fileHandler.videoToggle(availableSizes,oldRadioButton,newRadioButton,toggleSelector,this);fileHandler._updateTotal();});$('#buy-button-credit').click(function(){if(!($(this).attr('href'))){var licenses=[];if($(this).hasClass('pump-audio')){var fileId=$('#fileId').val();var concreteTypeId=$('input:radio[name=size]:checked').val();var id=$('input:radio[name=size]:checked').attr('id');licenses.push(id.replace('concreteTypeId'+concreteTypeId+'_el',''));}else{var fileId=$('#fileId').val();var concreteTypeId=$('input:radio[name=size]:checked').val();var elId;$('#licensesGrid input:checked').each(function(){elId=this.id;licenses.push(elId.replace('el',''));});}
$('#buy-button-credit').hide();$('#buy-button-loader').show();if($('#save-with-credits-callout').length>0&&$('#total-credits').html()>0&&!$('#buy-button-credit').hasClass('admin-download'))
{$(this).creditsModal();$('#buy-button-loader').hide();$('#buy-button-credit').show();}else{lb.cash_sales_init(fileId,concreteTypeId,licenses);}}});$('#buy-button-cash').click(function(){if($(this).hasClass('pump-audio')){var fileId=$('#fileId').val();var concreteTypeId=$('input:radio[name=size]:checked').val();var id=$('input:radio[name=size]:checked').attr('id');var licenses=id.replace('concreteTypeId'+concreteTypeId+'_el','');}else{var fileId=$('#fileId').val();var concreteTypeId=$('input:radio[name=size]:checked').val();var licenses=[];var elId;$('#licensesGrid input:checked').each(function(){elId=this.id;licenses.push(elId.replace('el',''));});}
$('#buy-button-cash').hide();$('#buy-button-loader').show();fileHandler.upsertFileToCart(fileId,concreteTypeId,licenses);});$('#buy-section-loader').hide();$('#total-buy-section').show();},updateExtendedLicensePrices:function(concreteTypeId){var licensePricing=FilePriceInformation[concreteTypeId]['availableLicenses'];$('#licensesGrid > tbody > tr').each(function(i){var currentLicenseId=$(this).find('input').attr('id').replace('el','');if(licensePricing[currentLicenseId]['priceInCredits']==0){$(this).find('input').prop('disabled',true);$(this).find('input').attr('checked',true);}else{$(this).find('input').prop('disabled',false);}
if(!licensePricing[currentLicenseId]['isMandatory']){$(this).find('.credits > span.amount').text(licensePricing[currentLicenseId]['priceInCredits']);$(this).find('.cash > span.amount').text(licensePricing[currentLicenseId]['priceConverted']);}});},upsertFileToCart:function(fileId,concreteTypeId,licenses){if(licenses.length==0){licenses=["0"];}
var ajaxUrl='/cart-ajax/upsert-file/fileId/'+fileId+'/concreteTypeId/'+concreteTypeId+'/licenses/'+licenses+'/asNewest/1';$j.ajax(ajaxUrl).done(function(response){var status=response.status;var settings={content:response.viewscript};if(status==='insert'||status==='update'){settings.title='<h3>'+response.title+'</h3>',$('#filesCount').text(response.filesCount);$('#buy-button-text-default').hide();$('#buy-button-text-update').show();$('#toolbar-cart').addClass('active');}else if(response.status==='failure'){settings.title='<h3 class="err">'+response.title+'</h3>',$('#toolbar-cart span').addClass('err');$('#toolbar-cart').removeClass('active');}
$('#toolbar-cart span').addClass('files-count-bold');$('#cart-toaster').toaster(settings);$('#buy-button-cash').show();$('#buy-button-loader').hide();fileHandler._displayViewCartLink();if(response.status!='failure'){document.fire('toaster:FileAddedToCart');document.fire('omniture:FileCloseupAddToCart',{'concreteTypeId':concreteTypeId,'licenses':licenses});}});},videoToggle:function(availableSizes,oldRadioButton,newRadioButton,toggleSelector,toggleEvent){$('#filesGrid tr').hide();$('#filesGrid tr').first().show();$(availableSizes).show();if(toggleSelector=='#standard'){var target=$('.'+$(toggleEvent).attr('id'));if(target.length!=0&&target.is(':hidden')){$('#file-preview > .video').hide();target.show();}}
videoDefaults[oldRadioButton]=parseInt($('input[type=radio]:checked').val());if(videoDefaults[newRadioButton]===0){var lastRadioButtonValue=$('.'+newRadioButton+':last input[type=radio]').val();videoDefaults[newRadioButton]=lastRadioButtonValue;}
var selector='#concreteTypeId'+videoDefaults[newRadioButton];$(selector).attr('checked',true).parent().parent().addClass('bgBlue');$(toggleSelector+' .active').removeClass('active');$(toggleEvent).addClass('active');},getFormattedCurrency:function(cost){var shortname=$('#currency-short-name').html();var symbol=$('#currency-symbol').html();if(shortname=='JPY'){cost=accounting.formatMoney(cost,symbol,0);}else if(shortname=='EUR'){cost=accounting.formatMoney(cost,symbol,2,".",",");}else{cost=accounting.formatMoney(cost,symbol);}
return cost;},_displayViewCartLink:function(){if((parseInt($('#filesCount').html())>0)&&$('#btn-cash').hasClass('active')){$('#view-cart-link').show();}else{$('#view-cart-link').hide();}},_updatePixel:function(){if($('#showPixel').hasClass('active')){$('.nonPixel').hide();$('.pixel').show();}else{$('.pixel').hide();$('.nonPixel').show();}},_updateTotal:function(){if($('#btn-cash').hasClass('active')){$('.credits, #buy-button-credit, #credits-label, #total-credits').hide();$('.cash, #buy-button-cash, #total-cash, #cash-label').show();}else{$('.cash, #buy-button-cash, #total-cash, #cash-label').hide();$('.credits, #buy-button-credit, #total-credits, #credits-label').show();}
if($('#total-credits').length>0&&$('#total-cash').length>0){var concreteTypeCostCredits=0;var concreteTypeCostCash=0;var licenseCostCredits=0;var licenseCostCash=0;try{concreteTypeCostCredits=parseFloat($('input:radio[name=size]:checked').closest('tr').find('div.credits > span.amount').html());concreteTypeCostCash=$('input:radio[name=size]:checked').closest('tr').find('div.cash > span.amount').html();var currencySymbol=$('#currency-short-name').html();if(currencySymbol=='EUR'){concreteTypeCostCash=concreteTypeCostCash.replace('.','');concreteTypeCostCash=parseFloat(concreteTypeCostCash.replace(',','.'));}else{concreteTypeCostCash=parseFloat(concreteTypeCostCash.replace(',',''));}
if(isNaN(concreteTypeCostCredits)){concreteTypeCostCredits=0;}
if(isNaN(concreteTypeCostCash)){concreteTypeCostCash=0;}
$('input:checkbox[name=licenses]:checked').each(function(){var thisLicenseCostCredits=parseFloat($(this).closest('tr').find('div.credits > span.amount').html());var thisLicenseCostCash=$(this).closest('tr').find('div.cash > span.amount').html();if(currencySymbol=='EUR'){thisLicenseCostCash=thisLicenseCostCash.replace('.','');thisLicenseCostCash=parseFloat(thisLicenseCostCash.replace(',','.'));}else{thisLicenseCostCash=parseFloat(thisLicenseCostCash.replace(',',''));}
if(isNaN(thisLicenseCostCash)){thisLicenseCostCash=0;}
if(isNaN(thisLicenseCostCredits)){thisLicenseCostCredits=0;}
licenseCostCredits=licenseCostCredits+thisLicenseCostCredits;licenseCostCash=licenseCostCash+thisLicenseCostCash;});}catch(err){}
var totalCostCredits=concreteTypeCostCredits+licenseCostCredits;var totalCostCash=parseFloat(concreteTypeCostCash)+parseFloat(licenseCostCash);if(isNaN(totalCostCredits)){totalCostCredits=0;}
if(isNaN(totalCostCash)){totalCostCash=0;}
var formattedTotalCostCash=fileHandler.getFormattedCurrency(totalCostCash);$('#total-credits').html(totalCostCredits);$('#total-cash').html(formattedTotalCostCash);if(totalCostCash==0||$('#buy-button-credit').hasClass('admin-download')){$('#buy-button-credit').show();$('#buy-button-cash').hide();}else{if($('#btn-cash').hasClass('active')){$('#buy-button-cash').show();$('#buy-button-credit').hide();}else{$('#buy-button-cash').hide();$('#buy-button-credit').show();}}}else{}
fileHandler._updateCookie();},_updateCookie:function(){var totalInfo={'fileId':$('#fileId').val(),'creditsCost':$('#total-credits').html(),'cashCost':$('#total-cash').html(),'currencyShortName':$('#currency-short-name').html()};var value=JSON.stringify(totalInfo);var name="fcup_welcomePage_totalInfo";var days=1;if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/; domain=.istockphoto.com";},},videoDefaults={'HDMOV':0,'HDMP4':0,'HDWMV':0,'PALMOV':0,'PALMP4':0,'PALWMV':0,'NTSCMOV':0,'NTSCMP4':0,'NTSCWMV':0};fileHandler.init();};})(jQuery);
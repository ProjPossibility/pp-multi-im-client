                                                                     
// finalized working copy of the front page
var version = '.016';
// Copyright 2008 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function speaklogins(el)
{
	el.elem.parentNode.parentNode.parentNode.getElementsByTagName("input")[0].focus();
	axsSkel.axsJAXObj.speakTextViaNode(String(el.elem.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("label")[0].getAttribute("for")).split('id').join('') + ' , login');
}

/**
 * @fileoverview AxsJAX to enhance accessibility
 * of Skel. 
 *
 * This is a skeleton AxsJAX script - when you start using it,
 * you should do a global replace of "axsSkel" with 
 * "axsWhateverYourAppNameIs" and update this fileoverview.
 *
 * @author clchen@google.com (Charles L. Chen)
 */
// create namespace
var axsSkel = {};

/**
 * These are strings to be spoken to the user
 * @type string
 */
axsSkel.HELP = 'The following shortcut keys are available. ';


/**
 * The AxsJAX object that will do the tickling and speaking.
 * @type AxsJAX?
 */
axsSkel.axsJAXObj = null;
/**
 * The AxsNav object that will handle navigation.
 * @type AxsNav?
 */
axsSkel.axsNavObj = null;

/**
 * The AxsSound object that will play earcons
 * @type AxsSound?
 */
axsSkel.axsSoundObj = null;

/**
 * The PowerKey object that will provide a quick search
 * @type PowerKey?
 */
axsSkel.pkObj = null;

/**
 * The AxsLens object that will magnify content.
 * @type AxsLens?
 */
axsSkel.axsLensObj = null;

/**
 * The magnification factor for the AxsLens object.
 * @type number
 */
axsSkel.magSize = 1.5;

/**
 * Initializes the AxsJAX script
 */
axsSkel.init = function(){
  axsSkel.axsJAXObj = new AxsJAX(true);
  axsSkel.axsNavObj = new AxsNav(axsSkel.axsJAXObj);

  //Add event listeners
  document.addEventListener('DOMNodeInserted', axsSkel.nodeInsertedHandler, true);
  document.addEventListener('DOMAttrModified', axsSkel.attrModifiedHandler, true);
  document.addEventListener('keypress', axsSkel.keyHandler, true);
/*

CNR is
<cnr>
	<list title="Cycle Results" hotkey="h" next="DOWN j" prev="UP k" fwd="n" back="p">
		<item action="CALL:speaklogins">' +
			//tr[1]/td[2]/input[@type=\'text\']
	    </item>
    </list>
</cnr>

*/
/*
//This will loop through the 5 login boxes with hotkey h
  var cnrString = '	<cnr>' +
                  '	<list title="Cycle Results" hotkey="h" next="DOWN j" pre' +
                  'v="UP k" fwd="n" back="p">' +
                  '		  <item action="CALL:speaklogins">' +
                  '			//tr[1]/td[2]/input[@type=\'text\']                  ' +
                  '          </item>' +
                  '     </list>' +
                  '     </cnr>';
*/
/*

<cnr>
<list title="AIM" hotkey="a">
<item action="CALL:speaklogins">
/html/body[@id='body']/form[@id='frontpagecontainer']/div[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxescontent']/div[@id='loginboxescontainer']/div[@id='aimloginbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='aimid']
</item>
</list>
<list title="Yahoo" hotkey="y">
<item action="CALL:speaklogins">
/html/body[@id='body']/form[@id='frontpagecontainer']/div[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxescontent']/div[@id='loginboxescontainer']/div[@id='yahoologinbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='yahooid']
</item>
</list>
<list title="GTalk" hotkey="g">
<item action="CALL:speaklogins">
/html/body[@id='body']/form[@id='frontpagecontainer']/div[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxescontent']/div[@id='loginboxescontainer']/div[@id='gtalkloginbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='gtalkid']
</item>
</list>
<list title="MSN" hotkey="m">
<item action="CALL:speaklogins">
/html/body[@id='body']/form[@id='frontpagecontainer']/div[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxescontent']/div[@id='loginboxescontainer']/div[@id='msnloginbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='msnid']
</item>
</list>
<list title="Meebo" hotkey="b">
<item action="CALL:speaklogins">
/html/body[@id='body']/form[@id='frontpagecontainer']/div[@id='frontpage']/div[3]/div[@id='meebologin']/div[@id='meebologinbox']/div[@id='meebologincontent']/div[@id='meebologincontentwrapper']/div[2]/table/tbody/tr[1]/td[2]/input
</item>
</list>
</cnr>

*/
  var cnrString = '<cnr>' +
                  '<list title="AIM" hotkey="a">' +
                  '<item action="CALL:speaklogins">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxe" +
                  "scontent']/div[@id='loginboxescontainer']/div[@id='aimlogi" +
                  "nbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='aimid']" +
                  '</item>' +
  				  '<target title="" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxescontent\']/div[@id=\'imsignon\']' +
			      '</target> ' +
                  '</list>' +
                  '<list title="Yahoo" hotkey="y">' +
                  '<item action="CALL:speaklogins">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxe" +
                  "scontent']/div[@id='loginboxescontainer']/div[@id='yahoolo" +
                  "ginbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='yahooi" +
                  "d']" +
                  '</item>' +
  				  '<target title="" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxescontent\']/div[@id=\'imsignon\']' +
			      '</target> ' +
				  '</list>' +
                  '<list title="GTalk" hotkey="g">' +
                  '<item action="CALL:speaklogins">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxe" +
                  "scontent']/div[@id='loginboxescontainer']/div[@id='gtalklo" +
                  "ginbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='gtalki" +
                  "d']" +
                  '</item>' +
   				  '<target title="" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxescontent\']/div[@id=\'imsignon\']' +
			      '</target> ' +
				  '</list>' +
                  '<list title="MSN" hotkey="m">' +
                  '<item action="CALL:speaklogins">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxe" +
                  "scontent']/div[@id='loginboxescontainer']/div[@id='msnlogi" +
                  "nbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='msnid']" +
                  '</item>' +
    				  '<target title="" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxescontent\']/div[@id=\'imsignon\']' +
			      '</target> ' +
				  '</list>' +
                  '<list title="Meebo" hotkey="o">' +
                  '<item action="CALL:speaklogins">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[3]/div[@id='meebologin']/div[@id='me" +
                  "ebologinbox']/div[@id='meebologincontent']/div[@id='meebol" +
                  "ogincontentwrapper']/div[2]/table/tbody/tr[1]/td[2]/input" +
                  '</item>' +
  				  '<target title="You will be Signed In" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[3]/div[@id=\'meebologin\']/div[@id=\'meebologinbox\']/div[@id=\'meebologincontent\']/div[@id=\'meebologincontentwrapper\']/div[2]/div[@id=\'meebosubmit\']/table/tbody/tr/td[3]/div[@id=\'meebosignon\']/div[4]' +
			      '</target> ' +
                  '</list>' +
                  '</cnr>';


  axsSkel.axsNavObj.navInit(cnrString, null);

  axsSkel.axsLensObj = new AxsLens(axsSkel.axsJAXObj);
  axsSkel.axsNavObj.setLens(axsSkel.axsLensObj);
  axsSkel.axsLensObj.setMagnification(axsSkel.magSize);

  axsSkel.axsSoundObj = new AxsSound(true);
  axsSkel.axsNavObj.setSound(axsSkel.axsSoundObj);

  axsSkel.pkObj = new PowerKey('available actions', axsSkel.axsJAXObj);
  axsSkel.axsNavObj.setPowerKey(axsSkel.pkObj, '.');

  //Delete the next line when you are done with your script.
  //alert('AxsSkel loaded and initialized!');
  alert(version);
};

/**
 * Handler for DOMNodeInserted events. 
 * @param {Object} evt A DOMNodeInserted event.
 */
axsSkel.nodeInsertedHandler = function(evt){
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.
};

/**
 * Handler for DOMAttrModified events. 
 * @param {Object} evt A DOMAttrModified event.
 */
axsSkel.attrModifiedHandler = function(evt){
  var attrib = evt.attrName;
  var newVal = evt.newValue;
  var oldVal = evt.prevValue;
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.
};

/**
 * Handler for key events. 
 * @param {Object} evt A keypress event.
 * @return {boolean} If true, the event should be propagated.
 */
axsSkel.keyHandler = function(evt){
  //If Ctrl is held, it must be for some AT. 
  if (evt.ctrlKey) return true;

  if (evt.keyCode == 27){ // ESC
    axsSkel.axsJAXObj.lastFocusedNode.blur();
    return false;
  }

  if (axsSkel.axsJAXObj.inputFocused) return true;

  var command = axsSkel.keyCodeMap[evt.keyCode] ||
                axsSkel.charCodeMap[evt.charCode];

  if (command) return command();

  return true;
};

/**
 * Map from key codes to functions
 */
axsSkel.keyCodeMap = {
  // Map additional keyboard behavior that involves key codes here
};

/**
 * Map from character codes to functions
 * @return {boolean} Always returns false to indicate 
 *                   that the keycode has been handled.
 */
axsSkel.charCodeMap = {
  // Map additional keyboard behavior that involves char codes here
  // - (minus symbol)
  45 : function() {
         axsSkel.magSize -= 0.10;
         axsSkel.axsLensObj.setMagnification(axsSkel.magSize);
         return false;
       },
  // = (equal symbol)
  61 : function() {
         axsSkel.magSize += 0.10;
         axsSkel.axsLensObj.setMagnification(axsSkel.magSize);
         return false;
       },
  // ? (question mark)
  63 : function() {
         var helpStr = axsSkel.HELP 
//                       + axsSkel.axsNavObj.localHelpString() 
  //                     + axsSkel.axsNavObj.globalHelpString()
  ;
  helpStr += "Escape plus A , for aim  . ";
    helpStr += "Escape plus Y , for yahoo  . ";
	  helpStr += "Escape plus G , for gtalk  . ";
	    helpStr += "Escape plus M , for msn  . ";
		  helpStr += "Escape plus O , for meebo  . ";

  
		 
         axsSkel.axsJAXObj.speakTextViaNode(helpStr);
         return false;
       },
       
     // i (to check invisible or uncheck invisible)
     105: function(){
              	 
              		 var str = "";
               var checkboxXpath  = "//div[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxescontent']/table[@id='autoinvisible']/tbody/tr/td[2]/input[@id='invisiblecheck']";
          	
               var el = axsSkel.axsJAXObj.evalXPath(checkboxXpath, document.getElementsByTagName("body")[0] )[0];
               
                 
                 	if (el.checked==true){
                 		el.checked = false;
                 		str= "not checked";
                 	}
                 	else if (el.checked==false){
                 		el.checked = true;
                 		str = " checked"
                 	}
                 	
			 var pre = "sign on as invisible";
                      axsSkel.axsJAXObj.speakTextViaNode(pre + str);
                       return false;
        },
        
        
	     // r (to check remember me or uncheck remember me)
	     114: function(){
	              	 
	              		 var str = "";
	               var checkboxXpath  = "//div[@id='frontpage']/div[@class='right-side' and position()=3]/div[@id='meebologin']/div[@id='meebologinbox']/div[@id='meebologincontent']/div[@id='meebologincontentwrapper']/div[@class='meebologinform' and position()=2]/div[@class='meebobuttons' and @id='meebosubmit']/table/tbody/tr/td[2]/input[@id='remembermecheck']";
	          	
	               var el = axsSkel.axsJAXObj.evalXPath(checkboxXpath, document.getElementsByTagName("body")[0] )[0];
	               
	                 
	                 	if (el.checked==true){
	                 		el.checked = false;
	                 		str= "not checked";
	                 	}
	                 	else if (el.checked==false){
	                 		el.checked = true;
	                 		str = " checked"
	                 	}
	                 	
				 var pre = "remember meebo information";
	                      axsSkel.axsJAXObj.speakTextViaNode(pre + str);
	                       return false;
        }
};

axsSkel.init();
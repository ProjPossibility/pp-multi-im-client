var version = '.001';
// All the sentences commented with a trailing S are related to magnification

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
function hi(el)
{
	//alert(el.elem.parentNode.parentNode.parentNode.parentNode.innerHTML);
	el.elem.parentNode.parentNode.parentNode.getElementsByTagName("input")[0].focus();
	axsSkel.axsJAXObj.speakTextViaNode(String(el.elem.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("label")[0].getAttribute("for")).split('id').join('') + ' , login');
	//el.elem.parentNode.parentNode.parentNode.parentNode.innerHTML
	//var im = 
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
//axsSkel.axsLensObj = null;S

/**
 * The magnification factor for the AxsLens object.
 * @type number
 */
//axsSkel.magSize = 1.5;S

/**
 * Initializes the AxsJAX script
 */
axsSkel.init = function(){
  axsSkel.axsJAXObj = new AxsJAX(true);
  axsSkel.axsNavObj = new AxsNav(axsSkel.axsJAXObj);

  //Add event listeners
  document.addEventListener('DOMNodeInserted',
                            axsSkel.nodeInsertedHandler,
                            true);
  document.addEventListener('DOMAttrModified',
                            axsSkel.attrModifiedHandler,
                            true);
  document.addEventListener('keypress', axsSkel.keyHandler, true);

  /* The CNR is:
  <cnr>
	  <list title="Cycle Results" next="DOWN j" prev="UP k" fwd="n" back="p">
		<item>
			/html/body[@id='body']/form[@id='frontpagecontainer']/div[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxescontent']/div[@id='loginboxescontainer']/div[*]
	    </item>
		<item>
			/html/body[@id='body']/form[@id='frontpagecontainer']/div[@id='frontpage']/div[3]/div[@id='meebologin']/div[@id='meebologinbox']/div[@id='meebologincontent']/div[@id='meebologincontentwrapper']/div[2]
		</item>
	</list>
  </cnr>

  The first item captures the 4 external IMs. The second item captures the Meebo login box. 
  So item iterates through all the 5 login boxes.
*/  

  var cnrString = '<cnr>' +
                  '<list title="Cycle Results" next="DOWN j" prev="UP k" fwd' +
                  '="n" back="p">' +
                  //'<item action="CALL:hi">' +
				  '<item action="CALL:hi">' +
                  //'/html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div' +
                  //'[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxe' +
                  //'scontent\']/div[@id=\'loginboxescontainer\']/div[*]' +
				  '//tr[1]/td[2]/input[@type=\'text\']' +
                  '</item>' +
                  //'<item>' +
                  //'/html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div' +
                  //'[@id=\'frontpage\']/div[3]/div[@id=\'meebologin\']/div[@id=\'me' +
                  //'ebologinbox\']/div[@id=\'meebologincontent\']/div[@id=\'meebol' +
                  //'ogincontentwrapper\']/div[2]' +
                  //'</item>' +
                  '</list>' +
                  '</cnr>';

  axsSkel.axsNavObj.navInit(cnrString, null);

//  axsSkel.axsLensObj = new AxsLens(axsSkel.axsJAXObj);S
//  axsSkel.axsNavObj.setLens(axsSkel.axsLensObj);S
//  axsSkel.axsLensObj.setMagnification(axsSkel.magSize);S

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
alert(axsSkel.axsJAXObj.lastFocusedNode.childNodes[0].NodeName);
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
//         axsSkel.magSize -= 0.10;S
//         axsSkel.axsLensObj.setMagnification(axsSkel.magSize);S
         return false;
       },
  // = (equal symbol)
  61 : function() {
//         axsSkel.magSize += 0.10;S
//         axsSkel.axsLensObj.setMagnification(axsSkel.magSize);S
         return false;
       },
  // ? (question mark)
  63 : function() {
         var helpStr = axsSkel.HELP +
                       axsSkel.axsNavObj.localHelpString() +
                       axsSkel.axsNavObj.globalHelpString();
         axsSkel.axsJAXObj.speakTextViaNode(helpStr);
//axsSkel.axsJAXObj.speakTextViaNode("yeah!");
         return false;
       }
};

axsSkel.init();
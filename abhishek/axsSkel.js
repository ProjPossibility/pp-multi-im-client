var version = '0.008';

// Make text readable by inserting breaks between words.
String.prototype.forVoice = function()
{
	return this.split(' ').join(' , ').split("'").join("");
}
function Log(s)
{
	return false;
	if( document.getElementById("2-accounts") )
	{
		if( document.getElementById("2-accounts").innerHTML.length > 200 ) 
			document.getElementById("2-accounts").innerHTML = s + "<br>";
		else
			document.getElementById("2-accounts").innerHTML = s + "<br>" + document.getElementById("2-accounts").innerHTML;
	}
}


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
axsSkel.init = function()
{
  axsSkel.axsJAXObj = new AxsJAX(true);
  axsSkel.axsNavObj = new AxsNav(axsSkel.axsJAXObj);

  //Add event listeners
  document.addEventListener('DOMNodeInserted',axsSkel.nodeInsertedHandler, true);
  document.addEventListener('DOMAttrModified',axsSkel.attrModifiedHandler, true);
	document.addEventListener('keypress', axsSkel.keyHandler, true);
  document.addEventListener('focus', axsSkel.focusHandler, true);
	document.addEventListener('blur', axsSkel.blurHandler, true);
	document.addEventListener('keydown', axsSkel.keyHandler, true);

	// Attach the event handlers to the buddy list to speak buddy names.
	document.addEventListener('mouseover', axsSkel.buddyListHover, true);



  alert('gm init() - ' + version);


  var cnrString = '';
  
  
  axsSkel.axsNavObj.navInit(cnrString, null);

  axsSkel.axsLensObj = new AxsLens(axsSkel.axsJAXObj);
  axsSkel.axsNavObj.setLens(axsSkel.axsLensObj);
  axsSkel.axsLensObj.setMagnification(axsSkel.magSize);

  axsSkel.axsSoundObj = new AxsSound(true);
  axsSkel.axsNavObj.setSound(axsSkel.axsSoundObj);

  axsSkel.pkObj = new PowerKey('available actions', axsSkel.axsJAXObj);
  axsSkel.axsNavObj.setPowerKey(axsSkel.pkObj, '.');

	var xpath = '//*[@aria-live]';
	var liveRegions = axsSkel.axsJAXObj.evalXPath(xpath,document.body);
	for (var i=0, lr; lr = liveRegions[i]; i++){ lr.removeAttribute('aria-live'); }

  //Delete the next line when you are done with your script.
  //alert('AxsSkel loaded and initialized!');
};

axsSkel.buddyListHover = function(evt)
{
	var sTarget = String(evt.target.tagName).toLowerCase();
	// Try to call out buddy name if clicked upon in the list.
	//if( sTarget == 'span')
	//{
		if( sTarget == 'div' )
			axsSkel.CallOutBuddyName(evt.target.childNodes[1]);
	//}
};


// Calls out buddy name if evt matches required attributes of the page
axsSkel.CallOutBuddyName = function(target)
{
	if( target.parentNode.parentNode.parentNode.parentNode )
	{
		if( target.parentNode.parentNode.parentNode.parentNode.getAttribute("id") != "offlinebgroup-meebo-offline-group" )
		{
			//alert( target.parentNode.parentNode.parentNode.innerHTML );
			//alert( target.firstChild.nodeValue );
			axsSkel.axsJAXObj.speakText(target.firstChild.nodeValue);
		}
	}
}
/*
function catchevent() {
	eventSrcID=(event.srcElement)?event.srcElement.id:'undefined';
	eventtype=event.type;
	status=eventSrcID+' has received a '+eventtype+' event.';
}
*/

/**
 * Handler for DOMNodeInserted events. 
 * @param {Object} evt A DOMNodeInserted event.
 */
axsSkel.nodeInsertedHandler = function(evt)
{
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.

	
	try
	{
		
		if( target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("id") == "buddies" )
		{
			//target.addEventListener('DOMAttrModified',axsSkel.attrModifiedHandler, true);
			//Log('added event handler' + target.tagName + " " + target.getAttribute("id") + " " + target.className);
			target.addEventListener('mouseover', axsSkel.mouseover, true);
		}
		/*
		if( String(target.className).indexOf('buddyRow') > -1 )
		{
			Log(target.tagName + ' ' + target.getAttribute("id") + ' ' + target.parentNode.getAttribute("id") );
			Log(target.innerHTML.substr('<').join('(').split('>').join(')'));
			target.addEventListener('DOMAttrModified',axsSkel.attrModifiedHandler, true);
		}
		*/
	}
	catch(ex){}
	

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
	var sTarget = String(evt.target.tagName).toLowerCase();
	/*
	try
	{
		if( String(target.getAttribute('class')).indexOf('buddyRow') > -1 )
		{
			alert( target.parentNode('buddyRow') );
		}
	}
	catch (ex){}
	*/
	/*
	try
	{
		if( target.parentNode.parentNode.parentNode.parentNode.getAttribute("id") == "buddies" ) 
		{
			//axsSkel.CallOutBuddyName(evt.target);
			Log(sTarget);
		}
	}
	catch (ex){}
	*/

};

/**
 * Handler for key events. 
 * @param {Object} evt A keypress event.
 * @return {boolean} If true, the event should be propagated.
 */
axsSkel.keyHandler = function(evt)
{
	var sTarget = String(evt.target.tagName).toLowerCase();
	//If Ctrl is held, it must be for some AT. 
  if (evt.ctrlKey) return true;



	
	// Shift + A  plays the current text entered by the user
	if (evt.shiftKey && evt.keyCode == 65) 
	{
		// key shouldn't come in the textarea 
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		if( sTarget == "textarea" && evt.target.className == 'uiImMessage' )
		{
			if( evt.target.parentNode.parentNode.parentNode.parentNode )
			{
				var s = String(evt.target.value);
				if( s.length > 0 )
				{
					// this window is an IM Window. get the person's name and speak it out.
					var user = String(evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute("caption"));
					axsSkel.axsJAXObj.speakText('For ' + user.forVoice() + ', you wrote , ' + s);
				} 
				else 
				{
					axsSkel.axsJAXObj.speakText('No text entered.');
				}
			}
		}
	}



	// Try to call out buddy name if clicked upon in the list.
	if( evt.keyCode == 38 || evt.keyCode == 40 )
	{
		if( sTarget == 'span')
		{
			axsSkel.CallOutBuddyName(evt.target);
		}
	}


  if (evt.keyCode == 27){ // ESC
    axsSkel.axsJAXObj.lastFocusedNode.blur();
    return false;
  }

  if (axsSkel.axsJAXObj.inputFocused) return true;
  var command = axsSkel.keyCodeMap[evt.keyCode] || axsSkel.charCodeMap[evt.charCode];

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
         var helpStr = axsSkel.HELP +
                       axsSkel.axsNavObj.localHelpString() +
                       axsSkel.axsNavObj.globalHelpString();
         axsSkel.axsJAXObj.speakTextViaNode(helpStr);
         return false;
       }
};


/**
 * When an input blank has focus, the keystrokes should go into the blank
 * and should not trigger hot key commands.
 * @param {Object} evt A Focus event
 */
axsSkel.focusHandler = function(evt)
{
	var sTarget = String(evt.target.tagName).toLowerCase();
  axsSkel.lastFocusedNode = evt.target;
  if ((evt.target.tagName == 'INPUT') ||
      (evt.target.tagName == 'TEXTAREA')){
    axsSkel.inputFocused = true;
  }

	
	// Call out user's name when an im-window is focussed.
	if( evt.target.tagName == "TEXTAREA" ) 
	{
		if( evt.target.className == 'uiImMessage' )
		{
			// this window is an IM Window. get the person's name and speak it out.
			var user = String(evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute("caption"));
			//alert(user);
			axsSkel.axsJAXObj.speakText('Talking to ' + user.forVoice());
		}
	}



};

/**
 * When no input blanks have focus, the keystrokes should trigger hot key
 * commands.
 * @param {Object} evt A Blur event
 */
axsSkel.blurHandler = function (evt){
  axsSkel.lastFocusedNode = null;
  if ((evt.target.tagName == 'INPUT') ||
      (evt.target.tagName == 'TEXTAREA')){
    axsSkel.inputFocused = false;
  }
};



axsSkel.init();

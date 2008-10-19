 /*
 ************************************************
 AxsJAX Script for Multi-IM Client "http://www.meebo.com 
 ************************************************
 */       

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
 * Function Speaklogin(currentElement) Speak the name of the current login box intellignetly
 * Input: The current list item element passed from the CNR rule
 * Output: None
 *
 */
function speakLogin(currentElement)
{
	currentElement.elem.parentNode.parentNode.parentNode.getElementsByTagName("input")[0].focus(); 	//Set focus on the selected login box
	axsSkel.axsJAXObj.speakTextViaNode(String(currentElement.elem.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("label")[0].getAttribute("for")).split('id').join('') + ' , login'); 	//Speak the login box name intelligently
}
/*
function speakSignUp(e)
{
	axsSkel.axsJAXObj.speakText('Sign Up Form Opened Please Enter Details');
    axsSkel.axsJAXObj.clickElem(e.elem,false);
}
 * Function box(myel) Wrapper function for creating elem element of particular node
 * Input: Current Node
 * Output: Node containing Element
*/
 function box(myel)
 {
	 var el = { elem : myel }
	 return el;
 }
 // Make text readable by inserting breaks between words.
String.prototype.forVoice = function()
{
	return this.split(' ').join(' , ').split("'").join("");
}

/*
 * Function Custom_Speak(currentElement,id) Speak the name of the short cut key activated intelligently
 * Input: The current list item element passed from the CNR rule
 * Output: None 
*/

function Custom_Speak(currentElement,id)
	{
		var textToSpeak='';
		//alert(e.elem);
		switch(id)
		{
			case 1:
				textToSpeak="Add Buddy Clicked Please provide your buddy's name, your user logon name, and the group where you would like to add your buddy.";
				break;
			case 2:
				textToSpeak="Do you want to delete this contact ?";
				break;
			case 3:
				textToSpeak="Please select the logon account from which you'd like to IM your buddy.";
				break;
			case 4:
				textToSpeak="Please enter the name of a chat room you want to start or join.";
				break;
			case 5:
				textToSpeak="Please select a network service, username, and password for your new connection.";
				break;
		    case 6:
				textToSpeak="Signing out from account.";
			    break;
			case 7:
				textToSpeak="Sign Up For a new Account . ";
			    break;
		}
         axsSkel.axsJAXObj.speakText(textToSpeak);
		 axsSkel.axsJAXObj.clickElem(currentElement.elem,false);
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
  document.addEventListener('keydown', axsSkel.keyHandler, true);

  // CNR Rule 
  var cnrString = '<cnr>' +
                  '<list title="AIM" hotkey="a">' +
                  '<item action="CALL:speakLogin">' +
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
                  '<item action="CALL:speakLogin">' +
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
                  '<item action="CALL:speakLogin">' +
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
                  '<item action="CALL:speakLogin">' +
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
                  '<item action="CALL:speakLogin">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[3]/div[@id='meebologin']/div[@id='me" +
                  "ebologinbox']/div[@id='meebologincontent']/div[@id='meebol" +
                  "ogincontentwrapper']/div[2]/table/tbody/tr[1]/td[2]/input" +
                  '</item>' +
  				  '<target title="You will be Signed In" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[3]/div[@id=\'meebologin\']/div[@id=\'meebologinbox\']/div[@id=\'meebologincontent\']/div[@id=\'meebologincontentwrapper\']/div[2]/div[@id=\'meebosubmit\']/table/tbody/tr/td[3]/div[@id=\'meebosignon\']/div[4]' +
			      '</target> ' +
  				  //'<target title="" hotkey="s">'+
				  //'/html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[3]/div[@id=\'meebologin\']/div[@id=\'meebologinbox\']/div[@id=\'meebosignupcontent\']/div[@id=\'signupnow\']' +
			      //'</target> ' +
                  '</list>' +
                  '</cnr>';

  axsSkel.axsNavObj.navInit(cnrString, null);
 
  /* Setting Magnification Objects */
  axsSkel.axsLensObj = new AxsLens(axsSkel.axsJAXObj);
  axsSkel.axsNavObj.setLens(axsSkel.axsLensObj);
  axsSkel.axsLensObj.setMagnification(axsSkel.magSize);

  /* Setting Sound Objects */
  axsSkel.axsSoundObj = new AxsSound(true);
  axsSkel.axsNavObj.setSound(axsSkel.axsSoundObj);

  axsSkel.pkObj = new PowerKey('available actions', axsSkel.axsJAXObj);
  axsSkel.axsNavObj.setPowerKey(axsSkel.pkObj, '.');
};

/**
 * Handler for DOMNodeInserted events. 
 * @param {Object} evt A DOMNodeInserted event.
 */
  axsSkel.nodeInsertedHandler = function(evt){
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.

var xpath = '//*[@aria-live]';
	var liveRegions = axsSkel.axsJAXObj.evalXPath(xpath,document.body);
	for (var i=0, lr; lr = liveRegions[i]; i++){ lr.removeAttribute('aria-live'); }

  //Delete the next line when you are done with your script.
  alert('AxsSkel loaded and initialized!');
};

axsSkel.clickHandler = function(evt)
{
	var sTarget = String(evt.target.tagName).toLowerCase();

	// Try to call out buddy name if clicked upon in the list.
	if( sTarget == 'span')
	{
		axsSkel.CallOutBuddyName(evt.target);
	}
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


	if( target.parentNode.parentNode ) 
		if( target.parentNode.parentNode.getAttribute("id") == "buddies" )
		{
			target.addEventListener('DOMAttrModified',axsSkel.attrModifiedHandler, true);
			Log('added event handler' + target.tagName);;
		}

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
	 // Speak out the error message upon login. - Saumil Start

  if( evt.target.getAttribute("id") == "loginerrormessage" )

                {

                  if( target.innerHTML.length > 0 )

                                {

                                  axsSkel.axsJAXObj.speakText(target.innerHTML);

                                }

                }

  // Speak out the error message upon login. - Saumil End
};
/**
 * Handler for key events. 
 * @param {Object} evt A keypress event.
 * @return {boolean} If true, the event should be propagated.
 */
axsSkel.keyHandler = function(evt){
  //If Ctrl is held, it must be for some AT. 
  if (evt.ctrlKey) return true;
if(evt.shiftKey && evt.keyCode==65)
	{// Shortcut Key Shift + A for Add Buddy
	  if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		//Evaluate Xpath corresponding to Add Buddy Event.
	var node=axsSkel.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[@id='bltoolbar']/div[1]",document.getElementsByTagName('body')[0]);
	Custom_Speak(box(node[0]),1);
	}
	
	if(evt.shiftKey && evt.keyCode==73)
	{
		//Shortcut Key Shift + R for Remove Buddy
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
				//Evaluate Xpath corresponding to Remove Buddy Event.
	var node=axsSkel.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[@id='bltoolbar']/div[2]",document.getElementsByTagName('body')[0]);
	Custom_Speak(box(node[0]),2);
	}
		//Shortcut Key Shift + C for C
	if(evt.shiftKey && evt.keyCode==67)
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
	var node=axsSkel.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[@id='bltoolbar']/div[3]",document.getElementsByTagName('body')[0]);
	Custom_Speak(box(node[0]),3);
	}
	// Shortcut Key Shift + R for Start or Join Group Chat
	if(evt.shiftKey && evt.keyCode==82)
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
	var node=axsSkel.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[@id='bltoolbar']/div[4]",document.getElementsByTagName('body')[0]);
	Custom_Speak(box(node[0]),4);
	}
	// Shortcut Key Shift+ M for Sign On 
	if(evt.shiftKey && evt.keyCode==77)
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
	var node=axsSkel.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[4]/div[@id='signonbtn']/div[2]",document.getElementsByTagName('body')[0]);
	Custom_Speak(box(node[0]),5);
	}
	//Shortcut Key Shift +N for Sign Out 
	if(evt.shiftKey && evt.keyCode==78)
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
	var node=axsSkel.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[4]/div[@id='signoffmenu']",document.getElementsByTagName('body')[0]);
	Custom_Speak(box(node[0]),6);
	}
	// Shortcut Key Shift + Z for Sign Up Now 
	if(evt.shiftKey && evt.keyCode==90)
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
	var node=axsSkel.axsJAXObj.evalXPath("//form[@id='frontpagecontainer']/div[@id='frontpage']/div[3]/div[@id='meebologin']/div[@id='meebologinbox']/div[@id='meebosignupcontent']/div[@id='signupnow']",document.getElementsByTagName('body')[0]);
	Custom_Speak(box(node[0]),7);
	}
	//The shortcut key Shift and F helps user to search friends
	if(evt.shiftKey && (evt.keyCode == 70 || evt.keyCode == 102) )
	{
		if( evt.preventDefault() )
		{
		evt.preventDefault();
		}
		document.getElementById('bltoolbar').getElementsByTagName('input')[0].focus();
	}

	// Key: Shift + L : Online List
	if( evt.shiftKey && (evt.keyCode == 76 || evt.keyCode == 108))
	{
		var s = '';
		var i;
		var xpath = '//div[@id=\'buddylistwin\']/div[@id=\'content\']/div[not(@id=\'offlinebgroup-meebo-offline-group\')]/div/div[@id]/div[2]/div[@id]/div/span[2]';
		var liveRegions = axsSkel.axsJAXObj.evalXPath(xpath,document.body);
		for ( i=0, lr; lr = liveRegions[i]; i++)
		{
			if (i != 0)
			{
				s += " , ";
				s += "and";
				s += " , ";
				s += lr.innerHTML.split('>').join('').split('<').join('');
			}
		
		}
		//alert("The count is" + count);
		axsSkel.axsJAXObj.speakText('You have' + i + ' friends Online. Your Online Friends are' + s.forVoice());
		//axsSkel.axsJAXObj.speakText(s.forVoice());
	}

	// Key: Shift + O : Offline List
	if( evt.shiftKey && (evt.keyCode == 79 || evt.keyCode == 111))
	{
		var s = '';
		var xpath = '//div[@id=\'buddylistwin\']/div[@id=\'content\']/div[@id=\'buddies\']/div/div[@id=\'offlinebgroup-meebo-offline-group\']/div[2]/div[@id]/div/span[2]';
		var liveRegions = axsSkel.axsJAXObj.evalXPath(xpath,document.body);
		for ( var i=0, lr; lr = liveRegions[i]; i++)
		{
			if (i != 0)
			{
				s += " , ";
				s += "and";
				s += " , ";
				s += lr.innerHTML.split('>').join('').split('<').join('');
			}
			axsSkel.axsJAXObj.speakText('You have ' + i +' friends Offline. Your Offline Friends are' + s.forVoice());
		}
				//alert(i);
	}
	
	// Key: Shift + U : Status Message
	if( evt.shiftKey && (evt.keyCode == 85 || evt.keyCode == 117))
	{
		var s = '';
		var xpath = '//div[@id=\'buddylistwin\']/div[@id=\'content\']/div[@id=\'statusmenu\']/div[2]/div[@id]/span';
		var liveRegions = axsSkel.axsJAXObj.evalXPath(xpath,document.body);
		for ( var i=0, lr; lr = liveRegions[i]; i++)
		{
			s += lr.innerHTML;
			axsSkel.axsJAXObj.speakText('Your status is' + s.forVoice());
		}
	}


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

/* Code to get String for (?) - Help */ 
  63 : function() {
		 // Speak out the list of all the hotkeys available to the user
         var helpStr = axsSkel.HELP;
			 helpStr += "Escape plus A , for aim  . ";
			 helpStr += "Escape plus Y , for yahoo  . ";
			 helpStr += "Escape plus G , for gtalk  . ";
			 helpStr += "Escape plus M , for msn  . ";
			 helpStr += "Escape plus O , for meebo  . ";
			 helpStr += "I , for Entering in Invisible  Mode . ";
			 helpStr += "R , for Entering in Remember Me  Mode . ";
		 
         axsSkel.axsJAXObj.speakTextViaNode(helpStr);		// speak out the help string
         return false;
       },
       
// Handler for Escape + I to check invisible or uncheck the invisible checkbox
     105: function() {
              	 
           	   var str = "sign on as invisible";
               var checkboxXpath  = "//div[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxescontent']/table[@id='autoinvisible']/tbody/tr/td[2]/input[@id='invisiblecheck']"; // getting the xpath of the required checkbox
          	
               var chkbox = axsSkel.axsJAXObj.evalXPath(checkboxXpath, document.getElementsByTagName("body")[0] )[0]; // catching the checkbox using the xpath
               
			   if (chkbox.checked==true){	
                 		chkbox.checked = false;		// uncheck the checkbox
                 		str += "not checked";		// prepare string
                 	}
               else if (chkbox.checked==false){	
                 		chkbox.checked = true;		// check the checkbox
                 		str += " checked"			// prepare string
                 	}
                 	
             axsSkel.axsJAXObj.speakTextViaNode(str);		// speak the action which has been accomplished
             return false;
        },
        
// Handler for Escape + R to check or uncheck remember me 
	     114: function(){
			 var str = "remember meebo information";
	         var checkboxXpath  = "//div[@id='frontpage']/div[@class='right-side' and position()=3]/div[@id='meebologin']/div[@id='meebologinbox']/div[@id='meebologincontent']/div[@id='meebologincontentwrapper']/div[@class='meebologinform' and position()=2]/div[@class='meebobuttons' and @id='meebosubmit']/table/tbody/tr/td[2]/input[@id='remembermecheck']";	// getting the xpath of the required checkbox
	          	
             var chkbox = axsSkel.axsJAXObj.evalXPath(checkboxXpath, document.getElementsByTagName("body")[0] )[0];
                 
  			 if (chkbox.checked==true){
					chkbox.checked = false;			// uncheck the checkbox
					str += "not checked";					// prepare string
					}
			else if (chkbox.checked==false){		
					chkbox.checked = true;			// uncheck the checkbox
					str += " checked"				// prepare string
					}
			
		  axsSkel.axsJAXObj.speakTextViaNode(str);		// speak the action which has been accomplished
		  return false;
        }
};

axsSkel.init();
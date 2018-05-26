Type.registerNamespace("Sys.Extended.UI"),Sys.Extended.UI.CollapsiblePanelExpandDirection=function(){throw Error.invalidOperation()},Sys.Extended.UI.CollapsiblePanelExpandDirection.prototype={Horizontal:0,Vertical:1},Sys.Extended.UI.CollapsiblePanelExpandDirection.registerEnum("Sys.Extended.UI.CollapsiblePanelExpandDirection",!1),Sys.Extended.UI.CollapsiblePanelBehavior=function(e){Sys.Extended.UI.CollapsiblePanelBehavior.initializeBase(this,[e]),this._collapsedSize=0,this._expandedSize=0,this._scrollContents=null,this._collapsed=!1,this._expandControlID=null,this._collapseControlID=null,this._textLabelID=null,this._collapsedText=null,this._expandedText=null,this._imageControlID=null,this._expandedImage=null,this._collapsedImage=null,this._suppressPostBack=null,this._autoExpand=null,this._autoCollapse=null,this._expandDirection=Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical,this._collapseClickHandler=null,this._expandClickHandler=null,this._panelMouseEnterHandler=null,this._panelMouseLeaveHandler=null,this._childDiv=null,this._animation=null},Sys.Extended.UI.CollapsiblePanelBehavior.prototype={initialize:function(){Sys.Extended.UI.CollapsiblePanelBehavior.callBaseMethod(this,"initialize");var e=this.get_element();this._animation=new Sys.Extended.UI.Animation.LengthAnimation(e,.25,10,"style",null,0,0,"px"),this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical?this._animation.set_propertyKey("height"):this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Horizontal&&this._animation.set_propertyKey("width"),this._animation.add_ended(Function.createDelegate(this,this._onAnimateComplete)),null==this._suppressPostBack&&("INPUT"==e.tagName&&"checkbox"==e.type?(this._suppressPostBack=!1,this.raisePropertyChanged("SuppressPostBack")):"A"==e.tagName&&(this._suppressPostBack=!0,this.raisePropertyChanged("SuppressPostBack")));var t=Sys.Extended.UI.CollapsiblePanelBehavior.callBaseMethod(this,"get_ClientState");if(t&&""!=t){var s=Boolean.parse(t);this._collapsed!=s&&(this._collapsed=s,this.raisePropertyChanged("Collapsed"))}if(this._setupChildDiv(),this._collapsed?this._setTargetSize(this._getCollapsedSize()):this._setTargetSize(this._getExpandedSize()),this._setupState(this._collapsed),this._collapseControlID==this._expandControlID?(this._collapseClickHandler=Function.createDelegate(this,this.togglePanel),this._expandClickHandler=null):(this._collapseClickHandler=Function.createDelegate(this,this.collapsePanel),this._expandClickHandler=Function.createDelegate(this,this.expandPanel)),this._autoExpand&&(this._panelMouseEnterHandler=Function.createDelegate(this,this._onMouseEnter),$addHandler(e,"mouseover",this._panelMouseEnterHandler)),this._autoCollapse&&(this._panelMouseLeaveHandler=Function.createDelegate(this,this._onMouseLeave),$addHandler(e,"mouseout",this._panelMouseLeaveHandler)),this._collapseControlID){var i=$get(this._collapseControlID);if(!i)throw Error.argument("CollapseControlID",String.format(Sys.Extended.UI.Resources.CollapsiblePanel_NoControlID,this._collapseControlID));$addHandler(i,"click",this._collapseClickHandler)}if(this._expandControlID&&this._expandClickHandler){var n=$get(this._expandControlID);if(!n)throw Error.argument("ExpandControlID",String.format(Sys.Extended.UI.Resources.CollapsiblePanel_NoControlID,this._expandControlID));$addHandler(n,"click",this._expandClickHandler)}},dispose:function(){var e=this.get_element();if(this._collapseClickHandler){var t=this._collapseControlID?$get(this._collapseControlID):null;t&&$removeHandler(t,"click",this._collapseClickHandler),this._collapseClickHandler=null}if(this._expandClickHandler){var s=this._expandControlID?$get(this._expandControlID):null;s&&$removeHandler(s,"click",this._expandClickHandler),this._expandClickHandler=null}this._panelMouseEnterHandler&&$removeHandler(e,"mouseover",this._panelMouseEnterHandler),this._panelMouseLeaveHandler&&$removeHandler(e,"mouseout",this._panelMouseLeaveHandler),this._animation&&(this._animation.dispose(),this._animation=null),Sys.Extended.UI.CollapsiblePanelBehavior.callBaseMethod(this,"dispose")},togglePanel:function(e){this._toggle(e)},expandPanel:function(e){this._doOpen(e)},collapsePanel:function(e){this._doClose(e)},_checkCollapseHide:function(){if(this._collapsed&&0==this._getTargetSize()){var e=this.get_element(),t=$common.getCurrentStyle(e,"display");return e.oldDisplay||"none"==t||(e.oldDisplay=t,e.style.display="none"),!0}return!1},_doClose:function(e){var t=new Sys.CancelEventArgs;if(this.raise_collapsing(t),!t.get_cancel()&&(this._animation&&(this._animation.stop(),this._animation.set_startValue(this._getTargetSize()),this._animation.set_endValue(this._getCollapsedSize()),this._animation.play()),this._setupState(!0),this._suppressPostBack)){if(!e||!e.preventDefault)return e&&(e.returnValue=!1),!1;e.preventDefault()}},_doOpen:function(e){var t=new Sys.CancelEventArgs;if(this.raise_expanding(t),!t.get_cancel()){if(this._animation){this._animation.stop();var s=this.get_element();this._checkCollapseHide()&&$common.getCurrentStyle(s,"display",s.style.display)&&(s.oldDisplay?s.style.display=s.oldDisplay:s.style.removeAttribute?s.style.removeAttribute("display"):s.style.removeProperty("display"),s.oldDisplay=null),this._animation.set_startValue(this._getTargetSize()),this._animation.set_endValue(this._getExpandedSize()),this._animation.play()}if(this._setupState(!1),this._suppressPostBack){if(!e||!e.preventDefault)return e&&(e.returnValue=!1),!1;e.preventDefault()}}},_onAnimateComplete:function(){var e=this.get_element();this._collapsed||this._expandedSize?this._checkCollapseHide():this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical?this._childDiv.offsetHeight<=e.offsetHeight?(e.style.height="auto",this.raisePropertyChanged("TargetHeight")):this._checkCollapseHide():this._childDiv.offsetWidth<=e.offsetWidth?(e.style.width="auto",this.raisePropertyChanged("TargetWidth")):this._checkCollapseHide(),this._collapsed?(this.raise_collapseComplete(),this.raise_collapsed(Sys.EventArgs.Empty)):(this.raise_expandComplete(),this.raise_expanded(new Sys.EventArgs))},_onMouseEnter:function(e){this._autoExpand&&this.expandPanel(e)},_onMouseLeave:function(e){this._autoCollapse&&this.collapsePanel(e)},_getExpandedSize:function(){return this._expandedSize?this._expandedSize:this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical?this._childDiv.offsetHeight:this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Horizontal?this._childDiv.offsetWidth:void 0},_getCollapsedSize:function(){return this._collapsedSize?this._collapsedSize:0},_getTargetSize:function(){var e;return this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical?e=this.get_targetHeight():this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Horizontal&&(e=this.get_targetWidth()),void 0===e&&(e=0),e},_setTargetSize:function(e){var t=this._collapsed||this._expandedSize,s=this.get_element();this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical?t||e<s.offsetHeight?this.set_targetHeight(e):(s.style.height="auto",this.raisePropertyChanged("TargetHeight")):this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Horizontal&&(t||e<s.offsetWidth?this.set_targetWidth(e):(s.style.width="auto",this.raisePropertyChanged("TargetWidth"))),this._checkCollapseHide()},_setupChildDiv:function(){var e=this._getTargetSize(),t=this.get_element();for(this._childDiv=t.cloneNode(!1),t.id="",this._childDiv.style.visibility="visible",this._childDiv.style.display="";t.hasChildNodes();){var s=t.childNodes[0];s=t.removeChild(s),this._childDiv.appendChild(s)}t.setAttribute("style",""),t.className="",t.style.border="0px",t.style.margin="0px",t.style.padding="0px",this._scrollContents?(this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical?(t.style.overflowY="scroll",this._childDiv.style.overflowY=""):(t.style.overflowX="scroll",this._childDiv.style.overflowX=""),Sys.Browser.agent!=Sys.Browser.Safari&&Sys.Browser.agent!=Sys.Browser.Opera||(t.style.overflow="scroll",this._childDiv.style.overflow="")):(this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical?(t.style.overflowY="hidden",this._childDiv.style.overflowY=""):(t.style.overflowX="hidden",this._childDiv.style.overflowX=""),Sys.Browser.Agent!=Sys.Browser.Safari&&Sys.Browser.Agent!=Sys.Browser.Opera||(t.style.overflow="hidden",this._childDiv.style.overflow="")),this._childDiv.style.position="",e==this._collapsedSize&&(this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical?this._childDiv.style.height="auto":this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Horizontal&&(this._childDiv.style.width="auto")),t.appendChild(this._childDiv),t.style.visibility="visible",t.style.display="",e=this._collapsed?this._getCollapsedSize():this._getExpandedSize(),this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical?(t.style.height=e+"px",this._expandedSize?t.style.height=this._expandedSize+"px":t.style.height="auto",this._childDiv.style.height="auto"):this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Horizontal&&(t.style.width=e+"px",this._expandedSize?t.style.width=this._expandedSize+"px":t.style.width="auto",this._childDiv.style.width="auto")},_setupState:function(e){if(e){if(this._textLabelID&&this._collapsedText){var t=$get(this._textLabelID);t&&(t.innerHTML=this._collapsedText)}if(this._imageControlID&&this._collapsedImage){var s=$get(this._imageControlID);s&&s.src&&(s.src=this._collapsedImage,(this._expandedText||this._collapsedText)&&(s.title=this._collapsedText))}}else{if(this._textLabelID&&this._expandedText){var t=$get(this._textLabelID);t&&(t.innerHTML=this._expandedText)}if(this._imageControlID&&this._expandedImage){var s=$get(this._imageControlID);s&&s.src&&(s.src=this._expandedImage,(this._expandedText||this._collapsedText)&&(s.title=this._expandedText))}}this._collapsed!=e&&(this._collapsed=e,this.raisePropertyChanged("Collapsed")),Sys.Extended.UI.CollapsiblePanelBehavior.callBaseMethod(this,"set_ClientState",[this._collapsed.toString()])},_toggle:function(e){return this.get_collapsed()?this.expandPanel(e):this.collapsePanel(e)},add_collapsing:function(e){this.get_events().addHandler("collapsing",e)},remove_collapsing:function(e){this.get_events().removeHandler("collapsing",e)},raise_collapsing:function(e){var t=this.get_events().getHandler("collapsing");t&&t(this,e)},raiseCollapsing:function(e){Sys.Extended.Deprecated("raiseCollapsing","raise_collapsing"),this.raise_collapsing(e)},add_collapsed:function(e){this.get_events().addHandler("collapsed",e)},remove_collapsed:function(e){this.get_events().removeHandler("collapsed",e)},raise_collapsed:function(e){var t=this.get_events().getHandler("collapsed");t&&t(this,e)},raiseCollapsed:function(e){Sys.Extended.Deprecated("raiseCollapsed","raise_collapsed"),this.raise_collapsed(e)},add_collapseComplete:function(e){this.get_events().addHandler("collapseComplete",e)},remove_collapseComplete:function(e){this.get_events().removeHandler("collapseComplete",e)},raise_collapseComplete:function(){var e=this.get_events().getHandler("collapseComplete");e&&e(this,Sys.EventArgs.Empty)},raiseCollapseComplete:function(){Sys.Extended.Deprecated("raiseCollapseComplete","raise_collapseComplete"),this.raise_collapseComplete()},add_expanding:function(e){this.get_events().addHandler("expanding",e)},remove_expanding:function(e){this.get_events().removeHandler("expanding",e)},raise_expanding:function(e){var t=this.get_events().getHandler("expanding");t&&t(this,e)},raiseExpanding:function(e){Sys.Extended.Deprecated("raiseExpanding","raise_expanding"),this.raise_expanding(e)},add_expanded:function(e){this.get_events().addHandler("expanded",e)},remove_expanded:function(e){this.get_events().removeHandler("expanded",e)},raise_expanded:function(e){var t=this.get_events().getHandler("expanded");t&&t(this,e)},raiseExpanded:function(e){Sys.Extended.Deprecated("raiseExpanded","raise_expanded"),this.raise_expanded(e)},add_expandComplete:function(e){this.get_events().addHandler("expandComplete",e)},remove_expandComplete:function(e){this.get_events().removeHandler("expandComplete",e)},raise_expandComplete:function(){var e=this.get_events().getHandler("expandComplete");e&&e(this,Sys.EventArgs.Empty)},raiseExpandComplete:function(){Sys.Extended.Deprecated("raiseExpandComplete","raise_expandComplete"),this.raise_expandComplete()},get_targetHeight:function(){return this.get_element().offsetHeight},set_targetHeight:function(e){this.get_element().style.height=e+"px",this.raisePropertyChanged("targetHeight")},get_TargetHeight:function(){return Sys.Extended.Deprecated("get_TargetHeight","get_targetHeight"),this.get_targetHeight()},set_TargetHeight:function(e){Sys.Extended.Deprecated("set_TargetHeight","set_targetHeight"),this.set_targetHeight(e)},get_targetWidth:function(){return this.get_element().offsetWidth},set_targetWidth:function(e){this.get_element().style.width=e+"px",this.raisePropertyChanged("targetWidth")},get_TargetWidth:function(){return Sys.Extended.Deprecated("get_TargetWidth","get_targetWidth"),this.get_targetWidth()},set_TargetWidth:function(e){Sys.Extended.Deprecated("set_TargetWidth","set_targetWidth"),this.set_targetWidth(e)},get_collapsed:function(){return this._collapsed},set_collapsed:function(e){this.get_isInitialized()&&this.get_element()&&e!=this.get_collapsed()?this.togglePanel():(this._collapsed=e,this.raisePropertyChanged("collapsed"))},get_Collapsed:function(){return Sys.Extended.Deprecated("get_Collapsed","get_collapsed"),this.get_collapsed()},set_Collapsed:function(e){Sys.Extended.Deprecated("set_Collapsed","set_collapsed"),this.set_collapsed(e)},get_collapsedSize:function(){return this._collapsedSize},set_collapsedSize:function(e){this._collapsedSize!=e&&(this._collapsedSize=e,this.raisePropertyChanged("collapsedSize"))},get_CollapsedSize:function(){return Sys.Extended.Deprecated("get_CollapsedSize","get_collapsedSize"),this.get_collapsedSize()},set_CollapsedSize:function(e){Sys.Extended.Deprecated("set_CollapsedSize","set_collapsedSize"),this.set_collapsedSize(e)},get_expandedSize:function(){return this._expandedSize},set_expandedSize:function(e){this._expandedSize!=e&&(this._expandedSize=e,this.raisePropertyChanged("expandedSize"))},get_ExpandedSize:function(){return Sys.Extended.Deprecated("get_ExpandedSize","get_expandedSize"),this.get_expandedSize()},set_ExpandedSize:function(e){Sys.Extended.Deprecated("set_ExpandedSize","set_expandedSize"),this.set_expandedSize(e)},get_collapseControlID:function(){return this._collapseControlID},set_collapseControlID:function(e){this._collapseControlID!=e&&(this._collapseControlID=e,this.raisePropertyChanged("collapseControlID"))},get_CollapseControlID:function(){return Sys.Extended.Deprecated("get_CollapseControlID","get_collapseControlID"),this.get_collapseControlID()},set_CollapseControlID:function(e){Sys.Extended.Deprecated("set_CollapseControlID","set_collapseControlID"),this.set_collapseControlID(e)},get_expandControlID:function(){return this._expandControlID},set_expandControlID:function(e){this._expandControlID!=e&&(this._expandControlID=e,this.raisePropertyChanged("expandControlID"))},get_ExpandControlID:function(){return Sys.Extended.Deprecated("get_ExpandControlID","get_expandControlID"),this.get_expandControlID()},set_ExpandControlID:function(e){Sys.Extended.Deprecated("set_ExpandControlID","set_expandControlID"),this.set_expandControlID(e)},get_scrollContents:function(){return this._scrollContents},set_scrollContents:function(e){this._scrollContents!=e&&(this._scrollContents=e,this.raisePropertyChanged("scrollContents"))},get_ScrollContents:function(){return Sys.Extended.Deprecated("get_ScrollContents","get_scrollContents"),this.get_scrollContents()},set_ScrollContents:function(e){Sys.Extended.Deprecated("set_ScrollContents","set_scrollContents"),this.set_scrollContents(e)},get_suppressPostBack:function(){return this._suppressPostBack},set_suppressPostBack:function(e){this._suppressPostBack!=e&&(this._suppressPostBack=e,this.raisePropertyChanged("suppressPostBack"))},get_SuppressPostBack:function(){return Sys.Extended.Deprecated("get_SuppressPostBack","get_suppressPostBack"),this.get_suppressPostBack()},set_SuppressPostBack:function(e){Sys.Extended.Deprecated("set_SuppressPostBack","set_suppressPostBack"),this.set_suppressPostBack(e)},get_textLabelID:function(){return this._textLabelID},set_textLabelID:function(e){this._textLabelID!=e&&(this._textLabelID=e,this.raisePropertyChanged("textLabelID"))},get_TextLabelID:function(){return Sys.Extended.Deprecated("get_TextLabelID","get_textLabelID"),this.get_textLabelID()},set_TextLabelID:function(e){Sys.Extended.Deprecated("set_TextLabelID","set_textLabelID"),this.set_textLabelID(e)},get_expandedText:function(){return this._expandedText},set_expandedText:function(e){this._expandedText!=e&&(this._expandedText=e,this.raisePropertyChanged("expandedText"))},get_ExpandedText:function(){return Sys.Extended.Deprecated("get_ExpandedText","get_expandedText"),this.get_expandedText()},set_ExpandedText:function(e){Sys.Extended.Deprecated("set_ExpandedText","set_expandedText"),this.set_expandedText(e)},get_collapsedText:function(){return this._collapsedText},set_collapsedText:function(e){this._collapsedText!=e&&(this._collapsedText=e,this.raisePropertyChanged("collapsedText"))},get_CollapsedText:function(){return Sys.Extended.Deprecated("get_CollapsedText","get_collapsedText"),this.get_collapsedText()},set_CollapsedText:function(e){Sys.Extended.Deprecated("set_CollapsedText","set_collapsedText"),this.set_collapsedText(e)},get_imageControlID:function(){return this._imageControlID},set_imageControlID:function(e){this._imageControlID!=e&&(this._imageControlID=e,this.raisePropertyChanged("imageControlID"))},get_ImageControlID:function(){return Sys.Extended.Deprecated("get_ImageControlID","get_imageControlID"),this.get_imageControlID()},set_ImageControlID:function(e){Sys.Extended.Deprecated("set_ImageControlID","set_imageControlID"),this.set_imageControlID()},get_expandedImage:function(){return this._expandedImage},set_expandedImage:function(e){this._expandedImage!=e&&(this._expandedImage=e,this.raisePropertyChanged("expandedImage"))},get_ExpandedImage:function(){return Sys.Extended.Deprecated("get_ExpandedImage","get_expandedImage"),this.get_expandedImage()},set_ExpandedImage:function(e){Sys.Extended.Deprecated("set_ExpandedImage","set_expandedImage"),this.set_expandedImage(e)},get_collapsedImage:function(){return this._collapsedImage},set_collapsedImage:function(e){this._collapsedImage!=e&&(this._collapsedImage=e,this.raisePropertyChanged("collapsedImage"))},get_CollapsedImage:function(){return Sys.Extended.Deprecated("get_CollapsedImage","get_collapsedImage"),this.get_collapsedImage()},set_CollapsedImage:function(e){Sys.Extended.Deprecated("set_CollapsedImage","set_collapsedImage"),this.set_collapsedImage()},get_autoExpand:function(){return this._autoExpand},set_autoExpand:function(e){this._autoExpand!=e&&(this._autoExpand=e,this.raisePropertyChanged("autoExpand"))},get_AutoExpand:function(){return Sys.Extended.Deprecated("get_AutoExpand","get_autoExpand"),this.get_autoExpand()},set_AutoExpand:function(e){Sys.Extended.Deprecated("set_AutoExpand","set_autoExpand"),this.set_autoExpand(e)},get_autoCollapse:function(){return this._autoCollapse},set_autoCollapse:function(e){this._autoCollapse!=e&&(this._autoCollapse=e,this.raisePropertyChanged("autoCollapse"))},get_AutoCollapse:function(){return Sys.Extended.Deprecated("get_AutoCollapse","get_autoCollapse"),this.get_autoCollapse()},set_AutoCollapse:function(e){Sys.Extended.Deprecated("set_AutoCollapse","set_autoCollapse"),this.set_autoCollapse(e)},get_expandDirection:function(){return this._expandDirection==Sys.Extended.UI.CollapsiblePanelExpandDirection.Vertical},set_expandDirection:function(e){this._expandDirection!=e&&(this._expandDirection=e,this.raisePropertyChanged("expandDirection"))},get_ExpandDirection:function(){return Sys.Extended.Deprecated("get_ExpandDirection","get_expandDirection"),this.get_expandDirection()},set_ExpandDirection:function(e){Sys.Extended.Deprecated("set_ExpandDirection","set_expandDirection"),this.set_expandDirection(e)}},Sys.Extended.UI.CollapsiblePanelBehavior.registerClass("Sys.Extended.UI.CollapsiblePanelBehavior",Sys.Extended.UI.BehaviorBase);
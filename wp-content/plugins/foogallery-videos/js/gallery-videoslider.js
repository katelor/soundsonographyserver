/*!
 * Responsive Video Gallery - A jQuery plugin that provides a slider with horizontal and vertical thumb layouts for video galleries.
 * @version 1.0.3
 * @link http://fooplugins.github.io/rvslider/
 * @copyright Steven Usher & Brad Vincent 2015
 * @license Released under the MIT license.
 */
(function(t,e){t.fn.rvslider=function(i){return this.each(function(){var s=t(this).data("__RVSlider__");s instanceof e.RVSlider&&s.destroy(),e.RVSlider(this,i)})};var i={selected:0,swipe:{deadzone:10,items:.05,nav:.1,touches:1},breakpoints:null,mejs:{enabled:!0,youtube:!1,vimeo:!1}};e.RVSlider=function(s,o){if(!(this instanceof e.RVSlider))return new e.RVSlider(s,o);var r=t(s);this.$={el:r,empty:r.find(".rvs-empty")},this.o=t.extend(!0,{},i,o),this.index=this.o.selected,this.breakpoints="[object Array]"===Object.prototype.toString.call(this.o.breakpoints)?this.o.breakpoints:[[320,"rvs-xs",2],[768,"rvs-xs rvs-sm",3],[1024,"rvs-xs rvs-sm rvs-md",4],[1280,"rvs-xs rvs-sm rvs-md rvs-lg",5],[1600,"rvs-xs rvs-sm rvs-md rvs-lg rvs-xl",6]],this.breakpoint=null,this.useViewport=this.$.el.hasClass("rvs-use-viewport"),this.items=new e.RVSliderItems(this),this.nav=new e.RVSliderNav(this),this.player=new e.RVSliderPlayer(this),this.resize(),this.setActive(this.index),this.$.el.addClass("rvs-animate").data("__RVSlider__",this),jQuery(window).on("resize.rvs",{self:this},this.onWindowResize)},e.RVSlider.prototype.destroy=function(){t(window).off("resize.rvs",this.onWindowResize),this.$.el.removeClass("rvs-animate").removeData("__RVSlider__"),this.player.destroy(),this.nav.destroy(),this.items.destroy()},e.RVSlider.prototype._breakpoint=function(){var t,e="devicePixelRatio"in window&&"number"==typeof window.devicePixelRatio?window.devicePixelRatio:1,i=0,s=this.breakpoints.length,o=this.useViewport?(window.innerWidth||document.documentElement.clientWidth||(document.body?document.body.offsetWidth:0))/e:this.$.el.parent().innerWidth();for(this.breakpoints.sort(function(t,e){return t[0]-e[0]});s>i;i++)if(this.breakpoints[i][0]>=o){t=this.breakpoints[i];break}return t||(t=this.breakpoints[s-1]),t},e.RVSlider.prototype.preresize=function(){this.$.el.removeClass("rvs-animate")},e.RVSlider.prototype.resize=function(){this.breakpoint=this._breakpoint(),this.$.el.removeClass(this.breakpoints[this.breakpoints.length-1][1]).addClass(this.breakpoint[1]),this.items.resize(),this.nav.resize(),this.$.el.addClass("rvs-animate")},e.RVSlider.prototype.setActive=function(t){0==this.items.count?this.$.empty.show():(this.$.empty.hide(),this.items.setActive(t),this.nav.setActive(t),this.player.setActive(t),this.index=t)},e.RVSlider.prototype.onWindowResize=function(t){var e=t.data.self;e.__resize__&&clearTimeout(e.__resize__),e.preresize(),e.__resize__=setTimeout(function(){e.__resize__=!1,e.resize()},50)}})(jQuery,window.FooPlugins=window.FooPlugins||{}),function(t,e){e.RVSliderItems=function(t){if(!(this instanceof e.RVSliderItems))return new e.RVSliderItems(t);this.rvs=t;var i=this;this.$={container:i.rvs.$.el.find(".rvs-item-container"),stage:i.rvs.$.el.find(".rvs-item-stage").on("touchstart.rvs",{self:i},i.onTouchStart),items:i.rvs.$.el.find(".rvs-item")},this.count=i.$.items.length,this.touched=!1,this.start=[0,0],this.diff=[0,0],this.width=0,this.height=0},e.RVSliderItems.prototype.destroy=function(){this.$.stage.off("touchstart.rvs",this.onTouchStart).off("touchmove.rvs",this.onTouchMove).off("touchend.rvs",this.onTouchEnd),this.$.stage.css({width:"",transform:""}),this.$.items.css({width:"",left:""}).removeClass("rvs-active")},e.RVSliderItems.prototype.resize=function(){var e=this;e.width=e.$.container.width(),e.height=e.$.container.height(),e.$.items.each(function(i){t(this).css({width:e.width,left:i*e.width})}),e.$.stage.css({width:e.width*e.count,transform:"translateX(-"+e.rvs.index*e.width+"px)"})},e.RVSliderItems.prototype.setActive=function(t){t>=0&&this.count>t?(this.$.stage.css("transform","translateX(-"+t*this.width+"px)"),this.$.items.removeClass("rvs-active").eq(t).addClass("rvs-active")):this.$.stage.css("transform","translateX(-"+this.rvs.index*this.width+"px)")},e.RVSliderItems.prototype.onTouchStart=function(t){var e=t.data.self,i=t.originalEvent.touches||t.touches;i.length==e.rvs.o.swipe.touches&&(e.touched=!0,e.start=[i[0].pageX,i[0].pageY],e.$.stage.on("touchmove.rvs",{self:e},e.onTouchMove).on("touchend.rvs",{self:e},e.onTouchEnd))},e.RVSliderItems.prototype.onTouchMove=function(t){var e=t.data.self,i=t.originalEvent.touches||t.touches;e.touched&&i.length==e.rvs.o.swipe.touches&&(e.diff=[e.start[0]-i[0].pageX,e.start[1]-i[0].pageY],Math.abs(e.diff[0])>e.rvs.o.swipe.deadzone&&t.preventDefault())},e.RVSliderItems.prototype.onTouchEnd=function(t){var e=t.data.self;e.$.stage.off("touchmove.rvs touchend.rvs"),Math.abs(e.diff[0])>e.width*e.rvs.o.swipe.items&&(e.diff[0]>0?e.rvs.setActive(e.rvs.index+1):0>e.diff[0]&&e.rvs.setActive(e.rvs.index-1)),e.diff=[0,0],e.start=[0,0],e.touched=!1}}(jQuery,window.FooPlugins=window.FooPlugins||{}),function(t,e){e.RVSliderNav=function(t){if(!(this instanceof e.RVSliderNav))return new e.RVSliderNav(t);this.rvs=t;var i=this;this.$={container:i.rvs.$.el.find(".rvs-nav-container"),stage:i.rvs.$.el.find(".rvs-nav-stage").on("touchstart.rvs",{self:i},i.onTouchStart).on("DOMMouseScroll.rvs mousewheel.rvs",{self:i},i.onMouseWheel),items:i.rvs.$.el.find(".rvs-nav-item").on("click.rvs",{self:i},i.onItemClick),prev:i.rvs.$.el.find(".rvs-nav-prev").on("click.rvs",{self:i},i.onPrevClick),next:i.rvs.$.el.find(".rvs-nav-next").on("click.rvs",{self:i},i.onNextClick)},this.horizontal=i.rvs.$.el.hasClass("rvs-horizontal"),this.thumbPlay=i.rvs.$.el.hasClass("rvs-thumb-play"),this.touchable="ontouchstart"in document.documentElement,this.count=i.$.items.length,this.touched=!1,this.start=[0,0],this.diff=[0,0],this.height=0,this.width=0,this.visible={max:0,first:0,last:0}},e.RVSliderNav.prototype.destroy=function(){this.$.stage.off("touchstart.rvs",this.onTouchStart).off("touchmove.rvs",this.onTouchMove).off("touchend.rvs",this.onTouchEnd).off("DOMMouseScroll.rvs mousewheel.rvs",this.onMouseWheel),this.$.items.off("click.rvs",this.onItemClick),this.$.prev.off("click.rvs",this.onPrevClick),this.$.next.off("click.rvs",this.onNextClick),this.$.stage.css({width:"",transform:""}),this.$.items.css({width:"",left:""}).removeClass("rvs-active")},e.RVSliderNav.prototype.resize=function(){var e=this;e.horizontal?(e.visible.max=e.rvs.breakpoint[2],e.width=Math.floor(e.rvs.items.width/e.visible.max)+1,e.$.stage.css("width",e.width*e.count),e.$.items.each(function(i){t(this).css({width:e.width,left:i*e.width})})):(e.height=e.$.items.first().outerHeight(),e.visible.max=Math.ceil(e.rvs.items.height/e.height)),e.setVisible(e.visible.first)},e.RVSliderNav.prototype.setVisible=function(t,e){if(t=0>t?0:t>=this.count?this.count-1:t,e&&(t-=this.visible.max-1),t>=0&&t+(this.visible.max-1)<this.count){var i=this.horizontal?"translateX(-"+(t*this.width+1)+"px) translateY(-1px)":"translateX(0px) translateY(-"+(t*this.height+1)+"px)";this.$.stage.css("transform",i),this.visible.first=t,this.visible.last=t+(this.visible.max-1)}this.touchable||0==this.visible.first?this.$.prev.detach():0==this.$.prev.parent().length&&this.$.container.prepend(this.$.prev),this.touchable||this.visible.last==this.count-1||this.visible.max>this.count-1?this.$.next.detach():0==this.$.next.parent().length&&this.$.container.append(this.$.next)},e.RVSliderNav.prototype.setActive=function(t){t>=0&&this.count>t&&(this.$.items.removeClass("rvs-active").eq(t).addClass("rvs-active"),this.visible.first>=t?this.setVisible(t-1):t>=this.visible.last&&this.setVisible(t+1,!0))},e.RVSliderNav.prototype.onItemClick=function(e){e.preventDefault();var i=e.data.self,s=t(this),o=s.find(".rvs-nav-item-thumb");i.rvs.setActive(s.index()),i.thumbPlay&&o.length&&(o.is(e.target)||t.contains(o[0],e.target))&&i.rvs.player.toggle()},e.RVSliderNav.prototype.onPrevClick=function(t){t.preventDefault(),t.data.self.setVisible(t.data.self.visible.first-Math.floor(t.data.self.visible.max/2))},e.RVSliderNav.prototype.onNextClick=function(t){t.preventDefault(),t.data.self.setVisible(t.data.self.visible.last+Math.floor(t.data.self.visible.max/2),!0)},e.RVSliderNav.prototype.onMouseWheel=function(t){t.preventDefault(),t.originalEvent.wheelDelta>0||0>t.originalEvent.detail?t.data.self.setVisible(t.data.self.visible.first-1):t.data.self.setVisible(t.data.self.visible.first+1)},e.RVSliderNav.prototype.onTouchStart=function(t){var e=t.data.self,i=t.originalEvent.touches||t.touches;i.length==e.rvs.o.swipe.touches&&(e.touched=!0,e.start=[i[0].pageX,i[0].pageY],e.$.stage.on("touchmove.rvs",{self:e},e.onTouchMove).on("touchend.rvs",{self:e},e.onTouchEnd))},e.RVSliderNav.prototype.onTouchMove=function(t){var e=t.data.self,i=t.originalEvent.touches||t.touches;e.touched&&i.length==e.rvs.o.swipe.touches&&(e.diff=[e.start[0]-i[0].pageX,e.start[1]-i[0].pageY],this.horizontal||t.preventDefault())},e.RVSliderNav.prototype.onTouchEnd=function(t){var e=t.data.self,i=Math.abs(e.diff[0]),s=Math.abs(e.diff[1]);e.$.stage.off("touchmove.rvs touchend.rvs"),e.horizontal?i>e.width*e.rvs.o.swipe.nav&&(e.diff[0]>0?e.setVisible(e.visible.last+Math.ceil(i/e.width),!0):0>e.diff[0]&&e.setVisible(e.visible.first-Math.ceil(i/e.width))):s>=e.height*e.rvs.o.swipe.nav&&(e.diff[1]>0?e.setVisible(e.visible.last+Math.ceil(s/e.width),!0):0>e.diff[1]&&e.setVisible(e.visible.first-Math.ceil(s/e.width))),e.diff=[0,0],e.start=[0,0],e.touched=!1}}(jQuery,window.FooPlugins=window.FooPlugins||{}),function(t,e){e.RVSliderVideoUrl=function(t){if(!(this instanceof e.RVSliderVideoUrl))return new e.RVSliderVideoUrl(t);var i=t.split("#");this.hash=2==i.length?"#"+i[1]:"",i=i[0].split("?"),this.url=i[0];var s=this.url.match(/.*\/(.*)$/);this.id=s&&s.length>=2?s[1]:null,this.protocol="https"==t.substring(0,5)?"https:":"http:",this.params=[];for(var o,r=(2==i.length?i[1]:"").split(/[&;]/g),a=0,n=r.length;n>a;a++)o=r[a].split("="),2==o.length&&this.params.push({key:decodeURIComponent(o[0]),value:decodeURIComponent(o[1])});this.mimeTypes={"video/youtube":/(www.)?youtube|youtu\.be/i,"video/vimeo":/(player.)?vimeo\.com/i,"video/wistia":/(.+)?(wistia\.(com|net)|wi\.st)\/.*/i,"video/daily":/(www.)?dailymotion\.com|dai\.ly/i,"video/mp4":/\.mp4/i,"video/webm":/\.webm/i,"video/wmv":/\.wmv/i,"video/ogg":/\.ogv/i},this.mimeType=null;for(var l in this.mimeTypes)this.mimeTypes.hasOwnProperty(l)&&this.mimeTypes[l].test(t)&&(this.mimeType=l);if("video/youtube"==this.mimeType)this.id=/embed\//i.test(this.url)?this.url.split(/embed\//i)[1].split(/[?&]/)[0]:t.split(/v\/|v=|youtu\.be\//i)[1].split(/[?&]/)[0],this.url=this.protocol+"//www.youtube.com/embed/"+this.id,this.param("autoplay","1"),this.param("modestbranding","1"),this.param("rel","0"),this.param("wmode","transparent"),this.param("showinfo","0");else if("video/vimeo"==this.mimeType)this.id=this.url.substr(this.url.lastIndexOf("/")+1),this.url=this.protocol+"//player.vimeo.com/video/"+this.id,this.param("autoplay","1"),this.param("badge","0"),this.param("portrait","0");else if("video/wistia"==this.mimeType){this.id=/embed\//i.test(this.url)?this.url.split(/embed\/.*?\//i)[1].split(/[?&]/)[0]:this.url.split(/medias\//)[1].split(/[?&]/)[0];var h=/playlists\//i.test(this.url);this.url=this.protocol+"//fast.wistia.net/embed/"+(h?"playlists":"iframe")+"/"+this.id,h?this.param("media_0_0[autoPlay]","1"):this.param("autoPlay","1"),this.param("theme","")}else"video/daily"==this.mimeType&&(this.id=/\/video\//i.test(this.url)?this.url.split(/\/video\//i)[1].split(/[?&]/)[0].split(/[_]/)[0]:t.split(/dai\.ly/i)[1].split(/[?&]/)[0],this.url=this.protocol+"//www.dailymotion.com/embed/video/"+this.id,this.param("autoplay","1"),this.param("wmode","opaque"),this.param("info","0"),this.param("logo","0"),this.param("related","0"))},e.RVSliderVideoUrl.prototype.param=function(t,e){for(var i=e===void 0,s="string"==typeof e&&""===e,o=this.params.length;o-->0;)if(this.params[o].key==t)return i?this.params[o].value:(s?this.params.splice(o,1):this.params[o].value=e,void 0);i||s||this.params.push({key:t,value:e})},e.RVSliderVideoUrl.prototype.toString=function(){for(var t=this.params.length>0?"?":"",e=0,i=this.params.length;i>e;e++)0!=e&&(t+="&"),t+=encodeURIComponent(this.params[e].key)+"="+encodeURIComponent(this.params[e].value);return this.url+t+this.hash}}(jQuery,window.FooPlugins=window.FooPlugins||{}),function(t,e){e.RVSliderPlayer=function(i){if(!(this instanceof e.RVSliderPlayer))return new e.RVSliderPlayer(i);var s=this;this.rvs=i,this.rvs.items.$.stage.on("click.rvs",".rvs-play-video",{self:s},s.onPlayClick),this.$={container:t("<div/>",{"class":"rvs-player"}),close:t("<a/>",{"class":"rvs-close"}).on("click.rvs",{self:s},s.onCloseClick),iframe:null},this.$.close.appendTo(s.$.container),this.continuousPlay=s.rvs.$.el.hasClass("rvs-continuous-play"),this.attached=!1,this.mejs=new e.RVSliderMediaElement(i,this)},e.RVSliderPlayer.prototype.destroy=function(){this.rvs.items.$.stage.off("click.rvs",".rvs-play-video",self.onPlayClick),this.rvs.items.$.items.add(this.rvs.nav.$.items).removeClass("rvs-video-active"),this.$.close.off("click.rvs",self.onCloseClick),this.$.container.remove()},e.RVSliderPlayer.prototype._parse=function(i){if("string"==typeof i){i=i.split(",");for(var s=0,o=i.length;o>s;s++)i[s]=new e.RVSliderVideoUrl(t.trim(i[s]));return i}return[]},e.RVSliderPlayer.prototype._play=function(e){this.$.player=t("<iframe/>",{src:e,frameborder:"no",width:this.rvs.items.width,height:this.rvs.items.height,webkitallowfullscreen:!0,mozallowfullscreen:!0,allowfullscreen:!0}).css({width:"100%",height:"100%"}),this.$.container.append(this.$.player).appendTo(this.rvs.items.$.items.filter(".rvs-active"))},e.RVSliderPlayer.prototype.setActive=function(t){!this.continuousPlay&&this.rvs.index!=t&&this.attached&&this.close()},e.RVSliderPlayer.prototype.play=function(t,e){t.length&&(this.attached&&this.close(),this.mejs.handles(t)?this.mejs.play(t,e):this._play(t[0]),this.rvs.items.$.items.add(this.rvs.nav.$.items).filter(".rvs-active").addClass("rvs-video-active"),this.attached=!0)},e.RVSliderPlayer.prototype.close=function(){this.attached&&(this.$.close.detach(),this.$.container.empty().detach(),this.$.close.appendTo(this.$.container),this.rvs.items.$.items.add(this.rvs.nav.$.items).removeClass("rvs-video-active"),this.attached=!1)},e.RVSliderPlayer.prototype.toggle=function(){var t=this.rvs.items.$.items.filter(".rvs-active"),e=t.find(".rvs-play-video");t.length&&!t.hasClass("rvs-video-active")?this.play(this._parse(e.attr("href")),e.data("options")||{}):this.close()},e.RVSliderPlayer.prototype.onPlayClick=function(e){e.preventDefault();var i=t(this),s=e.data.self;s.play(s._parse(i.attr("href")),i.data("options")||{})},e.RVSliderPlayer.prototype.onCloseClick=function(t){t.preventDefault(),t.data.self.close()}}(jQuery,window.FooPlugins=window.FooPlugins||{}),function(t,e){e.RVSliderMediaElement=function(t,i){return this instanceof e.RVSliderMediaElement?(this.rvs=t,this.player=i,this.enabled="MediaElementPlayer"in window&&this.rvs.o.mejs.enabled,void 0):new e.RVSliderMediaElement(t,i)},e.RVSliderMediaElement.prototype.handles=function(t){for(var e=0,i=t.length;i>e;e++)if(this.enabled&&(this.rvs.o.mejs.youtube||"video/youtube"!==t[e].mimeType)&&(this.rvs.o.mejs.vimeo||"video/vimeo"!==t[e].mimeType)&&"video/wistia"!==t[e].mimeType&&"video/daily"!==t[e].mimeType)return!0;return!1},e.RVSliderMediaElement.prototype.play=function(e,i){this.player.$.player=t("<video/>",{width:this.rvs.items.width,height:this.rvs.items.height,controls:!0,preload:"none"}).css({width:"100%",height:"100%"});for(var s=0,o=e.length;o>s;s++)!this.enabled||!this.rvs.o.mejs.youtube&&"video/youtube"===e[s].mimeType||!this.rvs.o.mejs.vimeo&&"video/vimeo"===e[s].mimeType||"video/wistia"===e[s].mimeType||"video/daily"===e[s].mimeType||this.player.$.player.append(t("<source/>",{type:e[s].mimeType,src:e[s]}));if(this.player.$.player.find("source").length>0){this.player.$.container.append(this.player.$.player).appendTo(this.rvs.items.$.items.filter(".rvs-active").addClass("rvs-video-active"));var r=this;this.player.$.player.mediaelementplayer(t.extend(!0,{},this.o,i,{videoWidth:this.rvs.items.width,videoHeight:this.rvs.items.height,success:function(e,s){function o(){e.play(),e.removeEventListener("canplay",o,!1)}function r(){e.removeEventListener("canplay",o,!1),e.removeEventListener("playing",r,!1)}e.addEventListener("canplay",o,!1),e.addEventListener("playing",r,!1),e.load(),e.play(),t.isFunction(i.success)&&i.success(e,s)},error:function(s,o,a,n,l){console.log("The video "+e+" is not supported.",s,o,a,n,l),r.player.close(),t.isFunction(i.error)&&i.error(s)}}))}}}(jQuery,window.FooPlugins=window.FooPlugins||{});

/**
 * Small ready function to circumvent external errors blocking jQuery's ready.
 * @param {Function} func - The function to call when the document is ready.
 * @see http://www.dustindiaz.com/smallest-domready-ever
 */
function FooGallery_Video_Ready(func) {
    /in/.test(document.readyState) ? setTimeout('FooGallery_Video_Ready(' + func + ')', 9) : func()
}

FooGallery_Video_Ready(function () {
    jQuery(".rvs-container").rvslider();
});
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).rexdragrotateplugin=e()}(this,function(){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function t(t,e,i){return e&&s(t.prototype,e),i&&s(t,i),t}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(n){var s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=r(n);if(s){var i=r(this).constructor;t=Reflect.construct(e,arguments,i)}else t=e.apply(this,arguments);return h(this,t)}}var e={setEventEmitter:function(t,e){return void 0===e&&(e=Phaser.Events.EventEmitter),this._privateEE=void 0===t,this._eventEmitter=this._privateEE?new e:t,this},destroyEventEmitter:function(){return this._eventEmitter&&this._privateEE&&this._eventEmitter.shutdown(),this},getEventEmitter:function(){return this._eventEmitter},on:function(){return this._eventEmitter&&this._eventEmitter.on.apply(this._eventEmitter,arguments),this},once:function(){return this._eventEmitter&&this._eventEmitter.once.apply(this._eventEmitter,arguments),this},off:function(){return this._eventEmitter&&this._eventEmitter.off.apply(this._eventEmitter,arguments),this},emit:function(t){return this._eventEmitter&&t&&this._eventEmitter.emit.apply(this._eventEmitter,arguments),this},addListener:function(){return this._eventEmitter&&this._eventEmitter.addListener.apply(this._eventEmitter,arguments),this},removeListener:function(){return this._eventEmitter&&this._eventEmitter.removeListener.apply(this._eventEmitter,arguments),this},removeAllListeners:function(){return this._eventEmitter&&this._eventEmitter.removeAllListeners.apply(this._eventEmitter,arguments),this},listenerCount:function(){return this._eventEmitter?this._eventEmitter.listenerCount.apply(this._eventEmitter,arguments):0},listeners:function(){return this._eventEmitter?this._eventEmitter.listeners.apply(this._eventEmitter,arguments):[]}},u=Phaser.Utils.Objects.GetValue,c=Phaser.Math.Distance.Between,f=Phaser.Math.Angle.Between,l=Phaser.Math.Angle.Wrap,v=Phaser.Math.RadToDeg,d=function(){function i(t,e){n(this,i),this.scene=t,this.setEventEmitter(u(e,"eventEmitter",void 0)),this._enable=void 0,this._deltaRotation=void 0,this.resetFromJSON(e),this.boot()}return t(i,[{key:"resetFromJSON",value:function(t){this.pointer=void 0,this.setEnable(u(t,"enable",!0)),this.setOrigin(t),this.setRadius(u(t,"maxRadius",100),u(t,"minRadius",0)),this.state=p}},{key:"boot",value:function(){this.scene.input.on("pointerdown",this.onPointerDown,this),this.scene.input.on("pointerup",this.onPointerUp,this),this.scene.input.on("pointermove",this.onPointerMove,this),this.scene.events.once("shutdown",this.destroy,this)}},{key:"shutdown",value:function(){this.destroyEventEmitter(),this.scene&&(this.scene.input.off("pointerdown",this.onPointerDown,this),this.scene.input.off("pointerup",this.onPointerUp,this),this.scene.input.off("pointermove",this.onPointerMove,this),this.scene.events.off("destroy",this.destroy,this)),this.scene=void 0}},{key:"destroy",value:function(){this.shutdown()}},{key:"setEnable",value:function(t){return void 0===t&&(t=!0),this.enable=t,this}},{key:"toggleEnable",value:function(){return this.setEnable(!this.enable),this}},{key:"setOrigin",value:function(t,e){if(void 0===e){var i=t;t=u(i,"x",0),e=u(i,"y",0)}return this.x=t,this.y=e,this}},{key:"setRadius",value:function(t,e){return void 0===e&&(e=0),this.maxRadius=t,this.minRadius=e,this}},{key:"contains",value:function(t,e){var i=c(this.x,this.y,t,e);return i>=this.minRadius&&i<=this.maxRadius}},{key:"onPointerDown",value:function(t){this.enable&&!this.pointer&&this.contains(t.worldX,t.worldY)&&(this.pointer=t,this.state=y,this.onDragStart(t))}},{key:"onPointerUp",value:function(t){this.enable&&this.pointer===t&&(this.pointer=void 0,this.state=p,this.onDragEnd())}},{key:"onPointerMove",value:function(t){if(this.enable&&t.isDown)switch(this.state){case p:this.contains(t.worldX,t.worldY)&&this.onDragStart(t);break;case y:this.contains(t.worldX,t.worldY)?this.onDrag():this.onDragEnd()}}},{key:"dragCancel",value:function(){return this.state===y&&this.onDragEnd(),this.pointer=void 0,this.state=p,this}},{key:"onDragStart",value:function(t){this.pointer=t,this.state=y,this._deltaRotation=void 0,this.emit("dragstart",this)}},{key:"onDragEnd",value:function(){this.pointer=void 0,this.state=p,this._deltaRotation=void 0,this.emit("dragend",this)}},{key:"onDrag",value:function(){this._deltaRotation=void 0,this.emit("drag",this)}},{key:"enable",get:function(){return this._enable},set:function(t){this._enable!==t&&(t||this.dragCancel(),this._enable=t)}},{key:"deltaRotation",get:function(){if(this.state===p)return 0;if(void 0===this._deltaRotation){var t=this.pointer.prevPosition,e=this.pointer.position,i=f(this.x,this.y,t.x,t.y),n=f(this.x,this.y,e.x,e.y);this._deltaRotation=l(n-i)}return this._deltaRotation}},{key:"deltaAngle",get:function(){return this.state===p?0:v(this.deltaRotation)}},{key:"cw",get:function(){return 0<=this.deltaRotation}},{key:"ccw",get:function(){return!this.cw}}]),i}();Object.assign(d.prototype,e);var p=0,y=1;return function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(i,Phaser.Plugins.BasePlugin);var e=a(i);function i(t){return n(this,i),e.call(this,t)}return t(i,[{key:"start",value:function(){this.game.events.on("destroy",this.destroy,this)}},{key:"add",value:function(t,e){return new d(t,e)}}]),i}()});
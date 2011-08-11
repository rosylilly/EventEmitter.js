(function(window, undefined){

function EventEmitter(){};

var eventToString = function(event)
{
  event = event.type || event;

  return event.toString();
};

EventEmitter.prototype.addEventListener = function(event, listener)
{
  if(!this._events) this._events = {};

  var eventName = eventToString(event);
  var listeners = this._events[eventName] || [];

  listeners.push(listener);

  this._events[eventName] = listeners;
};

EventEmitter.prototype.removeEventListener = function(event, listener)
{
  if(!this._events) this._events = {};

  var eventName = eventToString(event);
  var listeners = this._events[eventName] || [];

  for(var i = (listeners.length - 1); i >= 0; i--)
  {
    if(listeners[i] == listener)
    {
      listeners.splice(i, 1);
    };
  };

  this._events[eventName] = listeners;
};

EventEmitter.prototype.emit = function(event)
{
  if(!this._events) return false;

  var eventName = eventToString(event);
  var listeners = this._events[eventName] || [];
  var args = new Array(arguments.length);

  for(var i = 0, l = args.length; i < l; i++)
  {
    args[i] = arguments[i];
  };

  listeners = listeners.slice();
  for(var i = 0, l = listeners.length; i < l; i++)
  {
    (function(){
      var ii = i + 0;
      setTimeout(function(){ listeners[ii].call(null, args) }, 0);
    })();
  };
};

EventEmitter.extends = function(obj)
{
  for(var func in EventEmitter.prototype)
  {
    obj[func] = EventEmitter.prototype[func];
  };

  return obj;
};

window.EventEmitter = EventEmitter;
})(window);

#!/usr/bin/env node
"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var events=_interopDefault(require("events")),child_process=_interopDefault(require("child_process")),path=require("path"),path__default=_interopDefault(path),fs=require("fs"),fs__default=_interopDefault(fs),util=_interopDefault(require("util")),os=_interopDefault(require("os"));function createCommonjsModule(e,n){return e(n={exports:{}},n.exports),n.exports}var commander=createCommonjsModule(function(e,n){var t=events.EventEmitter,r=child_process.spawn,o=path__default.dirname,s=path__default.basename;function i(e,n){this.flags=e,this.required=e.indexOf("<")>=0,this.optional=e.indexOf("[")>=0,this.bool=-1===e.indexOf("-no-"),(e=e.split(/[ ,|]+/)).length>1&&!/^[[<]/.test(e[1])&&(this.short=e.shift()),this.long=e.shift(),this.description=n||""}function a(e){this.commands=[],this.options=[],this._execs={},this._allowUnknownOption=!1,this._args=[],this._name=e||""}function l(e,n){var t=Math.max(0,n-e.length);return e+Array(t+1).join(" ")}function c(e,n){n=n||[];for(var t=0;t<n.length;t++)"--help"!==n[t]&&"-h"!==n[t]||(e.outputHelp(),process.exit(0))}function u(e){var n=e.name+(!0===e.variadic?"...":"");return e.required?"<"+n+">":"["+n+"]"}function h(e){try{if(fs__default.statSync(e).isFile())return!0}catch(e){return!1}}util.inherits(a,t),(n=e.exports=new a).Command=a,n.Option=i,i.prototype.name=function(){return this.long.replace("--","").replace("no-","")},i.prototype.attributeName=function(){return this.name().split("-").reduce(function(e,n){return e+n[0].toUpperCase()+n.slice(1)})},i.prototype.is=function(e){return this.short===e||this.long===e},a.prototype.command=function(e,n,t){"object"==typeof n&&null!==n&&(t=n,n=null),t=t||{};var r=e.split(/ +/),o=new a(r.shift());return n&&(o.description(n),this.executables=!0,this._execs[o._name]=!0,t.isDefault&&(this.defaultExecutable=o._name)),o._noHelp=!!t.noHelp,this.commands.push(o),o.parseExpectedArgs(r),o.parent=this,n?this:o},a.prototype.arguments=function(e){return this.parseExpectedArgs(e.split(/ +/))},a.prototype.addImplicitHelpCommand=function(){this.command("help [cmd]","display help for [cmd]")},a.prototype.parseExpectedArgs=function(e){if(e.length){var n=this;return e.forEach(function(e){var t={required:!1,name:"",variadic:!1};switch(e[0]){case"<":t.required=!0,t.name=e.slice(1,-1);break;case"[":t.name=e.slice(1,-1)}t.name.length>3&&"..."===t.name.slice(-3)&&(t.variadic=!0,t.name=t.name.slice(0,-3)),t.name&&n._args.push(t)}),this}},a.prototype.action=function(e){var n=this,t=function(t,r){t=t||[],r=r||[];var o=n.parseOptions(r);c(n,o.unknown),o.unknown.length>0&&n.unknownOption(o.unknown[0]),o.args.length&&(t=o.args.concat(t)),n._args.forEach(function(e,r){e.required&&null==t[r]?n.missingArgument(e.name):e.variadic&&(r!==n._args.length-1&&n.variadicArgNotLast(e.name),t[r]=t.splice(r))}),n._args.length?t[n._args.length]=n:t.push(n),e.apply(n,t)},r=this.parent||this,o=r===this?"*":this._name;return r.on("command:"+o,t),this._alias&&r.on("command:"+this._alias,t),this},a.prototype.option=function(e,n,t,r){var o=this,s=new i(e,n),a=s.name(),l=s.attributeName();if("function"!=typeof t)if(t instanceof RegExp){var c=t;t=function(e,n){var t=c.exec(e);return t?t[0]:n}}else r=t,t=null;return(!s.bool||s.optional||s.required)&&(s.bool||(r=!0),void 0!==r&&(o[l]=r,s.defaultValue=r)),this.options.push(s),this.on("option:"+a,function(e){null!==e&&t&&(e=t(e,void 0===o[l]?r:o[l])),"boolean"==typeof o[l]||void 0===o[l]?o[l]=null==e?!!s.bool&&(r||!0):e:null!==e&&(o[l]=e)}),this},a.prototype.allowUnknownOption=function(e){return this._allowUnknownOption=0===arguments.length||e,this},a.prototype.parse=function(e){this.executables&&this.addImplicitHelpCommand(),this.rawArgs=e,this._name=this._name||s(e[1],".js"),this.executables&&e.length<3&&!this.defaultExecutable&&e.push("--help");var n=this.parseOptions(this.normalize(e.slice(2))),t=this.args=n.args,r=this.parseArgs(this.args,n.unknown),o=r.args[0],i=null;return o&&(i=this.commands.filter(function(e){return e.alias()===o})[0]),this._execs[o]&&"function"!=typeof this._execs[o]?this.executeSubCommand(e,t,n.unknown):i?(t[0]=i._name,this.executeSubCommand(e,t,n.unknown)):this.defaultExecutable?(t.unshift(this.defaultExecutable),this.executeSubCommand(e,t,n.unknown)):r},a.prototype.executeSubCommand=function(e,n,t){(n=n.concat(t)).length||this.help(),"help"===n[0]&&1===n.length&&this.help(),"help"===n[0]&&(n[0]=n[1],n[1]="--help");var i,a=e[1],l=s(a,path__default.extname(a))+"-"+n[0],c=fs__default.lstatSync(a).isSymbolicLink()?fs__default.readlinkSync(a):a;c!==a&&"/"!==c.charAt(0)&&(c=path__default.join(o(a),c)),i=o(c);var u,p=path__default.join(i,l),g=!1;h(p+".js")?(l=p+".js",g=!0):h(p+".ts")?(l=p+".ts",g=!0):h(p)&&(l=p),n=n.slice(1),"win32"!==process.platform?g?(n.unshift(l),n=(process.execArgv||[]).concat(n),u=r(process.argv[0],n,{stdio:"inherit",customFds:[0,1,2]})):u=r(l,n,{stdio:"inherit",customFds:[0,1,2]}):(n.unshift(l),u=r(process.execPath,n,{stdio:"inherit"}));["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(function(e){process.on(e,function(){!1===u.killed&&null===u.exitCode&&u.kill(e)})}),u.on("close",process.exit.bind(process)),u.on("error",function(e){"ENOENT"===e.code?console.error("error: %s(1) does not exist, try --help",l):"EACCES"===e.code&&console.error("error: %s(1) not executable. try chmod or run with root",l),process.exit(1)}),this.runningCommand=u},a.prototype.normalize=function(e){for(var n,t,r,o=[],s=0,i=e.length;s<i;++s){if(n=e[s],s>0&&(t=this.optionFor(e[s-1])),"--"===n){o=o.concat(e.slice(s));break}t&&t.required?o.push(n):n.length>1&&"-"===n[0]&&"-"!==n[1]?n.slice(1).split("").forEach(function(e){o.push("-"+e)}):/^--/.test(n)&&~(r=n.indexOf("="))?o.push(n.slice(0,r),n.slice(r+1)):o.push(n)}return o},a.prototype.parseArgs=function(e,n){var t;return e.length?(t=e[0],this.listeners("command:"+t).length?this.emit("command:"+e.shift(),e,n):this.emit("command:*",e)):(c(this,n),n.length>0&&this.unknownOption(n[0]),0===this.commands.length&&0===this._args.filter(function(e){return e.required}).length&&this.emit("command:*")),this},a.prototype.optionFor=function(e){for(var n=0,t=this.options.length;n<t;++n)if(this.options[n].is(e))return this.options[n]},a.prototype.parseOptions=function(e){for(var n,t,r,o=[],s=e.length,i=[],a=0;a<s;++a)if(r=e[a],n)o.push(r);else if("--"!==r)if(t=this.optionFor(r))if(t.required){if(null==(r=e[++a]))return this.optionMissingArgument(t);this.emit("option:"+t.name(),r)}else t.optional?(null==(r=e[a+1])||"-"===r[0]&&"-"!==r?r=null:++a,this.emit("option:"+t.name(),r)):this.emit("option:"+t.name());else r.length>1&&"-"===r[0]?(i.push(r),a+1<e.length&&"-"!==e[a+1][0]&&i.push(e[++a])):o.push(r);else n=!0;return{args:o,unknown:i}},a.prototype.opts=function(){for(var e={},n=this.options.length,t=0;t<n;t++){var r=this.options[t].attributeName();e[r]=r===this._versionOptionName?this._version:this[r]}return e},a.prototype.missingArgument=function(e){console.error("error: missing required argument `%s'",e),process.exit(1)},a.prototype.optionMissingArgument=function(e,n){n?console.error("error: option `%s' argument missing, got `%s'",e.flags,n):console.error("error: option `%s' argument missing",e.flags),process.exit(1)},a.prototype.unknownOption=function(e){this._allowUnknownOption||(console.error("error: unknown option `%s'",e),process.exit(1))},a.prototype.variadicArgNotLast=function(e){console.error("error: variadic arguments must be last `%s'",e),process.exit(1)},a.prototype.version=function(e,n){if(0===arguments.length)return this._version;this._version=e;var t=new i(n=n||"-V, --version","output the version number");return this._versionOptionName=t.long.substr(2)||"version",this.options.push(t),this.on("option:"+this._versionOptionName,function(){process.stdout.write(e+"\n"),process.exit(0)}),this},a.prototype.description=function(e,n){return 0===arguments.length?this._description:(this._description=e,this._argsDescription=n,this)},a.prototype.alias=function(e){var n=this;if(0!==this.commands.length&&(n=this.commands[this.commands.length-1]),0===arguments.length)return n._alias;if(e===n._name)throw new Error("Command alias can't be the same as its name");return n._alias=e,this},a.prototype.usage=function(e){var n=this._args.map(function(e){return u(e)}),t="[options]"+(this.commands.length?" [command]":"")+(this._args.length?" "+n.join(" "):"");return 0===arguments.length?this._usage||t:(this._usage=e,this)},a.prototype.name=function(e){return 0===arguments.length?this._name:(this._name=e,this)},a.prototype.prepareCommands=function(){return this.commands.filter(function(e){return!e._noHelp}).map(function(e){var n=e._args.map(function(e){return u(e)}).join(" ");return[e._name+(e._alias?"|"+e._alias:"")+(e.options.length?" [options]":"")+(n?" "+n:""),e._description]})},a.prototype.largestCommandLength=function(){return this.prepareCommands().reduce(function(e,n){return Math.max(e,n[0].length)},0)},a.prototype.largestOptionLength=function(){var e=[].slice.call(this.options);return e.push({flags:"-h, --help"}),e.reduce(function(e,n){return Math.max(e,n.flags.length)},0)},a.prototype.largestArgLength=function(){return this._args.reduce(function(e,n){return Math.max(e,n.name.length)},0)},a.prototype.padWidth=function(){var e=this.largestOptionLength();return this._argsDescription&&this._args.length&&this.largestArgLength()>e&&(e=this.largestArgLength()),this.commands&&this.commands.length&&this.largestCommandLength()>e&&(e=this.largestCommandLength()),e},a.prototype.optionHelp=function(){var e=this.padWidth();return this.options.map(function(n){return l(n.flags,e)+"  "+n.description+(n.bool&&void 0!==n.defaultValue?" (default: "+JSON.stringify(n.defaultValue)+")":"")}).concat([l("-h, --help",e)+"  output usage information"]).join("\n")},a.prototype.commandHelp=function(){if(!this.commands.length)return"";var e=this.prepareCommands(),n=this.padWidth();return["Commands:",e.map(function(e){var t=e[1]?"  "+e[1]:"";return(t?l(e[0],n):e[0])+t}).join("\n").replace(/^/gm,"  "),""].join("\n")},a.prototype.helpInformation=function(){var e=[];if(this._description){e=[this._description,""];var n=this._argsDescription;if(n&&this._args.length){var t=this.padWidth();e.push("Arguments:"),e.push(""),this._args.forEach(function(r){e.push("  "+l(r.name,t)+"  "+n[r.name])}),e.push("")}}var r=this._name;this._alias&&(r=r+"|"+this._alias);var o=["Usage: "+r+" "+this.usage(),""],s=[],i=this.commandHelp();i&&(s=[i]);var a=["Options:",""+this.optionHelp().replace(/^/gm,"  "),""];return o.concat(e).concat(a).concat(s).join("\n")},a.prototype.outputHelp=function(e){e||(e=function(e){return e}),process.stdout.write(e(this.helpInformation())),this.emit("--help")},a.prototype.help=function(e){this.outputHelp(e),process.exit()}}),commander_1=commander.Command,commander_2=commander.Option,matchOperatorsRe=/[|\\{}()[\]^$+*?.]/g,escapeStringRegexp=function(e){if("string"!=typeof e)throw new TypeError("Expected a string");return e.replace(matchOperatorsRe,"\\$&")},colorName={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},conversions=createCommonjsModule(function(e){var n={};for(var t in colorName)colorName.hasOwnProperty(t)&&(n[colorName[t]]=t);var r=e.exports={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};for(var o in r)if(r.hasOwnProperty(o)){if(!("channels"in r[o]))throw new Error("missing channels property: "+o);if(!("labels"in r[o]))throw new Error("missing channel labels property: "+o);if(r[o].labels.length!==r[o].channels)throw new Error("channel and label counts mismatch: "+o);var s=r[o].channels,i=r[o].labels;delete r[o].channels,delete r[o].labels,Object.defineProperty(r[o],"channels",{value:s}),Object.defineProperty(r[o],"labels",{value:i})}r.rgb.hsl=function(e){var n,t,r=e[0]/255,o=e[1]/255,s=e[2]/255,i=Math.min(r,o,s),a=Math.max(r,o,s),l=a-i;return a===i?n=0:r===a?n=(o-s)/l:o===a?n=2+(s-r)/l:s===a&&(n=4+(r-o)/l),(n=Math.min(60*n,360))<0&&(n+=360),t=(i+a)/2,[n,100*(a===i?0:t<=.5?l/(a+i):l/(2-a-i)),100*t]},r.rgb.hsv=function(e){var n,t,r,o,s,i=e[0]/255,a=e[1]/255,l=e[2]/255,c=Math.max(i,a,l),u=c-Math.min(i,a,l),h=function(e){return(c-e)/6/u+.5};return 0===u?o=s=0:(s=u/c,n=h(i),t=h(a),r=h(l),i===c?o=r-t:a===c?o=1/3+n-r:l===c&&(o=2/3+t-n),o<0?o+=1:o>1&&(o-=1)),[360*o,100*s,100*c]},r.rgb.hwb=function(e){var n=e[0],t=e[1],o=e[2];return[r.rgb.hsl(e)[0],100*(1/255*Math.min(n,Math.min(t,o))),100*(o=1-1/255*Math.max(n,Math.max(t,o)))]},r.rgb.cmyk=function(e){var n,t=e[0]/255,r=e[1]/255,o=e[2]/255;return[100*((1-t-(n=Math.min(1-t,1-r,1-o)))/(1-n)||0),100*((1-r-n)/(1-n)||0),100*((1-o-n)/(1-n)||0),100*n]},r.rgb.keyword=function(e){var t=n[e];if(t)return t;var r,o,s,i=1/0;for(var a in colorName)if(colorName.hasOwnProperty(a)){var l=colorName[a],c=(o=e,s=l,Math.pow(o[0]-s[0],2)+Math.pow(o[1]-s[1],2)+Math.pow(o[2]-s[2],2));c<i&&(i=c,r=a)}return r},r.keyword.rgb=function(e){return colorName[e]},r.rgb.xyz=function(e){var n=e[0]/255,t=e[1]/255,r=e[2]/255;return[100*(.4124*(n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92)+.3576*(t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92)+.1805*(r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92)),100*(.2126*n+.7152*t+.0722*r),100*(.0193*n+.1192*t+.9505*r)]},r.rgb.lab=function(e){var n=r.rgb.xyz(e),t=n[0],o=n[1],s=n[2];return o/=100,s/=108.883,t=(t/=95.047)>.008856?Math.pow(t,1/3):7.787*t+16/116,[116*(o=o>.008856?Math.pow(o,1/3):7.787*o+16/116)-16,500*(t-o),200*(o-(s=s>.008856?Math.pow(s,1/3):7.787*s+16/116))]},r.hsl.rgb=function(e){var n,t,r,o,s,i=e[0]/360,a=e[1]/100,l=e[2]/100;if(0===a)return[s=255*l,s,s];n=2*l-(t=l<.5?l*(1+a):l+a-l*a),o=[0,0,0];for(var c=0;c<3;c++)(r=i+1/3*-(c-1))<0&&r++,r>1&&r--,s=6*r<1?n+6*(t-n)*r:2*r<1?t:3*r<2?n+(t-n)*(2/3-r)*6:n,o[c]=255*s;return o},r.hsl.hsv=function(e){var n=e[0],t=e[1]/100,r=e[2]/100,o=t,s=Math.max(r,.01);return t*=(r*=2)<=1?r:2-r,o*=s<=1?s:2-s,[n,100*(0===r?2*o/(s+o):2*t/(r+t)),100*((r+t)/2)]},r.hsv.rgb=function(e){var n=e[0]/60,t=e[1]/100,r=e[2]/100,o=Math.floor(n)%6,s=n-Math.floor(n),i=255*r*(1-t),a=255*r*(1-t*s),l=255*r*(1-t*(1-s));switch(r*=255,o){case 0:return[r,l,i];case 1:return[a,r,i];case 2:return[i,r,l];case 3:return[i,a,r];case 4:return[l,i,r];case 5:return[r,i,a]}},r.hsv.hsl=function(e){var n,t,r,o=e[0],s=e[1]/100,i=e[2]/100,a=Math.max(i,.01);return r=(2-s)*i,t=s*a,[o,100*(t=(t/=(n=(2-s)*a)<=1?n:2-n)||0),100*(r/=2)]},r.hwb.rgb=function(e){var n,t,r,o,s,i,a,l=e[0]/360,c=e[1]/100,u=e[2]/100,h=c+u;switch(h>1&&(c/=h,u/=h),r=6*l-(n=Math.floor(6*l)),0!=(1&n)&&(r=1-r),o=c+r*((t=1-u)-c),n){default:case 6:case 0:s=t,i=o,a=c;break;case 1:s=o,i=t,a=c;break;case 2:s=c,i=t,a=o;break;case 3:s=c,i=o,a=t;break;case 4:s=o,i=c,a=t;break;case 5:s=t,i=c,a=o}return[255*s,255*i,255*a]},r.cmyk.rgb=function(e){var n=e[0]/100,t=e[1]/100,r=e[2]/100,o=e[3]/100;return[255*(1-Math.min(1,n*(1-o)+o)),255*(1-Math.min(1,t*(1-o)+o)),255*(1-Math.min(1,r*(1-o)+o))]},r.xyz.rgb=function(e){var n,t,r,o=e[0]/100,s=e[1]/100,i=e[2]/100;return t=-.9689*o+1.8758*s+.0415*i,r=.0557*o+-.204*s+1.057*i,n=(n=3.2406*o+-1.5372*s+-.4986*i)>.0031308?1.055*Math.pow(n,1/2.4)-.055:12.92*n,t=t>.0031308?1.055*Math.pow(t,1/2.4)-.055:12.92*t,r=r>.0031308?1.055*Math.pow(r,1/2.4)-.055:12.92*r,[255*(n=Math.min(Math.max(0,n),1)),255*(t=Math.min(Math.max(0,t),1)),255*(r=Math.min(Math.max(0,r),1))]},r.xyz.lab=function(e){var n=e[0],t=e[1],r=e[2];return t/=100,r/=108.883,n=(n/=95.047)>.008856?Math.pow(n,1/3):7.787*n+16/116,[116*(t=t>.008856?Math.pow(t,1/3):7.787*t+16/116)-16,500*(n-t),200*(t-(r=r>.008856?Math.pow(r,1/3):7.787*r+16/116))]},r.lab.xyz=function(e){var n,t,r,o=e[0];n=e[1]/500+(t=(o+16)/116),r=t-e[2]/200;var s=Math.pow(t,3),i=Math.pow(n,3),a=Math.pow(r,3);return t=s>.008856?s:(t-16/116)/7.787,n=i>.008856?i:(n-16/116)/7.787,r=a>.008856?a:(r-16/116)/7.787,[n*=95.047,t*=100,r*=108.883]},r.lab.lch=function(e){var n,t=e[0],r=e[1],o=e[2];return(n=360*Math.atan2(o,r)/2/Math.PI)<0&&(n+=360),[t,Math.sqrt(r*r+o*o),n]},r.lch.lab=function(e){var n,t=e[0],r=e[1];return n=e[2]/360*2*Math.PI,[t,r*Math.cos(n),r*Math.sin(n)]},r.rgb.ansi16=function(e){var n=e[0],t=e[1],o=e[2],s=1 in arguments?arguments[1]:r.rgb.hsv(e)[2];if(0===(s=Math.round(s/50)))return 30;var i=30+(Math.round(o/255)<<2|Math.round(t/255)<<1|Math.round(n/255));return 2===s&&(i+=60),i},r.hsv.ansi16=function(e){return r.rgb.ansi16(r.hsv.rgb(e),e[2])},r.rgb.ansi256=function(e){var n=e[0],t=e[1],r=e[2];return n===t&&t===r?n<8?16:n>248?231:Math.round((n-8)/247*24)+232:16+36*Math.round(n/255*5)+6*Math.round(t/255*5)+Math.round(r/255*5)},r.ansi16.rgb=function(e){var n=e%10;if(0===n||7===n)return e>50&&(n+=3.5),[n=n/10.5*255,n,n];var t=.5*(1+~~(e>50));return[(1&n)*t*255,(n>>1&1)*t*255,(n>>2&1)*t*255]},r.ansi256.rgb=function(e){if(e>=232){var n=10*(e-232)+8;return[n,n,n]}var t;return e-=16,[Math.floor(e/36)/5*255,Math.floor((t=e%36)/6)/5*255,t%6/5*255]},r.rgb.hex=function(e){var n=(((255&Math.round(e[0]))<<16)+((255&Math.round(e[1]))<<8)+(255&Math.round(e[2]))).toString(16).toUpperCase();return"000000".substring(n.length)+n},r.hex.rgb=function(e){var n=e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!n)return[0,0,0];var t=n[0];3===n[0].length&&(t=t.split("").map(function(e){return e+e}).join(""));var r=parseInt(t,16);return[r>>16&255,r>>8&255,255&r]},r.rgb.hcg=function(e){var n,t=e[0]/255,r=e[1]/255,o=e[2]/255,s=Math.max(Math.max(t,r),o),i=Math.min(Math.min(t,r),o),a=s-i;return n=a<=0?0:s===t?(r-o)/a%6:s===r?2+(o-t)/a:4+(t-r)/a+4,n/=6,[360*(n%=1),100*a,100*(a<1?i/(1-a):0)]},r.hsl.hcg=function(e){var n=e[1]/100,t=e[2]/100,r=1,o=0;return(r=t<.5?2*n*t:2*n*(1-t))<1&&(o=(t-.5*r)/(1-r)),[e[0],100*r,100*o]},r.hsv.hcg=function(e){var n=e[1]/100,t=e[2]/100,r=n*t,o=0;return r<1&&(o=(t-r)/(1-r)),[e[0],100*r,100*o]},r.hcg.rgb=function(e){var n=e[0]/360,t=e[1]/100,r=e[2]/100;if(0===t)return[255*r,255*r,255*r];var o,s=[0,0,0],i=n%1*6,a=i%1,l=1-a;switch(Math.floor(i)){case 0:s[0]=1,s[1]=a,s[2]=0;break;case 1:s[0]=l,s[1]=1,s[2]=0;break;case 2:s[0]=0,s[1]=1,s[2]=a;break;case 3:s[0]=0,s[1]=l,s[2]=1;break;case 4:s[0]=a,s[1]=0,s[2]=1;break;default:s[0]=1,s[1]=0,s[2]=l}return o=(1-t)*r,[255*(t*s[0]+o),255*(t*s[1]+o),255*(t*s[2]+o)]},r.hcg.hsv=function(e){var n=e[1]/100,t=n+e[2]/100*(1-n),r=0;return t>0&&(r=n/t),[e[0],100*r,100*t]},r.hcg.hsl=function(e){var n=e[1]/100,t=e[2]/100*(1-n)+.5*n,r=0;return t>0&&t<.5?r=n/(2*t):t>=.5&&t<1&&(r=n/(2*(1-t))),[e[0],100*r,100*t]},r.hcg.hwb=function(e){var n=e[1]/100,t=n+e[2]/100*(1-n);return[e[0],100*(t-n),100*(1-t)]},r.hwb.hcg=function(e){var n=e[1]/100,t=1-e[2]/100,r=t-n,o=0;return r<1&&(o=(t-r)/(1-r)),[e[0],100*r,100*o]},r.apple.rgb=function(e){return[e[0]/65535*255,e[1]/65535*255,e[2]/65535*255]},r.rgb.apple=function(e){return[e[0]/255*65535,e[1]/255*65535,e[2]/255*65535]},r.gray.rgb=function(e){return[e[0]/100*255,e[0]/100*255,e[0]/100*255]},r.gray.hsl=r.gray.hsv=function(e){return[0,0,e[0]]},r.gray.hwb=function(e){return[0,100,e[0]]},r.gray.cmyk=function(e){return[0,0,0,e[0]]},r.gray.lab=function(e){return[e[0],0,0]},r.gray.hex=function(e){var n=255&Math.round(e[0]/100*255),t=((n<<16)+(n<<8)+n).toString(16).toUpperCase();return"000000".substring(t.length)+t},r.rgb.gray=function(e){return[(e[0]+e[1]+e[2])/3/255*100]}}),conversions_1=conversions.rgb,conversions_2=conversions.hsl,conversions_3=conversions.hsv,conversions_4=conversions.hwb,conversions_5=conversions.cmyk,conversions_6=conversions.xyz,conversions_7=conversions.lab,conversions_8=conversions.lch,conversions_9=conversions.hex,conversions_10=conversions.keyword,conversions_11=conversions.ansi16,conversions_12=conversions.ansi256,conversions_13=conversions.hcg,conversions_14=conversions.apple,conversions_15=conversions.gray;function buildGraph(){for(var e={},n=Object.keys(conversions),t=n.length,r=0;r<t;r++)e[n[r]]={distance:-1,parent:null};return e}function deriveBFS(e){var n=buildGraph(),t=[e];for(n[e].distance=0;t.length;)for(var r=t.pop(),o=Object.keys(conversions[r]),s=o.length,i=0;i<s;i++){var a=o[i],l=n[a];-1===l.distance&&(l.distance=n[r].distance+1,l.parent=r,t.unshift(a))}return n}function link(e,n){return function(t){return n(e(t))}}function wrapConversion(e,n){for(var t=[n[e].parent,e],r=conversions[n[e].parent][e],o=n[e].parent;n[o].parent;)t.unshift(n[o].parent),r=link(conversions[n[o].parent][o],r),o=n[o].parent;return r.conversion=t,r}var route=function(e){for(var n=deriveBFS(e),t={},r=Object.keys(n),o=r.length,s=0;s<o;s++){var i=r[s];null!==n[i].parent&&(t[i]=wrapConversion(i,n))}return t},convert={},models=Object.keys(conversions);function wrapRaw(e){var n=function(n){return null==n?n:(arguments.length>1&&(n=Array.prototype.slice.call(arguments)),e(n))};return"conversion"in e&&(n.conversion=e.conversion),n}function wrapRounded(e){var n=function(n){if(null==n)return n;arguments.length>1&&(n=Array.prototype.slice.call(arguments));var t=e(n);if("object"==typeof t)for(var r=t.length,o=0;o<r;o++)t[o]=Math.round(t[o]);return t};return"conversion"in e&&(n.conversion=e.conversion),n}models.forEach(function(e){convert[e]={},Object.defineProperty(convert[e],"channels",{value:conversions[e].channels}),Object.defineProperty(convert[e],"labels",{value:conversions[e].labels});var n=route(e);Object.keys(n).forEach(function(t){var r=n[t];convert[e][t]=wrapRounded(r),convert[e][t].raw=wrapRaw(r)})});var colorConvert=convert,ansiStyles=createCommonjsModule(function(e){const n=(e,n)=>(function(){return`[${e.apply(colorConvert,arguments)+n}m`}),t=(e,n)=>(function(){const t=e.apply(colorConvert,arguments);return`[${38+n};5;${t}m`}),r=(e,n)=>(function(){const t=e.apply(colorConvert,arguments);return`[${38+n};2;${t[0]};${t[1]};${t[2]}m`});Object.defineProperty(e,"exports",{enumerable:!0,get:function(){const e=new Map,o={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};o.color.grey=o.color.gray;for(const n of Object.keys(o)){const t=o[n];for(const n of Object.keys(t)){const r=t[n];o[n]={open:`[${r[0]}m`,close:`[${r[1]}m`},t[n]=o[n],e.set(r[0],r[1])}Object.defineProperty(o,n,{value:t,enumerable:!1}),Object.defineProperty(o,"codes",{value:e,enumerable:!1})}const s=e=>e,i=(e,n,t)=>[e,n,t];o.color.close="[39m",o.bgColor.close="[49m",o.color.ansi={ansi:n(s,0)},o.color.ansi256={ansi256:t(s,0)},o.color.ansi16m={rgb:r(i,0)},o.bgColor.ansi={ansi:n(s,10)},o.bgColor.ansi256={ansi256:t(s,10)},o.bgColor.ansi16m={rgb:r(i,10)};for(let e of Object.keys(colorConvert)){if("object"!=typeof colorConvert[e])continue;const s=colorConvert[e];"ansi16"===e&&(e="ansi"),"ansi16"in s&&(o.color.ansi[e]=n(s.ansi16,0),o.bgColor.ansi[e]=n(s.ansi16,10)),"ansi256"in s&&(o.color.ansi256[e]=t(s.ansi256,0),o.bgColor.ansi256[e]=t(s.ansi256,10)),"rgb"in s&&(o.color.ansi16m[e]=r(s.rgb,0),o.bgColor.ansi16m[e]=r(s.rgb,10))}return o}})}),hasFlag=(e,n)=>{n=n||process.argv;const t=e.startsWith("-")?"":1===e.length?"-":"--",r=n.indexOf(t+e),o=n.indexOf("--");return-1!==r&&(-1===o||r<o)};const env=process.env;let forceColor;function translateLevel(e){return 0!==e&&{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}function supportsColor(e){if(!1===forceColor)return 0;if(hasFlag("color=16m")||hasFlag("color=full")||hasFlag("color=truecolor"))return 3;if(hasFlag("color=256"))return 2;if(e&&!e.isTTY&&!0!==forceColor)return 0;const n=forceColor?1:0;if("win32"===process.platform){const e=os.release().split(".");return Number(process.versions.node.split(".")[0])>=8&&Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in env)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI"].some(e=>e in env)||"codeship"===env.CI_NAME?1:n;if("TEAMCITY_VERSION"in env)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION)?1:0;if("truecolor"===env.COLORTERM)return 3;if("TERM_PROGRAM"in env){const e=parseInt((env.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(env.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(env.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)?1:"COLORTERM"in env?1:(env.TERM,n)}function getSupportLevel(e){return translateLevel(supportsColor(e))}hasFlag("no-color")||hasFlag("no-colors")||hasFlag("color=false")?forceColor=!1:(hasFlag("color")||hasFlag("colors")||hasFlag("color=true")||hasFlag("color=always"))&&(forceColor=!0),"FORCE_COLOR"in env&&(forceColor=0===env.FORCE_COLOR.length||0!==parseInt(env.FORCE_COLOR,10));var supportsColor_1={supportsColor:getSupportLevel,stdout:getSupportLevel(process.stdout),stderr:getSupportLevel(process.stderr)};const TEMPLATE_REGEX=/(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,STYLE_REGEX=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,STRING_REGEX=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,ESCAPE_REGEX=/\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi,ESCAPES=new Map([["n","\n"],["r","\r"],["t","\t"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e",""],["a",""]]);function unescape(e){return"u"===e[0]&&5===e.length||"x"===e[0]&&3===e.length?String.fromCharCode(parseInt(e.slice(1),16)):ESCAPES.get(e)||e}function parseArguments(e,n){const t=[],r=n.trim().split(/\s*,\s*/g);let o;for(const n of r)if(isNaN(n)){if(!(o=n.match(STRING_REGEX)))throw new Error(`Invalid Chalk template style argument: ${n} (in style '${e}')`);t.push(o[2].replace(ESCAPE_REGEX,(e,n,t)=>n?unescape(n):t))}else t.push(Number(n));return t}function parseStyle(e){STYLE_REGEX.lastIndex=0;const n=[];let t;for(;null!==(t=STYLE_REGEX.exec(e));){const e=t[1];if(t[2]){const r=parseArguments(e,t[2]);n.push([e].concat(r))}else n.push([e])}return n}function buildStyle(e,n){const t={};for(const e of n)for(const n of e.styles)t[n[0]]=e.inverse?null:n.slice(1);let r=e;for(const e of Object.keys(t))if(Array.isArray(t[e])){if(!(e in r))throw new Error(`Unknown Chalk style: ${e}`);r=t[e].length>0?r[e].apply(r,t[e]):r[e]}return r}var templates=(e,n)=>{const t=[],r=[];let o=[];if(n.replace(TEMPLATE_REGEX,(n,s,i,a,l,c)=>{if(s)o.push(unescape(s));else if(a){const n=o.join("");o=[],r.push(0===t.length?n:buildStyle(e,t)(n)),t.push({inverse:i,styles:parseStyle(a)})}else if(l){if(0===t.length)throw new Error("Found extraneous } in Chalk template literal");r.push(buildStyle(e,t)(o.join(""))),o=[],t.pop()}else o.push(c)}),r.push(o.join("")),t.length>0){const e=`Chalk template literal is missing ${t.length} closing bracket${1===t.length?"":"s"} (\`}\`)`;throw new Error(e)}return r.join("")},chalk=createCommonjsModule(function(e){const n=supportsColor_1.stdout,t="win32"===process.platform&&!(process.env.TERM||"").toLowerCase().startsWith("xterm"),r=["ansi","ansi","ansi256","ansi16m"],o=new Set(["gray"]),s=Object.create(null);function i(e,t){t=t||{};const r=n?n.level:0;e.level=void 0===t.level?r:t.level,e.enabled="enabled"in t?t.enabled:e.level>0}function a(e){if(!this||!(this instanceof a)||this.template){const n={};return i(n,e),n.template=function(){const e=[].slice.call(arguments);return function(e,n){if(!Array.isArray(n))return[].slice.call(arguments,1).join(" ");const t=[].slice.call(arguments,2),r=[n.raw[0]];for(let e=1;e<n.length;e++)r.push(String(t[e-1]).replace(/[{}\\]/g,"\\$&")),r.push(String(n.raw[e]));return templates(e,r.join(""))}.apply(null,[n.template].concat(e))},Object.setPrototypeOf(n,a.prototype),Object.setPrototypeOf(n.template,n),n.template.constructor=a,n.template}i(this,e)}t&&(ansiStyles.blue.open="[94m");for(const e of Object.keys(ansiStyles))ansiStyles[e].closeRe=new RegExp(escapeStringRegexp(ansiStyles[e].close),"g"),s[e]={get(){const n=ansiStyles[e];return c.call(this,this._styles?this._styles.concat(n):[n],this._empty,e)}};s.visible={get(){return c.call(this,this._styles||[],!0,"visible")}},ansiStyles.color.closeRe=new RegExp(escapeStringRegexp(ansiStyles.color.close),"g");for(const e of Object.keys(ansiStyles.color.ansi))o.has(e)||(s[e]={get(){const n=this.level;return function(){const t={open:ansiStyles.color[r[n]][e].apply(null,arguments),close:ansiStyles.color.close,closeRe:ansiStyles.color.closeRe};return c.call(this,this._styles?this._styles.concat(t):[t],this._empty,e)}}});ansiStyles.bgColor.closeRe=new RegExp(escapeStringRegexp(ansiStyles.bgColor.close),"g");for(const e of Object.keys(ansiStyles.bgColor.ansi)){if(o.has(e))continue;s["bg"+e[0].toUpperCase()+e.slice(1)]={get(){const n=this.level;return function(){const t={open:ansiStyles.bgColor[r[n]][e].apply(null,arguments),close:ansiStyles.bgColor.close,closeRe:ansiStyles.bgColor.closeRe};return c.call(this,this._styles?this._styles.concat(t):[t],this._empty,e)}}}}const l=Object.defineProperties(()=>{},s);function c(e,n,r){const o=function(){return function(){const e=arguments,n=e.length;let r=String(arguments[0]);if(0===n)return"";if(n>1)for(let t=1;t<n;t++)r+=" "+e[t];if(!this.enabled||this.level<=0||!r)return this._empty?"":r;const o=ansiStyles.dim.open;t&&this.hasGrey&&(ansiStyles.dim.open="");for(const e of this._styles.slice().reverse())r=(r=e.open+r.replace(e.closeRe,e.open)+e.close).replace(/\r?\n/g,`${e.close}$&${e.open}`);return ansiStyles.dim.open=o,r}.apply(o,arguments)};o._styles=e,o._empty=n;const s=this;return Object.defineProperty(o,"level",{enumerable:!0,get:()=>s.level,set(e){s.level=e}}),Object.defineProperty(o,"enabled",{enumerable:!0,get:()=>s.enabled,set(e){s.enabled=e}}),o.hasGrey=this.hasGrey||"gray"===r||"grey"===r,o.__proto__=l,o}Object.defineProperties(a.prototype,s),e.exports=a(),e.exports.supportsColor=n,e.exports.default=e.exports}),chalk_1=chalk.supportsColor,unzipDir=require("archive-dir").unzipDir;function addNewWebCommand(){commander.command("web").option("--path <n>","项目路径",process.cwd()).option("--template <n>","模板名称","webEmpty").description("新建Web项目").action(function(e){var n=path.resolve(__dirname,"./template/"),t=n+"/"+e.template+".zip";if(!fs.existsSync(t)){var r=fs.readdirSync(n).map(function(e){return path.basename(e,".zip")}).join("\n");console.log(chalk.red("模板"+e.template+"不存在，模板列表：\n"+r))}unzipDir(t,e.path)})}addNewWebCommand(),commander.parse(process.argv);

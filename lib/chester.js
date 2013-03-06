'use strict';function f(a) {
  throw a;
}
var h = !0, i = null, m = !1;
function aa(a) {
  return function() {
    return this[a]
  }
}
var o, ba = this;
Math.floor(2147483648 * Math.random()).toString(36);
function p(a, b) {
  var c = a.split("."), d = ba;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var e;c.length && (e = c.shift());) {
    !c.length && void 0 !== b ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
  }
}
function q(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.cc = b.prototype;
  a.prototype = new c
}
;function ca(a, b) {
  this.x = void 0 !== a ? a : 0;
  this.y = void 0 !== b ? b : 0
}
ca.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function da(a, b) {
  this.x = a;
  this.y = b
}
q(da, ca);
da.prototype.scale = function(a) {
  this.x *= a;
  this.y *= a;
  return this
};
da.prototype.rotate = function(a) {
  var b = Math.cos(a), a = Math.sin(a), c = this.y * b + this.x * a;
  this.x = this.x * b - this.y * a;
  this.y = c;
  return this
};
var ea, fa;
HTMLCanvasElement.zb = new da(0, 0);
function ga(a) {
  var b = s, c = HTMLCanvasElement.zb;
  c.x = 0;
  c.y = 0;
  void 0 === b.Y && (b.Y = $(b).offset(), b.Pa = $(b).height());
  a.changedTouches && (a = a.changedTouches[0]);
  c.x = a.pageX - b.Y.left;
  c.y = b.Pa - (a.pageY - b.Y.top);
  return c
}
(function() {
  for(var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0;c < b.length && !window.requestAnimationFrame;++c) {
    window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.Wa = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"]
  }
  window.requestAnimationFrame || (console.log("using setTimeout"), window.requestAnimationFrame = function(b) {
    var c = Date.now(), g = Math.max(0, 16 - (c - a)), j = window.setTimeout(function() {
      b(c + g)
    }, g);
    a = c + g;
    return j
  });
  window.Wa || (window.Wa = function(a) {
    clearTimeout(a)
  })
})();
function ha(a, b) {
  console.log(WebGLDebugUtils.glEnumToString(a) + " was caused by call to " + b)
}
var ia = window.Stats || i, ja = {useGoogleAnalytics:m, projection:"3d", webglMode:h, usesOffscreenBuffer:m, basePath:""}, ka = "3d", v = h, la = m, ma = "", y = i, na = m, oa = {}, pa = i, qa = i, ra = i, s = i, sa = m, z = {}, ta = {}, ua = {}, va = {}, wa = Date.now(), xa = 0, ya = {Xb:0, $b:1, ac:2, Yb:3, Zb:4}, D = i, E = [];
function za(a) {
  var b = oa[a], c = y;
  if(a != pa) {
    pa = a;
    c.validateProgram(b);
    c.useProgram(b);
    for(var d in b.b) {
      c.enableVertexAttribArray(b.b[d])
    }
  }
  return b
}
function Aa() {
  var a = s;
  y.ga = a.width;
  y.X = a.height
}
function Ba() {
  var a = y;
  Ca("default", function(b) {
    b.F = a.getUniformLocation(b, "uMVPMatrix");
    b.b = {vertexPositionAttribute:a.getAttribLocation(b, "aVertexPosition"), vertexColorAttribute:a.getAttribLocation(b, "aVertexColor")};
    b.mvpMatrixUniform = b.F;
    b.attribs = b.b
  });
  Ca("texture", function(b) {
    b.F = a.getUniformLocation(b, "uMVPMatrix");
    b.Ha = a.getUniformLocation(b, "uSampler");
    b.b = {vertexColorAttribute:a.getAttribLocation(b, "aVertexColor"), textureCoordAttribute:a.getAttribLocation(b, "aTextureCoord"), vertexPositionAttribute:a.getAttribLocation(b, "aVertexPosition")};
    b.mvpMatrixUniform = b.F;
    b.samplerUniform = b.Ha;
    b.attribs = b.b
  })
}
function Ca(a, b) {
  var c = y, d = Da(a, "frag"), e = Da(a, "vert"), g = c.createShader(c.FRAGMENT_SHADER);
  c.shaderSource(g, d);
  c.compileShader(g);
  c.getShaderParameter(g, c.COMPILE_STATUS) ? (d = c.createShader(c.VERTEX_SHADER), c.shaderSource(d, e), c.compileShader(d), c.getShaderParameter(d, c.COMPILE_STATUS) ? (c = y, e = c.createProgram(), c.attachShader(e, g), c.attachShader(e, d), c.linkProgram(e), c.getProgramParameter(e, c.LINK_STATUS) || console.log("problem linking shader"), oa[a] = e, b && b(e)) : console.log("problem compiling vertex shader " + a + "(" + c.getShaderInfoLog(d) + "):\n" + e)) : console.log("problem compiling fragment shader " + 
  a + "(" + c.getShaderInfoLog(g) + "):\n" + d)
}
function Da(a, b) {
  var c = "";
  $.ajax({url:ma + "shaders/" + a + "." + b, async:m, type:"GET", success:function(a, b) {
    "success" == b ? c = a : console.log("error getting the shader data")
  }});
  return c
}
function F(a, b, c, d) {
  b = "object" == typeof b ? {dataType:b.dataType, url:b.url, name:b.name} : {url:b, name:c || b};
  z[a] || (z[a] = {});
  var c = z[a], e = b.name;
  if(c[e]) {
    if("loading" == c[e].status) {
      d && c[e].ba.push(d)
    }else {
      if("loaded" == c[e].status) {
        d && d(c[e].data)
      }else {
        if("try" == c[e].status) {
          c[e].status = "loading";
          if(ua[a]) {
            ua[a](a, b)
          }else {
            ua["default"](a, b)
          }
          d && c[e].ba.push(d)
        }
      }
    }
  }else {
    c[e] = {data:i, name:e, status:"try", ba:[]}, d && c[e].ba.push(d), F(a, b)
  }
}
function Ea(a, b) {
  var c = va[a], d, e;
  c || (va[a] = [], c = va[a]);
  b && c.push(b);
  var g = h;
  if("all" == a) {
    for(var j in z) {
      d = z[j];
      for(e in d) {
        if("loaded" != d[e].status) {
          g = m;
          break
        }
      }
      if(!g) {
        break
      }
    }
  }else {
    for(e in d = z[a], d) {
      if("loaded" != d[e].status) {
        g = m;
        break
      }
    }
  }
  if(g) {
    for(;d = c.shift();) {
      d()
    }
  }
}
function Fa(a, b) {
  return b ? z[a][b].data : i
}
function Ga(a) {
  var b = y, c = h;
  try {
    var d = 0;
    b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, 1);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, a.s);
    b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a);
    d = b.getError();
    0 !== d && (console.log("gl error " + d), c = m);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.bindTexture(b.TEXTURE_2D, i)
  }catch(e) {
    console.log("got some error: " + e), c = m
  }
  return c
}
function Ha(a, b, c) {
  z[c][a.name].data = b;
  return h
}
function Ia(a, b) {
  v && !b.s && (b.s = y.createTexture());
  z.texture[a.name].data = b;
  return v ? Ga(b) : h
}
function Ja(a, b) {
  var c = new Image, d = b.url, e = b.name;
  c.src = "";
  c.addEventListener("load", function() {
    var d = z.texture[e];
    if(ta[a](b, c)) {
      d.status = "loaded";
      for(var j;j = d.ba.shift();) {
        j(d.data)
      }
      Ea(a);
      Ea("all")
    }else {
      d.status = "try", F(a, b)
    }
  }, m);
  d.match(/^http(s)?:/) ? (c.crossOrigin = "anonymous", c.src = d) : c.src = d.match(/^data:/) ? d : ma + d
}
function Ka(a, b) {
  var c = b.url, d = c, e = b.name;
  c.match(/^http(s)?:\/\//) || (d = ma + c);
  $.ajax({url:d, dataType:b.dataType, bc:function(a) {
    a.withCredentials = h
  }, success:function(d, j) {
    var k = z[a][e];
    if("success" == j) {
      if((ta[a] || ta["default"])(b, d, a)) {
        k.status = "loaded";
        for(var l;l = k.ba.shift();) {
          l(k.data)
        }
        Ea(a);
        Ea("all")
      }else {
        k.status = "try", F(a, b)
      }
    }else {
      console.log("Error loading asset " + c)
    }
  }})
}
function La() {
  var a;
  v ? (a = y, a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)) : (a = fa, a.setTransform(1, 0, 0, 1, 0, 0), a.fillRect(0, 0, a.ga, a.X));
  ra && ra.K();
  !v && la && (a.fillRect(0, 0, a.ga, a.X), a.drawImage(ea, 0, 0));
  a = Date.now();
  xa = a - wa;
  wa = a
}
function Ma() {
  window.navigator.platform.match(/iPhone|iPad/) ? (document.addEventListener("touchstart", Na, m), document.addEventListener("touchmove", function(a) {
    Oa(a);
    a.preventDefault()
  }, m), document.addEventListener("touchend", Za, m)) : ($(s).mousedown(Na), $(s).mousemove(Oa), $(s).mouseup(Za), $(s).mouseenter($a), $(s).mouseleave(ab))
}
var H = new Float32Array(3);
function Na(a) {
  var a = ga(a), b = 0, c = E.length;
  for(H.set([a.x, a.y, 0]);b < c;b++) {
    E[b](H, 0)
  }
}
function Oa(a) {
  var a = ga(a), b = 0, c = E.length;
  for(H.set([a.x, a.y, 0]);b < c;b++) {
    E[b](H, 1)
  }
}
function Za(a) {
  var a = ga(a), b = 0, c = E.length;
  for(H.set([a.x, a.y, 0]);b < c;b++) {
    E[b](H, 2)
  }
}
function $a(a) {
  var a = ga(a), b = 0, c = E.length;
  for(H.set([a.x, a.y, 0]);b < c;b++) {
    E[b](H, 3)
  }
}
function ab(a) {
  var a = ga(a), b = 0, c = E.length;
  for(H.set([a.x, a.y, 0]);b < c;b++) {
    E[b](H, 4)
  }
}
function bb() {
  na || (window.requestAnimationFrame(bb, s), D && D.begin(), La(), I.Ub(xa), D && D.end())
}
p("chesterGL.version", "0.3");
p("chesterGL.settings", ja);
p("chesterGL.mouseEvents", ya);
ya.UP = 2;
ya.DOWN = 0;
ya.MOVE = 1;
ya.ENTER = 3;
ya.LEAVE = 4;
p("chesterGL.viewportSize", function() {
  return new J(y.ga, y.X)
});
p("chesterGL.setup", function(a) {
  a = document.getElementById(a);
  ka = ja.projection;
  v = ja.webglMode;
  la = ja.usesOffscreenBuffer;
  ma = ja.basePath;
  try {
    if(s = a, v && (y = a.getContext("experimental-webgl", {alpha:m, antialias:m, preserveDrawingBuffer:h})) && window.WebGLDebugUtils) {
      console.log("installing debug context"), y = WebGLDebugUtils.makeDebugContext(y, ha)
    }
  }catch(b) {
    console.log("ERROR: " + b)
  }
  y || (y = a.getContext("2d"), la ? (ea = document.createElement("canvas"), ea.width = a.width, ea.height = a.height, fa = ea.getContext("2d"), fa.ga = a.width, fa.X = a.height) : fa = y, (!y || !fa) && f("Error initializing graphic context!"), v = ja.webglMode = m);
  Aa();
  Ma();
  v && Ba();
  var a = window.location.search.substring(1).split("&"), c;
  for(c in a) {
    var d = a[c].split("=");
    "_cdbg" == d[0] && "1" == d[1] && (sa = h, console.log("debug mode on"))
  }
  ta.texture = Ia;
  ta["default"] = Ha;
  ua.texture = Ja;
  ua["default"] = Ka;
  ia && (console.log("chesterGL: adding stats"), D = new ia, D.setMode(1), D.domElement.style.position = "absolute", D.domElement.style.left = "0px", D.domElement.style.top = "0px", p("chesterGL.stats", D), document.body.appendChild(D.domElement))
});
p("chesterGL.canvasResized", Aa);
p("chesterGL.initShader", Ca);
p("chesterGL.registerAssetHandler", function(a, b) {
  ta[a] = b
});
p("chesterGL.loadAsset", F);
p("chesterGL.assetsLoaded", Ea);
p("chesterGL.getAsset", Fa);
p("chesterGL.setupPerspective", function() {
  var a = y;
  if(v) {
    a.clearColor(0, 0, 0, 1);
    a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
    a.enable(a.BLEND);
    a.disable(a.DEPTH_TEST);
    var b = a.ga, c = a.X;
    a.viewport(0, 0, b, c);
    qa = cb();
    if("2d" == ka) {
      console.log("setting up 2d projection (" + b + "," + c + ")"), db(qa, 2 / (b - 0), 0, 0, 0, 0, 2 / (c - 0), 0, 0, 0, 0, -2 / 2048, 0, -(b + 0) / (b - 0), -(c + 0) / (c - 0), -0.0, 1)
    }else {
      if("3d" == ka) {
        console.log("setting up 3d projection (" + b + "," + c + ")");
        var d = c / 1.1566;
        var a = cb(), e = b / c, g = 60 * Math.PI / 180 / 2, j = Math.sin(g);
        0 == j || 0 == e || (g = Math.cos(g) / j, db(a, g / e, 0, 0, 0, 0, g, 0, 0, 0, 0, -1500.5 / 1499.5, -1, 0, 0, -1500 / 1499.5, 0));
        d = [b / 2, c / 2, d];
        e = [b / 2, c / 2, 0];
        b = cb();
        c = eb[0];
        c[0] = e[0] - d[0];
        c[1] = e[1] - d[1];
        c[2] = e[2] - d[2];
        fb(c, c);
        c[3] = 0;
        e = eb[1];
        gb(c, [0, 1, 0], e);
        fb(e, e);
        e[3] = 0;
        g = eb[2];
        gb(e, c, g);
        fb(g, g);
        g[3] = 0;
        c[0] = -c[0];
        c[1] = -c[1];
        c[2] = -c[2];
        hb(b, 0, e);
        hb(b, 1, g);
        hb(b, 2, c);
        b[3] = 0;
        b[7] = 0;
        b[11] = 0;
        b[15] = 1;
        ib(b, -d[0], -d[1], -d[2]);
        jb(a, b, qa)
      }else {
        f("Invalid projection: " + ka)
      }
    }
  }
});
p("chesterGL.setRunningScene", function(a) {
  a.type == K.SCENE && (ra = a)
});
p("chesterGL.drawScene", La);
p("chesterGL.run", bb);
p("chesterGL.togglePause", function() {
  na ? (na = m, wa = Date.now(), bb()) : na = h
});
p("chesterGL.setPaused", function(a) {
  !a && na ? (na = a, wa = Date.now(), bb()) : na = a
});
p("chesterGL.isPaused", function() {
  return na
});
p("chesterGL.addMouseHandler", function(a) {
  -1 == E.indexOf(a) && E.push(a)
});
p("chesterGL.removeMouseHandler", function(a) {
  a = E.indexOf(a);
  0 < a && E.splice(a, 1)
});
function J(a, b) {
  this.width = a;
  this.height = b
}
J.prototype.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
};
J.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
J.prototype.scale = function(a) {
  this.width *= a;
  this.height *= a;
  return this
};
function N(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
N.prototype.BYTES_PER_ELEMENT = 8;
N.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
N.prototype.toString = Array.prototype.join;
"undefined" == typeof Float64Array && (N.BYTES_PER_ELEMENT = 8, N.prototype.BYTES_PER_ELEMENT = N.prototype.BYTES_PER_ELEMENT, N.prototype.set = N.prototype.set, N.prototype.toString = N.prototype.toString, p("Float64Array", N));
function Q(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
Q.prototype.BYTES_PER_ELEMENT = 4;
Q.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
Q.prototype.toString = Array.prototype.join;
"undefined" == typeof Float32Array && (Q.BYTES_PER_ELEMENT = 4, Q.prototype.BYTES_PER_ELEMENT = Q.prototype.BYTES_PER_ELEMENT, Q.prototype.set = Q.prototype.set, Q.prototype.toString = Q.prototype.toString, p("Float32Array", Q));
function kb(a) {
  var b = new Float32Array(3);
  lb(b, a);
  return b
}
function lb(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2]
}
function mb(a, b, c) {
  c[0] = a[0] + b[0];
  c[1] = a[1] + b[1];
  c[2] = a[2] + b[2]
}
function nb(a, b, c) {
  c[0] = a[0] * b;
  c[1] = a[1] * b;
  c[2] = a[2] * b
}
function fb(a, b) {
  var c = a[0], d = a[1], e = a[2], c = 1 / Math.sqrt(c * c + d * d + e * e);
  b[0] = a[0] * c;
  b[1] = a[1] * c;
  b[2] = a[2] * c
}
function gb(a, b, c) {
  var d = a[0], e = a[1], a = a[2], g = b[0], j = b[1], b = b[2];
  c[0] = e * b - a * j;
  c[1] = a * g - d * b;
  c[2] = d * j - e * g
}
;function ob(a) {
  var b = new Float32Array(4);
  pb(b, a);
  return b
}
function qb(a, b, c, d) {
  var e = new Float32Array(4);
  e[0] = a;
  e[1] = b;
  e[2] = c;
  e[3] = d;
  return e
}
function pb(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2];
  a[3] = b[3]
}
;function cb() {
  return new Float32Array(16)
}
function db(a, b, c, d, e, g, j, k, l, n, r, t, A, B, w, x, u) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  a[3] = e;
  a[4] = g;
  a[5] = j;
  a[6] = k;
  a[7] = l;
  a[8] = n;
  a[9] = r;
  a[10] = t;
  a[11] = A;
  a[12] = B;
  a[13] = w;
  a[14] = x;
  a[15] = u
}
function hb(a, b, c) {
  a[b] = c[0];
  a[b + 4] = c[1];
  a[b + 8] = c[2];
  a[b + 12] = c[3]
}
function rb(a) {
  a[0] = 1;
  a[1] = 0;
  a[2] = 0;
  a[3] = 0;
  a[4] = 0;
  a[5] = 1;
  a[6] = 0;
  a[7] = 0;
  a[8] = 0;
  a[9] = 0;
  a[10] = 1;
  a[11] = 0;
  a[12] = 0;
  a[13] = 0;
  a[14] = 0;
  a[15] = 1;
  return a
}
function jb(a, b, c) {
  var d = a[0], e = a[1], g = a[2], j = a[3], k = a[4], l = a[5], n = a[6], r = a[7], t = a[8], A = a[9], B = a[10], w = a[11], x = a[12], u = a[13], C = a[14], a = a[15], G = b[0], O = b[1], P = b[2], L = b[3], M = b[4], Z = b[5], Pa = b[6], Qa = b[7], Ra = b[8], Sa = b[9], Ta = b[10], Ua = b[11], Va = b[12], Xa = b[13], Ya = b[14], b = b[15];
  c[0] = d * G + k * O + t * P + x * L;
  c[1] = e * G + l * O + A * P + u * L;
  c[2] = g * G + n * O + B * P + C * L;
  c[3] = j * G + r * O + w * P + a * L;
  c[4] = d * M + k * Z + t * Pa + x * Qa;
  c[5] = e * M + l * Z + A * Pa + u * Qa;
  c[6] = g * M + n * Z + B * Pa + C * Qa;
  c[7] = j * M + r * Z + w * Pa + a * Qa;
  c[8] = d * Ra + k * Sa + t * Ta + x * Ua;
  c[9] = e * Ra + l * Sa + A * Ta + u * Ua;
  c[10] = g * Ra + n * Sa + B * Ta + C * Ua;
  c[11] = j * Ra + r * Sa + w * Ta + a * Ua;
  c[12] = d * Va + k * Xa + t * Ya + x * b;
  c[13] = e * Va + l * Xa + A * Ya + u * b;
  c[14] = g * Va + n * Xa + B * Ya + C * b;
  c[15] = j * Va + r * Xa + w * Ya + a * b
}
function sb(a, b, c) {
  var d = b[0], e = b[1], b = b[2];
  c[0] = d * a[0] + e * a[4] + b * a[8] + a[12];
  c[1] = d * a[1] + e * a[5] + b * a[9] + a[13];
  c[2] = d * a[2] + e * a[6] + b * a[10] + a[14]
}
function ib(a, b, c, d) {
  var e = a[1] * b + a[5] * c + a[9] * d + a[13], g = a[2] * b + a[6] * c + a[10] * d + a[14], j = a[3] * b + a[7] * c + a[11] * d + a[15];
  a[12] = a[0] * b + a[4] * c + a[8] * d + a[12];
  a[13] = e;
  a[14] = g;
  a[15] = j
}
new Float64Array(3);
new Float64Array(3);
var eb = [new Float64Array(4), new Float64Array(4), new Float64Array(4)];
new Float64Array(16);
function R(a, b, c) {
  this.type = b || K.STANDALONE;
  c && (this.parent = c);
  this.children = [];
  this.g = S.DEFAULT;
  a && this.W(a);
  this.type == K.STANDALONE && this.qb([1, 1, 1, 1]);
  this.ca(0, 0, 0);
  if(v && (!c || c.type != K.BLOCKGROUP)) {
    this.m = y.createBuffer(), this.a = new Float32Array(36)
  }
  this.d = cb();
  this.r = cb();
  this.d = rb(cb());
  this.ta = [];
  this.Z = []
}
var S = {DEFAULT:0, TEXTURE:1}, tb = ["default", "texture"], K = {STANDALONE:0, BLOCKGROUP:1, SCENE:2, TMXBLOCK:3, PARTICLE:4, PRIMITIVE:5}, ub = Math.PI / 180, vb = 180 / Math.PI, wb = 1 * ub, xb = qb(0, 0, 1, 1), yb = new J(0, 0);
o = R.prototype;
o.title = "";
o.d = i;
o.r = i;
o.visible = h;
o.i = m;
o.N = m;
o.O = m;
o.ha = 0;
o.m = i;
o.a = i;
o.position = i;
o.u = i;
o.color = i;
o.c = i;
o.opacity = 1;
o.rotation = 0;
o.scale = 1;
o.update = i;
o.frame = i;
o.parent = i;
o.children = i;
o.ta = i;
o.Z = i;
o.o = m;
function zb(a) {
  if(a.g == S.TEXTURE) {
    var b = new T(1, 1);
    a.L(b);
    b.sb(function() {
      var a = this.parent.u, b = a.width / 2, a = a.height / 2;
      this.Za([[-b, -a, 0], [-b, a, 0], [b, a, 0], [b, -a, 0]], [1, 1, 1, 1], h)
    })
  }
}
o.W = function(a) {
  if("string" === typeof a) {
    var b = U.ka(a), a = b.frame;
    this.da(b.c)
  }
  this.frame ? pb(this.frame, a) : this.frame = ob(a);
  this.Ka(a[2], a[3]);
  this.O = h
};
o.ka = aa("frame");
o.Ka = function(a, b) {
  this.u = new J(a, b);
  this.O = h
};
o.Gb = aa("u");
o.Rb = function(a) {
  this.scale = a;
  this.i = h
};
o.Jb = aa("scale");
o.qb = function(a) {
  this.color ? pb(this.color, a) : this.color = ob(a);
  this.N = h
};
o.Fb = aa("color");
o.ca = function(a, b, c) {
  if(this.position) {
    if(1 == arguments.length) {
      lb(this.position, a)
    }else {
      var d = this.position;
      d[0] = a;
      d[1] = b;
      d[2] = c
    }
  }else {
    1 == arguments.length ? d = kb(a) : (d = new Float32Array(3), d[0] = a, d[1] = b, d[2] = c), this.position = d
  }
  this.i = h
};
o.Hb = aa("position");
o.Eb = function() {
  var a = this.position, b = this.frame[2], c = this.frame[3];
  return[a[0] - b / 2, a[1] - c / 2, b, c]
};
o.da = function(a) {
  this.c = a;
  this.g = S.TEXTURE;
  sa && zb(this);
  var b = this;
  F("texture", a, i, function(a) {
    b.u || b.Ka(a.width, a.height);
    b.frame || b.W([0, 0, a.width, a.height])
  })
};
o.Kb = aa("c");
o.La = function(a) {
  this.rotation = a;
  this.i = h
};
o.Ib = aa("rotation");
o.sb = function(a) {
  this.update = a
};
o.Sb = function(a) {
  this.visible = a
};
o.Mb = aa("visible");
o.L = function(a) {
  a.parent && f("can't add a block twice!");
  this.o ? this.ta.push(a) : (this.children.push(a), a.parent = this)
};
o.removeChild = function(a) {
  (!a.parent || a.parent != this) && f("not our child!");
  if(this.o) {
    this.Z.push(a)
  }else {
    var b = this.children.indexOf(a);
    0 <= b && (this.children.splice(b, 1), a.parent = i)
  }
};
o.transform = function() {
  var a = y;
  if(this.i || this.parent && this.parent.i) {
    rb(this.d);
    ib(this.d, this.position[0], this.position[1], this.position[2]);
    var b = this.d, c = -1 * this.rotation, d = b[0], e = b[1], g = b[2], j = b[3], k = b[4], l = b[5], n = b[6], r = b[7], t = b[8], A = b[9], B = b[10], w = b[11], x = Math.cos(c), u = Math.sin(c), C = 1 - x, c = 0 * C + x, G = 0 * C + 1 * u, O = 0 * C - 0 * u, P = 0 * C - 1 * u, L = 0 * C + x, M = 0 * C + 0 * u, Z = 0 * C + 0 * u, u = 0 * C - 0 * u, x = 1 * C + x;
    db(b, d * c + k * G + t * O, e * c + l * G + A * O, g * c + n * G + B * O, j * c + r * G + w * O, d * P + k * L + t * M, e * P + l * L + A * M, g * P + n * L + B * M, j * P + r * L + w * M, d * Z + k * u + t * x, e * Z + l * u + A * x, g * Z + n * u + B * x, j * Z + r * u + w * x, b[12], b[13], b[14], b[15]);
    b = this.d;
    e = d = this.scale;
    db(b, b[0] * d, b[1] * d, b[2] * d, b[3] * d, b[4] * e, b[5] * e, b[6] * e, b[7] * e, 1 * b[8], 1 * b[9], 1 * b[10], 1 * b[11], b[12], b[13], b[14], b[15]);
    (b = this.parent ? this.parent.d : i) && jb(b, this.d, this.d)
  }
  if(!(this.type == K.BLOCKGROUP || this.type == K.PRIMITIVE)) {
    if(b = this.a, d = this.parent && this.parent.type == K.BLOCKGROUP, v) {
      !d && (this.O || this.N) && a.bindBuffer(a.ARRAY_BUFFER, this.m);
      if(this.O || d && this.i) {
        if(n = 0.5 * this.u.width, r = 0.5 * this.u.height, g = this.position[2], e = 36 * this.ha, d ? (j = [n, r, 0], k = [-n, r, 0], l = [n, -r, 0], n = [-n, -r, 0], sb(this.d, j, j), sb(this.d, k, k), sb(this.d, n, n), sb(this.d, l, l), b[e] = n[0], b[e + 1] = n[1], b[e + 2] = g, b[e + 9] = k[0], b[e + 1 + 9] = k[1], b[e + 2 + 9] = g, b[e + 18] = l[0], b[e + 1 + 18] = l[1], b[e + 2 + 18] = g, b[e + 27] = j[0], b[e + 1 + 27] = j[1]) : (b[e] = -n, b[e + 1] = -r, b[e + 2] = g, b[e + 9] = -n, b[e + 
        1 + 9] = r, b[e + 2 + 9] = g, b[e + 18] = n, b[e + 1 + 18] = -r, b[e + 2 + 18] = g, b[e + 27] = n, b[e + 1 + 27] = r), b[e + 2 + 27] = g, this.g == S.TEXTURE) {
          g = Fa("texture", this.c), k = g.width, l = g.height, g = this.frame[0] / k + 0.0010, j = this.frame[1] / l + 0.0010, k = this.frame[2] / k - 0.0020, l = this.frame[3] / l - 0.0020, e += 3, b[e] = g, b[e + 1] = j, b[e + 9] = g, b[e + 1 + 9] = j + l, b[e + 18] = g + k, b[e + 1 + 18] = j, b[e + 27] = g + k, b[e + 1 + 27] = j + l
        }
      }
      if(this.N) {
        e = 5 + 36 * this.ha;
        g = this.color;
        j = this.opacity;
        for(k = 0;4 > k;k++) {
          b[e + 9 * k] = g[0] * j, b[e + 1 + 9 * k] = g[1] * j, b[e + 2 + 9 * k] = g[2] * j, b[e + 3 + 9 * k] = g[3] * j
        }
      }
      v && (!d && (this.O || this.N)) && a.bufferData(a.ARRAY_BUFFER, this.a, a.STATIC_DRAW)
    }
  }
};
o.K = function() {
  this.o = h;
  this.update && this.update(xa);
  if(this.visible) {
    this.transform();
    (!this.parent || this.parent.type != K.BLOCKGROUP) && this.G();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].K()
    }
    for(this.o = this.O = this.N = this.i = m;a = this.ta.shift();) {
      this.L(a)
    }
    for(;a = this.Z.shift();) {
      this.removeChild(a)
    }
  }else {
    this.o = m
  }
};
o.G = function() {
  this.type == K.BLOCKGROUP && f("Cannot call render on a BlockGroup block!");
  if(this.type != K.SCENE) {
    var a, b;
    if(v) {
      a = y;
      var c = za(tb[this.g]);
      a.bindBuffer(a.ARRAY_BUFFER, this.m);
      a.vertexAttribPointer(c.b.vertexPositionAttribute, 3, a.FLOAT, m, 36, 0);
      a.vertexAttribPointer(c.b.vertexColorAttribute, 4, a.FLOAT, m, 36, 20);
      if(this.g != S.DEFAULT && this.g == S.TEXTURE && (b = Fa("texture", this.c)) && b.s) {
        a.vertexAttribPointer(c.b.textureCoordAttribute, 2, a.FLOAT, m, 36, 12), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, b.s), a.uniform1i(c.Ha, 0)
      }
      (this.i || this.parent && this.parent.i) && jb(qa, this.d, this.r);
      a.uniformMatrix4fv(c.F, m, this.r);
      a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
    }else {
      if(a = fa, 1 == this.g) {
        c = this.d;
        b = Fa("texture", this.c);
        a.globalAlpha = this.opacity;
        a.setTransform(c[0], c[4], c[1], c[5], c[12], a.X - c[13]);
        var c = this.u.width, d = this.u.height, e = this.frame;
        a.drawImage(b, e[0], b.height - (e[1] + d), e[2], e[3], -c / 2, -d / 2, c, d)
      }
    }
  }
};
p("chesterGL.Block", R);
p("chesterGL.Block.FullFrame", xb);
p("chesterGL.Block.SizeZero", yb);
p("chesterGL.Block.TYPE", K);
p("chesterGL.Block.PROGRAM", S);
p("chesterGL.Block.PROGRAM_NAME", tb);
p("chesterGL.Block.DEG_TO_RAD", ub);
p("chesterGL.Block.RAD_TO_DEG", vb);
p("chesterGL.Block.ONE_DEG", wb);
R.prototype.title = R.prototype.title;
R.prototype.parent = R.prototype.parent;
R.prototype.children = R.prototype.children;
R.prototype.addChild = R.prototype.L;
R.prototype.removeChild = R.prototype.removeChild;
R.prototype.getBoundingBox = R.prototype.Eb;
R.prototype.setPosition = R.prototype.ca;
R.prototype.getPosition = R.prototype.Hb;
R.prototype.setRotation = R.prototype.La;
R.prototype.getRotation = R.prototype.Ib;
R.prototype.setColor = R.prototype.qb;
R.prototype.getColor = R.prototype.Fb;
R.prototype.setFrame = R.prototype.W;
R.prototype.getFrame = R.prototype.ka;
R.prototype.setContentSize = R.prototype.Ka;
R.prototype.getContentSize = R.prototype.Gb;
R.prototype.setTexture = R.prototype.da;
R.prototype.getTexture = R.prototype.Kb;
R.prototype.setScale = R.prototype.Rb;
R.prototype.getScale = R.prototype.Jb;
R.prototype.setUpdate = R.prototype.sb;
R.prototype.setVisible = R.prototype.Sb;
R.prototype.isVisible = R.prototype.Mb;
function Ab(a, b, c) {
  var b = b || "20pt sans-serif", c = c || "White", d = document.createElement("canvas");
  this.canvas = d;
  this.context = d.getContext("2d");
  this.font = b;
  this.fillStyle = c;
  this.c = Date.now() + ".canvas";
  z.texture || (z.texture = {});
  z.texture[this.c] = d;
  R.call(this, Bb(this, a));
  this.rb(a, h);
  this.g = S.TEXTURE
}
q(Ab, R);
o = Ab.prototype;
o.canvas = i;
o.context = i;
o.Ea = m;
o.text = "";
o.qa = 0;
o.font = "";
o.fillStyle = "";
o.rb = function(a, b) {
  this.text = a;
  b ? Cb(this) : (this.W(Bb(this)), this.Ea = h)
};
function Cb(a) {
  var b = a.context, c = a.canvas;
  b.clearRect(0, 0, c.width, c.height);
  b.fillText(a.text, 0, 0.8 * c.height);
  c.s || (c.s = y.createTexture(), z.texture[a.c].data = c);
  Ga(c);
  a.Ea = m
}
function Bb(a, b) {
  var c = a.context, d = a.canvas;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  b && (a.text = b);
  0 === a.qa && (c.save(), c.rotate(90), a.qa = 1.25 * c.measureText("M").width, c.restore());
  var e = c.measureText(a.text).width;
  d.width = e;
  d.height = a.qa;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  return[0, 0, e, a.qa]
}
o.K = function() {
  this.Ea && Cb(this);
  R.prototype.K.call(this)
};
p("chesterGL.LabelBlock", Ab);
Ab.prototype.setText = Ab.prototype.rb;
function V(a, b) {
  v || f("BlockGroup only works on WebGL mode");
  R.call(this, i, K.BLOCKGROUP);
  a ? (this.c = a, this.g = S.TEXTURE) : this.g = S.DEFAULT;
  this.T = b || 10;
  Db(this)
}
q(V, R);
o = V.prototype;
o.T = 0;
o.ma = m;
o.la = i;
o.n = i;
function Db(a, b, c) {
  var d = y;
  a.m || (a.m = d.createBuffer());
  a.la || (a.la = d.createBuffer());
  var d = new Float32Array(36 * a.T), e = new Uint16Array(6 * a.T);
  b && d.set(b);
  c && e.set(c);
  a.a = d;
  a.n = e
}
o.Xa = function(a) {
  a = new R(a, K.STANDALONE, this);
  this.c && a.da(this.c);
  return a
};
o.L = function(a) {
  a.parent != this && f("Invalid child: can only add children created with BlockGroup.create");
  this.children.length >= this.T && (this.T *= 2, Db(this, this.a, this.n));
  this.c ? this.c != a.c && f("Invalid child: only can add child with the same texture") : this.c = a.c;
  this.children.push(a);
  a.ha = this.children.length - 1;
  a.a = this.a;
  this.ma = h
};
o.removeChild = function(a) {
  a.parent != this && f("Invalid child");
  if(this.o) {
    this.Z.push(a)
  }else {
    var b = this.children.indexOf(a);
    if(0 < b) {
      for(this.children.splice(b, 1);b < this.dc;b++) {
        var c = this.children[b];
        c.ha = b;
        c.i = h;
        c.N = h
      }
      a.parent = i
    }
    this.ma = h
  }
};
o.Qb = function() {
  for(var a = this.children.length, b = 0;b < a;b++) {
    this.children[b].parent = i
  }
  this.children.length = 0
};
function Eb(a, b) {
  for(var c = (a.n[-1] || -1) + 1, b = b || Math.max(a.children.length, 1), d = 0;d < b;d++) {
    var e = 6 * d;
    a.n[e + 0] = c;
    a.n[e + 1] = c + 1;
    a.n[e + 2] = c + 2;
    a.n[e + 3] = c + 2;
    a.n[e + 4] = c + 1;
    a.n[e + 5] = c + 3;
    c += 4
  }
  c = y;
  c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, a.la);
  c.bufferData(c.ELEMENT_ARRAY_BUFFER, a.n, c.STATIC_DRAW)
}
o.K = function() {
  this.o = h;
  this.update && this.update(xa);
  if(this.visible) {
    this.transform();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].K()
    }
    a = y;
    a.bindBuffer(a.ARRAY_BUFFER, this.m);
    a.bufferData(a.ARRAY_BUFFER, this.a, a.STATIC_DRAW);
    this.ma && (Eb(this), this.ma = m);
    this.G();
    for(this.o = this.O = this.N = this.i = m;a = this.Z.shift();) {
      this.removeChild(a)
    }
  }else {
    this.o = m
  }
};
o.G = function(a) {
  var b = y, c = za(tb[this.g]), a = a || this.children.length;
  b.bindBuffer(b.ARRAY_BUFFER, this.m);
  b.vertexAttribPointer(c.b.vertexPositionAttribute, 3, b.FLOAT, m, 36, 0);
  if(this.g != S.DEFAULT && this.g == S.TEXTURE) {
    var d;
    if((d = Fa("texture", this.c)) && d.s) {
      b.vertexAttribPointer(c.b.textureCoordAttribute, 2, b.FLOAT, m, 36, 12), b.activeTexture(b.TEXTURE0), b.bindTexture(b.TEXTURE_2D, d.s), b.uniform1i(c.Ha, 0)
    }
  }
  b.vertexAttribPointer(c.b.vertexColorAttribute, 4, b.FLOAT, m, 36, 20);
  b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.la);
  (this.i || this.parent && this.parent.i) && jb(qa, this.d, this.r);
  b.uniformMatrix4fv(c.F, m, this.r);
  b.drawElements(b.TRIANGLES, 6 * a, b.UNSIGNED_SHORT, 0)
};
p("chesterGL.BlockGroup", V);
V.prototype.createBlock = V.prototype.Xa;
V.prototype.addChild = V.prototype.L;
V.prototype.removeChild = V.prototype.removeChild;
V.prototype.removeAllChildren = V.prototype.Qb;
function Fb(a, b) {
  var c = [];
  b ? (c[0] = a[0] + b[0] * W(), c[1] = a[1] + b[1] * W(), c[2] = a[2] + b[2] * W(), c[3] = a[3] + b[3] * W()) : (c[0] = a[0], c[1] = a[1], c[2] = a[2], c[3] = a[3]);
  return c
}
function W() {
  return 2 * Math.random() - 1
}
function Gb(a) {
  this.lb(a);
  V.call(this, this.ra, this.k);
  Eb(this, this.k);
  this.M = this.k / this.D;
  this.U = [];
  this.pb()
}
q(Gb, V);
o = Gb.prototype;
o.k = 0;
o.D = 0;
o.duration = 0;
o.ib = 0;
o.ea = 0;
o.fa = 0;
o.eb = 0;
o.fb = 0;
o.$a = 0;
o.ab = 0;
o.ub = i;
o.I = i;
o.J = i;
o.A = i;
o.B = i;
o.Ua = 0;
o.Ta = 0;
o.ra = i;
o.Na = i;
o.speed = 0;
o.vb = 0;
o.hb = i;
o.nb = 0;
o.ob = 0;
o.xb = 0;
o.yb = 0;
o.U = i;
o.e = 0;
o.M = 0;
o.$ = 0;
o.lb = function(a) {
  "string" === typeof a && (a = JSON.parse(a));
  "object" === typeof a && (this.k = a.maxParticles, this.duration = a.duration, this.D = 1E3 * a.particleLifespan, this.ib = 1E3 * a.particleLifespanVariance, this.ea = a.startParticleSize, this.fa = a.startParticleSizeVariance, this.ub = [a.sourcePositionVariancex, a.sourcePositionVariancey, 0], this.eb = a.finishParticleSize, this.fb = a.finishParticleSizeVariance, this.I = [a.startColorRed, a.startColorGreen, a.startColorBlue, a.startColorAlpha], this.J = [a.startColorVarianceRed, a.startColorVarianceGreen, 
  a.startColorVarianceBlue, a.startColorVarianceAlpha], this.A = [a.finishColorRed, a.finishColorGreen, a.finishColorBlue, a.finishColorAlpha], this.B = [a.finishColorVarianceRed, a.finishColorVarianceGreen, a.finishColorVarianceBlue, a.finishColorVarianceAlpha], this.$a = a.angle, this.ab = a.angleVariance, this.ra = a.textureFileName, this.Na = a.textureImageData, this.speed = a.speed, this.vb = a.speedVariance, this.nb = a.radialAcceleration, this.ob = a.radialAccelVariance, this.xb = a.tangentialAcceleration, 
  this.yb = a.tangentialAccelVariance, this.hb = [a.gravityx, a.gravityy, 0], this.Ua = a.blendFuncSource, this.Ta = a.blendFuncDestination);
  this.Na ? F("texture", "data:image/png;base64," + this.Na, this.ra) : F("texture", this.ra)
};
o.pb = function() {
  for(var a = this.j = 0;a < this.e;a++) {
    this.U[a].D = 0
  }
};
function Hb(a, b, c) {
  var d = 36 * b, b = d + 5, e = c.size / 2, g = c.position;
  a.a[d] = g[0] - e;
  a.a[d + 1] = g[1] - e;
  a.a[d + 2] = g[2];
  a.a[d + 9] = g[0] - e;
  a.a[d + 1 + 9] = g[1] + e;
  a.a[d + 2 + 9] = g[2];
  a.a[d + 18] = g[0] + e;
  a.a[d + 1 + 18] = g[1] - e;
  a.a[d + 2 + 18] = g[2];
  a.a[d + 27] = g[0] + e;
  a.a[d + 1 + 27] = g[1] + e;
  a.a[d + 2 + 27] = g[2];
  c.gb && (c.gb = m, a.a[d + 3] = 0, a.a[d + 3 + 1] = 0, a.a[d + 3 + 9] = 0, a.a[d + 3 + 1 + 9] = 1, a.a[d + 3 + 18] = 1, a.a[d + 3 + 1 + 18] = 0, a.a[d + 3 + 27] = 1, a.a[d + 3 + 1 + 27] = 1);
  for(d = 0;4 > d;d++) {
    a.a[b + 9 * d] = c.color[0], a.a[b + 1 + 9 * d] = c.color[1], a.a[b + 2 + 9 * d] = c.color[2], a.a[b + 3 + 9 * d] = c.color[3]
  }
}
o.ua = function() {
  var a;
  a = Fb(this.I, this.J);
  var b = Fb(this.A, this.B), c = [];
  c[0] = b[0] - a[0];
  c[1] = b[1] - a[1];
  c[2] = b[2] - a[2];
  c[3] = b[3] - a[3];
  var b = Math.max(0, this.ea + this.fa * W()), d = Math.max(0, this.eb + this.fb * W()), e = Math.max(0, this.D + this.ib * W()), g = ub * (this.$a + this.ab * W()), g = [Math.cos(g), Math.sin(g)], j = this.speed + this.vb * W(), k = this.ub, l = [0, 0, 0], n = [];
  k ? (n[0] = l[0] + k[0] * W(), n[1] = l[1] + k[1] * W(), n[2] = l[2] + k[2] * W()) : (n[0] = l[0], n[1] = l[1], n[2] = l[2]);
  k = 1 / e;
  c[0] *= k;
  c[1] *= k;
  c[2] *= k;
  c[3] *= k;
  a = {D:e, position:n, color:a, ja:c, size:b, Ab:(d - b) / e, dir:[g[0] * j, g[1] * j, 0], gb:h, rotation:0, Pb:this.nb + this.ob * W(), Tb:this.xb + this.yb * W()};
  Hb(this, this.e, a);
  this.U[this.e++] = a
};
var Ib = [0, 0, 0];
Gb.prototype.update = function(a) {
  if(this.M) {
    a = a || 1;
    for(this.$ += a;this.e < this.k && this.$ > this.M;) {
      this.ua(), this.$ -= this.M
    }
    this.j += a
  }
  for(var b = 0;b < this.e;) {
    var c = this.U[b];
    c.D -= a;
    if(0 < c.D) {
      var d = [0, 0, 0], e = [0, 0, 0], g = c.position;
      (0 !== g[0] || 0 !== g[1]) && fb(g, d);
      e = [d[0], d[1], d[2]];
      nb(d, c.Pb, d);
      var j = e[0];
      e[0] = -e[1];
      e[1] = j;
      nb(e, c.Tb, e);
      mb(e, d, Ib);
      mb(Ib, this.hb, Ib);
      nb(Ib, a / 1E3, Ib);
      mb(c.dir, Ib, c.dir);
      nb(c.dir, a / 1E3, Ib);
      mb(g, Ib, c.position);
      c.color[0] += c.ja[0] * a;
      c.color[1] += c.ja[1] * a;
      c.color[2] += c.ja[2] * a;
      c.color[3] += c.ja[3] * a;
      c.size += c.Ab * a / 1E3;
      c.size = Math.max(0, c.size);
      Hb(this, b, c);
      b++
    }else {
      b != this.e && (this.U[b] = this.U[this.e - 1]), this.e--
    }
  }
};
Gb.prototype.G = function() {
  var a = y;
  a.blendFunc(a[this.Ua], a[this.Ta]);
  V.prototype.G.call(this, this.e);
  a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA)
};
p("chesterGL.ParticleSystem", Gb);
Gb.prototype.parseProperties = Gb.prototype.lb;
Gb.prototype.resetSystem = Gb.prototype.pb;
function Jb(a) {
  R.call(this, i, 4);
  var b = this;
  F("texture", a.texture, i, function() {
    b.kb(a)
  })
}
q(Jb, R);
var Kb = m;
function Lb() {
  Ca("particles", function(a) {
    var b = y;
    a.F = b.getUniformLocation(a, "uMVPMatrix");
    a.Vb = b.getUniformLocation(a, "uSampler");
    a.Wb = b.getUniformLocation(a, "u_time");
    a.b = {a_startPosition:b.getAttribLocation(a, "a_startPosition"), a_lifetime:b.getAttribLocation(a, "a_lifetime"), a_startTime:b.getAttribLocation(a, "a_startTime"), a_startSize:b.getAttribLocation(a, "a_startSize"), a_endSize:b.getAttribLocation(a, "a_endSize"), a_speed:b.getAttribLocation(a, "a_speed"), a_startColor:b.getAttribLocation(a, "a_startColor"), a_endColor:b.getAttribLocation(a, "a_endColor")};
    a.Sa = m;
    a = b.getError();
    0 !== a && console.log("gl error: " + a)
  });
  Kb = h
}
o = Jb.prototype;
o.H = h;
o.mb = i;
o.M = 0;
o.S = 0;
o.e = 0;
o.k = 0;
o.duration = 0;
o.Aa = 0;
o.jb = 0;
o.I = i;
o.J = i;
o.pa = i;
o.A = i;
o.B = i;
o.na = i;
o.oa = i;
o.ea = 0;
o.fa = 0;
o.bb = 0;
o.cb = 0;
o.Fa = m;
o.elapsedTime = 0;
o.va = ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"];
o.kb = function(a) {
  this.g = -1;
  Kb || Lb();
  this.mb = a.texture;
  this.k = a.maxParticles;
  this.duration = 1E3 * parseFloat(a.duration);
  this.Aa = 1E3 * parseFloat(a.lifetime);
  this.jb = 1E3 * parseFloat(a.lifetimeVariance);
  this.I = ob(a.startColor);
  this.J = ob(a.startColorVariance);
  this.A = ob(a.endColor);
  this.B = ob(a.endColorVariance);
  this.pa = kb(a.positionVariance);
  this.na = kb(a.speed);
  this.oa = kb(a.speedVariance);
  this.ea = parseFloat(a.startSize);
  this.fa = parseFloat(a.startSizeVariance);
  this.bb = parseFloat(a.endSize);
  this.cb = parseFloat(a.endSizeVariance);
  this.elapsedTime = 0;
  this.va = a.blendOptions.slice(0);
  this.H = h;
  this.m || (this.m = y.createBuffer());
  this.a = new Float32Array(18 * this.k);
  for(var a = za("particles"), b = y, c = 0;c < this.k;c++) {
    Mb(this, c)
  }
  b.uniform1i(a.Vb, 0);
  Nb(this, a);
  this.e = this.S = this.elapsedTime = 0;
  this.M = this.k / Math.abs(this.Aa)
};
o.ua = function() {
  var a = Math.abs(this.Aa + this.jb * W());
  Mb(this, this.e++, a, this.elapsedTime);
  this.Fa = h
};
function Mb(a, b, c, d) {
  var e = a.a;
  e[18 * b + 0] = c || -1;
  e[18 * b + 1] = d || 0;
  e[18 * b + 2] = a.ea + a.fa * W();
  e[18 * b + 3] = a.bb + a.cb * W();
  e[18 * b + 4] = a.na[0] + a.oa[0] * W();
  e[18 * b + 5] = a.na[1] + a.oa[1] * W();
  e[18 * b + 6] = a.na[2] + a.oa[2] * W();
  e[18 * b + 7] = W() * a.pa[0];
  e[18 * b + 8] = W() * a.pa[1];
  e[18 * b + 9] = W() * a.pa[2];
  e[18 * b + 10] = Math.max(0, Math.min(1, a.I[0] + W() * a.J[0]));
  e[18 * b + 11] = Math.max(0, Math.min(1, a.I[1] + W() * a.J[1]));
  e[18 * b + 12] = Math.max(0, Math.min(1, a.I[2] + W() * a.J[2]));
  e[18 * b + 13] = Math.max(0, Math.min(1, a.I[3] + W() * a.J[3]));
  e[18 * b + 14] = Math.max(0, Math.min(1, a.A[0] + W() * a.B[0]));
  e[18 * b + 15] = Math.max(0, Math.min(1, a.A[1] + W() * a.B[1]));
  e[18 * b + 16] = Math.max(0, Math.min(1, a.A[2] + W() * a.B[2]));
  e[18 * b + 17] = Math.max(0, Math.min(1, a.A[3] + W() * a.B[3]))
}
function Nb(a, b) {
  var c = y;
  c.bindBuffer(c.ARRAY_BUFFER, a.m);
  b.Sa || (c.vertexAttribPointer(b.b.a_lifetime, 1, c.FLOAT, m, 72, 0), c.vertexAttribPointer(b.b.a_startTime, 1, c.FLOAT, m, 72, 4), c.vertexAttribPointer(b.b.a_startSize, 1, c.FLOAT, m, 72, 8), c.vertexAttribPointer(b.b.a_endSize, 1, c.FLOAT, m, 72, 12), c.vertexAttribPointer(b.b.a_speed, 3, c.FLOAT, m, 72, 16), c.vertexAttribPointer(b.b.a_startPosition, 3, c.FLOAT, m, 72, 28), c.vertexAttribPointer(b.b.a_startColor, 4, c.FLOAT, m, 72, 40), c.vertexAttribPointer(b.b.a_endColor, 4, c.FLOAT, m, 72, 
  56), b.Sa = h);
  c.bufferData(c.ARRAY_BUFFER, a.a, c.STATIC_DRAW)
}
var Ob = new Float32Array(18);
Jb.prototype.update = function(a) {
  if(za("particles")) {
    this.elapsedTime += a;
    var b = 1 / this.M;
    for(this.S += a;this.e < this.k && this.S > b && this.H;) {
      this.ua(), this.S -= b
    }
    for(a = 0;a < this.k;a++) {
      var b = this.a, c = 18 * a;
      if(0 < b[c] && b[c] + b[c + 1] <= this.elapsedTime && a != this.e - 1) {
        var d = b.subarray(c, c + 18);
        Ob.set(d);
        Ob[0] = -1;
        d = b.subarray(c + 18, 18 * this.e);
        b.set(d, c);
        b.set(Ob, 18 * (this.e - 1));
        this.e--
      }
    }
    0 < this.duration && this.elapsedTime > this.duration && (this.H = m)
  }
};
Jb.prototype.G = function() {
  var a = za("particles");
  if(a) {
    var b = y, c = Fa("texture", this.mb);
    b.blendFunc(b[this.va[0]], b[this.va[1]]);
    b.uniform1f(a.Wb, this.elapsedTime);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, c.s);
    this.Fa ? (Nb(this, a), this.Fa = m) : b.bindBuffer(b.ARRAY_BUFFER, this.m);
    (this.i || this.parent && this.parent.i) && jb(qa, this.d, this.r);
    b.uniformMatrix4fv(a.F, m, this.r);
    b.drawArrays(b.POINTS, 0, this.k);
    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA)
  }
};
p("chesterGL.GPUParticleSystem", Jb);
Jb.loadShaders = Lb;
Jb.prototype.loadProperties = Jb.prototype.kb;
function X(a, b) {
  this.totalTime = a;
  this.l = b;
  this.j = 0
}
o = X.prototype;
o.Q = 0;
o.l = i;
o.totalTime = 0;
o.j = 0;
o.C = m;
o.H = m;
o.update = function(a) {
  this.j += a;
  0 < this.totalTime && this.j >= this.totalTime && this.stop()
};
o.t = function() {
  this.H = h
};
o.stop = function() {
  this.C = h;
  this.H = m
};
o.reset = function() {
  this.C = this.H = m;
  this.j = 0
};
function Y(a, b, c, d) {
  X.call(this, b, d);
  this.ia = kb(a);
  this.za = void 0 !== c ? c === h : h;
  this.Ma = new Float32Array(3);
  this.aa = new Float32Array(3)
}
q(Y, X);
Y.prototype.ia = i;
Y.prototype.aa = i;
Y.prototype.za = h;
Y.prototype.Ma = i;
var Pb = new Float32Array(3);
Y.prototype.update = function(a) {
  X.prototype.update.call(this, a);
  var a = this.l, b = this.Ma, c = this.aa, d = Math.min(1, this.j / this.totalTime), e = b[0], g = b[1], b = b[2];
  Pb[0] = (c[0] - e) * d + e;
  Pb[1] = (c[1] - g) * d + g;
  Pb[2] = (c[2] - b) * d + b;
  a.ca(Pb[0], Pb[1], Pb[2])
};
Y.prototype.t = function() {
  X.prototype.t.call(this);
  this.l || f("invalid move action! - no block");
  this.za ? mb(this.ia, this.l.position, this.aa) : lb(this.aa, this.ia);
  lb(this.Ma, this.l.position)
};
Y.prototype.stop = function() {
  X.prototype.stop.call(this);
  this.j >= this.totalTime && this.l.ca(this.aa)
};
Y.prototype.reverse = function() {
  this.za || f("This only works on relative movements");
  var a = [], b = this.ia;
  a[0] = -b[0];
  a[1] = -b[1];
  a[2] = -b[2];
  return new Y(a, this.totalTime, h)
};
function Qb(a, b, c) {
  this.Va = a;
  this.Ra = c;
  this.fired = m;
  X.call(this, b || 1)
}
q(Qb, X);
Qb.prototype.Va = i;
Qb.prototype.Ra = i;
Qb.prototype.update = function(a) {
  X.prototype.update.call(this, a);
  this.C && !this.fired && (this.fired = h, this.Va.call(i, this.Ra))
};
Qb.prototype.reset = function() {
  X.prototype.reset.call(this);
  this.fired = m
};
function Rb(a, b) {
  X.call(this, a.totalTime + b.totalTime);
  this.p = [a, b]
}
q(Rb, X);
o = Rb.prototype;
o.p = i;
o.wa = 0;
o.wb = 0;
o.t = function() {
  X.prototype.t.call(this);
  this.wb = this.p[0].totalTime;
  this.l.Ga(this.p[0])
};
o.reset = function() {
  X.prototype.reset.call(this);
  this.wa = 0;
  this.p[0].reset();
  this.p[1].reset();
  I.sa(this.p[0].Q);
  I.sa(this.p[1].Q)
};
o.update = function(a) {
  X.prototype.update.call(this, a);
  0 === this.wa && this.j >= this.wb && (this.p[0].stop(), this.wa = 1, this.l.Ga(this.p[1]))
};
function Sb(a, b) {
  this.Da = b || 1;
  this.Oa = 0;
  this.action = a;
  X.call(this, a.totalTime)
}
q(Sb, X);
o = Sb.prototype;
o.Da = 0;
o.Oa = 0;
o.action = i;
o.t = function() {
  X.prototype.t.call(this);
  I.Ia(this.action)
};
o.update = function(a) {
  X.prototype.update.call(this, a);
  if(this.C && (0 > this.Da || this.Oa < this.Da)) {
    this.action.update(a), this.Oa++, this.reset(), I.sa(this.action.Q), this.action.reset(), this.t()
  }
};
function Tb(a, b, c, d) {
  this.delay = a;
  a *= b.length;
  c === h && (a = -1);
  X.call(this, a, d);
  this.tb = c === h;
  this.frames = b.slice(0)
}
q(Tb, X);
o = Tb.prototype;
o.R = 0;
o.delay = 0;
o.frames = i;
o.tb = m;
o.update = function(a) {
  X.prototype.update.call(this, a);
  a = this.l;
  this.C ? (this.R = this.frames.length - 1, a.W(this.frames[this.R])) : this.j >= this.delay * this.R && (a.W(this.frames[this.R++]), this.R == this.frames.length && (this.tb ? this.j = this.R = 0 : this.C = h))
};
function Ub(a, b, c, d) {
  this.Qa = a;
  this.Ya = b;
  X.call(this, c, d)
}
q(Ub, X);
Ub.prototype.Qa = 0;
Ub.prototype.Ya = 0;
Ub.prototype.update = function(a) {
  X.prototype.update.call(this, a);
  this.C ? this.l.La(0) : this.l.La(this.Qa * Math.sin(2 * (this.j / 1E3 * this.Ya) * Math.PI / (this.totalTime / 1E3)))
};
var I = {P:[], Ja:[], Lb:0, Ia:function(a) {
  I.P.push(a);
  a.Q = I.Lb++;
  a.t();
  return a.Q
}, sa:function(a) {
  for(var b = I.P.length, c = 0;c < b;c++) {
    var d = I.P[c];
    if(d.Q == a) {
      I.Ja.push(d);
      break
    }
  }
}, Ub:function(a) {
  for(var b = 0, c = I.P.length, d = i, b = 0;b < c;b++) {
    d = I.P[b], d.H && d.update(a), d.C && I.Ja.push(d)
  }
  for(;d = I.Ja.pop();) {
    a = I.P.indexOf(d), 0 <= a && I.P.splice(a, 1)
  }
}};
R.prototype.Ga = function(a) {
  a.l = this;
  I.Ia(a)
};
p("chesterGL.ActionManager", I);
p("chesterGL.MoveAction", Y);
p("chesterGL.CallbackAction", Qb);
p("chesterGL.SequenceAction", Rb);
p("chesterGL.RepeatAction", Sb);
p("chesterGL.AnimateAction", Tb);
p("chesterGL.WiggleAction", Ub);
I.scheduleAction = I.Ia;
I.unscheduleAction = I.sa;
Rb.createSequence = function(a) {
  0 === arguments.length && f("Needs at least one action to create a sequence!");
  for(var b = arguments[0], c = 1;c < arguments.length;c++) {
    b = new Rb(b, arguments[c])
  }
  return b
};
R.prototype.runAction = R.prototype.Ga;
X.prototype.stop = X.prototype.stop;
Y.prototype.stop = Y.prototype.stop;
Rb.prototype.stop = Rb.prototype.stop;
Sb.prototype.stop = Sb.prototype.stop;
Y.prototype.reverse = Y.prototype.reverse;
var U = {frames:{}, Ob:function(a) {
  if(a.meta && "1.0" == a.meta.version) {
    var b = a.meta.image;
    F("texture", b, i, function(c) {
      var c = c.height, d = a.frames, e;
      for(e in d) {
        var g = d[e], j = {frame:{}, c:""};
        j.frame = qb(g.frame.x, c - (g.frame.y + g.frame.h), g.frame.w, g.frame.h);
        j.c = b;
        U.frames[e] = j
      }
    })
  }else {
    f("Unkown json data")
  }
}, Db:function(a, b) {
  z.frameset[a.name].data = b;
  return h
}, ka:function(a) {
  return U.frames[a]
}, Nb:function(a) {
  F("frameset", {url:a, dataType:"json"}, i, function(a) {
    U.Ob(a)
  })
}};
ta.frameset = U.Db;
p("chesterGL.BlockFrames", U);
U.getFrame = U.ka;
U.loadFrames = U.Nb;
function T(a, b) {
  v || f("PrimitiveBlock only works on WebGL mode");
  this.Ca = a || 500;
  this.Ba = b || 500;
  R.call(this, i, K.PRIMITIVE);
  var c = y;
  this.ya = c.createBuffer();
  this.q = new Float32Array(7 * this.Ca);
  this.xa = c.createBuffer();
  this.f = new Float32Array(14 * this.Ba);
  this.g = S.DEFAULT
}
q(T, R);
o = T.prototype;
o.ya = i;
o.q = i;
o.xa = i;
o.f = i;
o.Ba = 0;
o.v = 0;
o.Ca = 0;
o.z = 0;
o.V = [];
o.Cb = function(a, b, c) {
  if(this.z < this.Ca) {
    var d = 7 * this.z, c = c || [1, 1, 1, 1];
    this.q[d + 0] = a;
    this.q[d + 1] = b;
    this.q[d + 2] = 0;
    this.q[d + 3] = c[0];
    this.q[d + 4] = c[1];
    this.q[d + 5] = c[2];
    this.q[d + 6] = c[3];
    this.z++
  }else {
    f("too many points!")
  }
};
o.Bb = function(a, b, c, d, e) {
  if(this.v < this.Ba) {
    var g = 14 * this.v, e = e || [1, 1, 1, 1];
    this.f[g + 0] = a;
    this.f[g + 1] = b;
    this.f[g + 2] = 0;
    this.f[g + 3] = e[0];
    this.f[g + 4] = e[1];
    this.f[g + 5] = e[2];
    this.f[g + 6] = e[3];
    this.f[g + 7] = c;
    this.f[g + 8] = d;
    this.f[g + 9] = 0;
    this.f[g + 10] = e[0];
    this.f[g + 11] = e[1];
    this.f[g + 12] = e[2];
    this.f[g + 13] = e[3];
    this.v++
  }else {
    f("too many lines!")
  }
};
o.Za = function(a, b, c, d) {
  for(var b = b || [1, 1, 1, 1], c = c || m, d = d || m, e = a.length, g = y, j = new Float32Array(7 * a.length), k = g.createBuffer(), l = 0;l < e;l++) {
    var n = a[l];
    j[7 * l + 0] = n[0];
    j[7 * l + 1] = n[1];
    j[7 * l + 2] = n[2];
    j[7 * l + 3] = b[0];
    j[7 * l + 4] = b[1];
    j[7 * l + 5] = b[2];
    j[7 * l + 6] = b[3]
  }
  g.bindBuffer(g.ARRAY_BUFFER, k);
  g.bufferData(g.ARRAY_BUFFER, j, g.STATIC_DRAW);
  this.V.unshift([j, k, c, d])
};
o.K = function() {
  this.v = this.z = 0;
  0 < this.V.length && (this.V = []);
  R.prototype.K.call(this)
};
o.G = function() {
  var a = y, b = za(tb[this.g]);
  if(0 < this.z || 0 < this.v || 0 < this.V.length) {
    jb(qa, this.d, this.r), a.uniformMatrix4fv(b.F, m, this.r)
  }
  if(0 < this.z) {
    var c = y, d = 7 * this.z;
    c.bindBuffer(c.ARRAY_BUFFER, this.ya);
    c.bufferData(c.ARRAY_BUFFER, this.q.subarray(0, d), c.STATIC_DRAW);
    a.bindBuffer(a.ARRAY_BUFFER, this.ya);
    a.vertexAttribPointer(b.b.vertexPositionAttribute, 3, a.FLOAT, m, 28, 0);
    a.vertexAttribPointer(b.b.vertexColorAttribute, 4, a.FLOAT, m, 28, 12);
    a.drawArrays(a.POINTS, 0, this.z)
  }
  0 < this.v && (c = y, d = 14 * this.v, c.bindBuffer(c.ARRAY_BUFFER, this.xa), c.bufferData(c.ARRAY_BUFFER, this.f.subarray(0, d), c.STATIC_DRAW), a.bindBuffer(a.ARRAY_BUFFER, this.xa), a.vertexAttribPointer(b.b.vertexPositionAttribute, 3, a.FLOAT, m, 28, 0), a.vertexAttribPointer(b.b.vertexColorAttribute, 4, a.FLOAT, m, 28, 12), a.drawArrays(a.LINES, 0, 2 * this.v));
  c = this.V.length;
  if(0 < c) {
    for(d = 0;d < c;d++) {
      var e = this.V[d];
      a.bindBuffer(a.ARRAY_BUFFER, e[1]);
      a.vertexAttribPointer(b.b.vertexPositionAttribute, 3, a.FLOAT, m, 28, 0);
      a.vertexAttribPointer(b.b.vertexColorAttribute, 4, a.FLOAT, m, 28, 12);
      e[2] ? a.drawArrays(a.LINE_LOOP, 0, e[0].length / 7) : a.drawArrays(a.LINE_STRIP, 0, e[0].length / 7)
    }
  }
};
p("chesterGL.PrimitiveBlock", T);
T.prototype.drawPoint = T.prototype.Cb;
T.prototype.drawLine = T.prototype.Bb;
T.prototype.drawPolygon = T.prototype.Za;
var Vb, Wb, Xb, Yb;
function Zb() {
  return ba.navigator ? ba.navigator.userAgent : i
}
Yb = Xb = Wb = Vb = m;
var $b;
if($b = Zb()) {
  var ac = ba.navigator;
  Vb = 0 == $b.indexOf("Opera");
  Wb = !Vb && -1 != $b.indexOf("MSIE");
  Xb = !Vb && -1 != $b.indexOf("WebKit");
  Yb = !Vb && !Xb && "Gecko" == ac.product
}
var bc = Wb, cc = Yb, dc = Xb;
var ec;
if(Vb && ba.opera) {
  var fc = ba.opera.version;
  "function" == typeof fc && fc()
}else {
  cc ? ec = /rv\:([^\);]+)(\)|;)/ : bc ? ec = /MSIE\s+([^\);]+)(\)|;)/ : dc && (ec = /WebKit\/(\S+)/), ec && ec.exec(Zb())
}
;var gc = i, hc = i;
function ic(a) {
  (a = jc[a]) || f("Invalid map - make sure you call loadTMX first");
  R.call(this, i, K.TMXBLOCK);
  for(var b = 0;b < a.layers.length;b++) {
    for(var c = a.layers[b], d = (v && c.blocks.length > 0) ? new V(i, c.blocks.length) : new R, e = i, g = 0;g < c.blocks.length;g++) {
      var j = c.blocks[g];
      e || (e = kc(a.tilesets, j.gid), d.da(e.texture));
      var k;
      v ? k = d.Xa(j.frame) : (k = new R(j.frame), k.da(e.texture));
      k.ca(j.position);
      d.L(k)
    }
    this.L(d)
  }
}
q(ic, R);
ic.prototype.G = function() {
};
var jc = {};
function kc(a, b) {
  for(var c = a[0], d = 1;d < a.length;d++) {
    var e = a[d];
    b >= e.firstgid && (c = e)
  }
  return c
}
ta.tmx = function(a, b) {
  z.tmx[a.name].data = b;
  return h
};
p("chesterGL.TMXBlock", ic);
p("chesterGL.TMXBlock.maps", jc);
ic.loadTMX = function(a) {
  F("tmx", {url:a, dataType:"xml"}, i, function(b) {
    var c = {}, b = $(b).find("map"), d = b.attr("orientation");
    c.tilesets = [];
    b.find("tileset").each(function(a, b) {
      var d = $(b);
      if("obstruction" != d.attr("name")) {
        var k = {};
        k.tileSize = new J(parseInt(d.attr("tilewidth"), 10), parseInt(d.attr("tileheight"), 10));
        d.attr("spacing") && (k.spacing = parseInt(d.attr("spacing"), 10));
        d.attr("margin") && (k.margin = parseInt(d.attr("margin"), 10));
        var l = d.find("image").first();
        k.imgSize = new J(parseInt(l.attr("width"), 10), parseInt(l.attr("height"), 10));
        k.texture = l.attr("source");
        k.firstgid = parseInt(d.attr("firstgid"), 10);
		k.tiles = [];
		d.find("tile").each(function(a, b) {
			var d = $(b);
			var props = {};
			d.find("properties property").each(function (a, b) {
				var e = $(b);
				props[e.attr("name")] = e.attr("value");
			});
			k.tiles[d.attr("id")] = props;
		});
        c.tilesets.push(k)
      }
    });
    c.mapTileSize = new J(parseInt(b.attr("tilewidth"), 10), parseInt(b.attr("tileheight"), 10));
    c.layers = [];
    b.find("layer, objectgroup").each(function(a, b) {
      if("0" != $(b).attr("visible")) {
        var j = {blocks:[], hashBlocks:[]}, k = new J(parseInt($(b).attr("width"), 10), parseInt($(b).attr("height"), 10)), l = $(b).find("data").first();
        if(l) {
          $(b).is('layer') && ("base64" != l.attr("encoding") || l.attr("compression")) && f("Invalid TMX Data");
          var n = l.text().trim();
          if(!gc) {
            gc = {};
            hc = {};
            for(l = 0;65 > l;l++) {
              gc[l] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l), hc[gc[l]] = l
            }
          }
          for(var r = hc, l = [], t = 0;t < n.length;) {
            var A = r[n.charAt(t++)], B = t < n.length ? r[n.charAt(t)] : 0;
            ++t;
            var w = t < n.length ? r[n.charAt(t)] : 0;
            ++t;
            var x = t < n.length ? r[n.charAt(t)] : 0;
            ++t;
            (A == i || B == i || w == i || x == i) && f(Error());
            l.push(A << 2 | B >> 4);
            64 != w && (l.push(B << 4 & 240 | w >> 2), 64 != x && l.push(w << 6 & 192 | x))
          }
          n = 0;
          r = i;
          for(t = 0;t < k.height;t++) {
            for(A = 0;A < k.width;A++) {
              var u = l[n + 3] << 24 | l[n + 2] << 16 | l[n + 1] << 8 | l[n + 0] >>> 0;
              if(0 !== u) {
                r || (r = kc(c.tilesets, u));
                B = {};
                B.gid = u;
                var C = r.margin || 0, G = r.spacing || 0, w = r.tileSize, O = r.imgSize, x = c.mapTileSize, P = parseInt((O.width - 2 * C + G) / (w.width + G), 10), u = u - r.firstgid, u = qb(u % P * (w.width + G) + C, O.height - w.height - C - G - parseInt(u / P, 10) * (w.height + G) + C, w.width, w.height);
                B.frame = u;
                var L, M;
                "orthogonal" == d ? (L = A * x.width + w.width / 2, M = (k.height - t - 1) * x.height + w.height / 2) : "isometric" == d ? (L = x.width / 2 * (k.width + A - t - 1) + w.width / 2, M = x.height / 2 * (2 * k.height - A - t - 2) + w.height / 2) : f("Invalid orientation");
                B.position = [L, M, 0];
				B.props = r.tiles[B.gid - r.firstgid];
				j.blocks.push(B);
				j.hashBlocks[t*k.width + A] = B;
              }
              n += 4
            }
          }
        }else {
          //f("No data for layer!")
        }
        c.layers.push(j)
      }
    });
    jc[a] = c
  })
};

//@ sourceMappingURL=chester.js.map
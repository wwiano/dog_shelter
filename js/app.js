/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      2: function (t, e, n) {
        var o, a;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (t) {
            var e,
              n = (this.document || this.ownerDocument).querySelectorAll(t),
              o = this;
            do {
              for (e = n.length; 0 <= --e && n.item(e) !== o; );
            } while (e < 0 && (o = o.parentElement));
            return o;
          }),
          (function () {
            function t(t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
              var n = document.createEvent("CustomEvent");
              return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n;
            }
            "function" != typeof window.CustomEvent &&
              ((t.prototype = window.Event.prototype),
              (window.CustomEvent = t));
          })(),
          (function () {
            for (
              var t = 0, e = ["ms", "moz", "webkit", "o"], n = 0;
              n < e.length && !window.requestAnimationFrame;
              ++n
            )
              (window.requestAnimationFrame =
                window[e[n] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[e[n] + "CancelAnimationFrame"] ||
                  window[e[n] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (e, n) {
                var o = new Date().getTime(),
                  a = Math.max(0, 16 - (o - t)),
                  r = window.setTimeout(function () {
                    e(o + a);
                  }, a);
                return (t = o + a), r;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                  clearTimeout(t);
                });
          })(),
          (a =
            void 0 !== n.g
              ? n.g
              : "undefined" != typeof window
              ? window
              : this),
          (o = function () {
            return (function (t) {
              "use strict";
              var e = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                n = function () {
                  var t = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (e) {
                      for (var n in e) {
                        if (!e.hasOwnProperty(n)) return;
                        t[n] = e[n];
                      }
                    }),
                    t
                  );
                },
                o = function (t) {
                  "#" === t.charAt(0) && (t = t.substr(1));
                  for (
                    var e,
                      n = String(t),
                      o = n.length,
                      a = -1,
                      r = "",
                      i = n.charCodeAt(0);
                    ++a < o;

                  ) {
                    if (0 === (e = n.charCodeAt(a)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    r +=
                      (1 <= e && e <= 31) ||
                      127 == e ||
                      (0 === a && 48 <= e && e <= 57) ||
                      (1 === a && 48 <= e && e <= 57 && 45 === i)
                        ? "\\" + e.toString(16) + " "
                        : 128 <= e ||
                          45 === e ||
                          95 === e ||
                          (48 <= e && e <= 57) ||
                          (65 <= e && e <= 90) ||
                          (97 <= e && e <= 122)
                        ? n.charAt(a)
                        : "\\" + n.charAt(a);
                  }
                  return "#" + r;
                },
                a = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                r = function (e) {
                  return e
                    ? ((n = e),
                      parseInt(t.getComputedStyle(n).height, 10) + e.offsetTop)
                    : 0;
                  var n;
                },
                i = function (e, n, o) {
                  0 === e && document.body.focus(),
                    o ||
                      (e.focus(),
                      document.activeElement !== e &&
                        (e.setAttribute("tabindex", "-1"),
                        e.focus(),
                        (e.style.outline = "none")),
                      t.scrollTo(0, n));
                },
                s = function (e, n, o, a) {
                  if (n.emitEvents && "function" == typeof t.CustomEvent) {
                    var r = new CustomEvent(e, {
                      bubbles: !0,
                      detail: { anchor: o, toggle: a },
                    });
                    document.dispatchEvent(r);
                  }
                };
              return function (l, c) {
                var d,
                  u,
                  h,
                  m,
                  p = {
                    cancelScroll: function (t) {
                      cancelAnimationFrame(m),
                        (m = null),
                        t || s("scrollCancel", d);
                    },
                    animateScroll: function (o, l, c) {
                      p.cancelScroll();
                      var u = n(d || e, c || {}),
                        f =
                          "[object Number]" ===
                          Object.prototype.toString.call(o),
                        g = f || !o.tagName ? null : o;
                      if (f || g) {
                        var y = t.pageYOffset;
                        u.header &&
                          !h &&
                          (h = document.querySelector(u.header));
                        var w,
                          v,
                          b,
                          A,
                          S,
                          L,
                          E,
                          q,
                          x = r(h),
                          C = f
                            ? o
                            : (function (e, n, o, r) {
                                var i = 0;
                                if (e.offsetParent)
                                  for (
                                    ;
                                    (i += e.offsetTop), (e = e.offsetParent);

                                  );
                                return (
                                  (i = Math.max(i - n - o, 0)),
                                  r && (i = Math.min(i, a() - t.innerHeight)),
                                  i
                                );
                              })(
                                g,
                                x,
                                parseInt(
                                  "function" == typeof u.offset
                                    ? u.offset(o, l)
                                    : u.offset,
                                  10
                                ),
                                u.clip
                              ),
                          O = C - y,
                          _ = a(),
                          I = 0,
                          k =
                            ((w = O),
                            (b = (v = u).speedAsDuration
                              ? v.speed
                              : Math.abs((w / 1e3) * v.speed)),
                            v.durationMax && b > v.durationMax
                              ? v.durationMax
                              : v.durationMin && b < v.durationMin
                              ? v.durationMin
                              : parseInt(b, 10)),
                          W = function (e) {
                            var n, a, r;
                            A || (A = e),
                              (I += e - A),
                              (L =
                                y +
                                O *
                                  ((a = S =
                                    1 < (S = 0 === k ? 0 : I / k) ? 1 : S),
                                  "easeInQuad" === (n = u).easing &&
                                    (r = a * a),
                                  "easeOutQuad" === n.easing &&
                                    (r = a * (2 - a)),
                                  "easeInOutQuad" === n.easing &&
                                    (r =
                                      a < 0.5
                                        ? 2 * a * a
                                        : (4 - 2 * a) * a - 1),
                                  "easeInCubic" === n.easing && (r = a * a * a),
                                  "easeOutCubic" === n.easing &&
                                    (r = --a * a * a + 1),
                                  "easeInOutCubic" === n.easing &&
                                    (r =
                                      a < 0.5
                                        ? 4 * a * a * a
                                        : (a - 1) * (2 * a - 2) * (2 * a - 2) +
                                          1),
                                  "easeInQuart" === n.easing &&
                                    (r = a * a * a * a),
                                  "easeOutQuart" === n.easing &&
                                    (r = 1 - --a * a * a * a),
                                  "easeInOutQuart" === n.easing &&
                                    (r =
                                      a < 0.5
                                        ? 8 * a * a * a * a
                                        : 1 - 8 * --a * a * a * a),
                                  "easeInQuint" === n.easing &&
                                    (r = a * a * a * a * a),
                                  "easeOutQuint" === n.easing &&
                                    (r = 1 + --a * a * a * a * a),
                                  "easeInOutQuint" === n.easing &&
                                    (r =
                                      a < 0.5
                                        ? 16 * a * a * a * a * a
                                        : 1 + 16 * --a * a * a * a * a),
                                  n.customEasing && (r = n.customEasing(a)),
                                  r || a)),
                              t.scrollTo(0, Math.floor(L)),
                              (function (e, n) {
                                var a = t.pageYOffset;
                                if (
                                  e == n ||
                                  a == n ||
                                  (y < n && t.innerHeight + a) >= _
                                )
                                  return (
                                    p.cancelScroll(!0),
                                    i(o, n, f),
                                    s("scrollStop", u, o, l),
                                    !(m = A = null)
                                  );
                              })(L, C) ||
                                ((m = t.requestAnimationFrame(W)), (A = e));
                          };
                        0 === t.pageYOffset && t.scrollTo(0, 0),
                          (E = o),
                          (q = u),
                          f ||
                            (history.pushState &&
                              q.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(q),
                                  anchor: E.id,
                                },
                                document.title,
                                E === document.documentElement
                                  ? "#top"
                                  : "#" + E.id
                              )),
                          "matchMedia" in t &&
                          t.matchMedia("(prefers-reduced-motion)").matches
                            ? i(o, Math.floor(C), !1)
                            : (s("scrollStart", u, o, l),
                              p.cancelScroll(!0),
                              t.requestAnimationFrame(W));
                      }
                    },
                  },
                  f = function (e) {
                    if (
                      !e.defaultPrevented &&
                      !(
                        0 !== e.button ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      ) &&
                      "closest" in e.target &&
                      (u = e.target.closest(l)) &&
                      "a" === u.tagName.toLowerCase() &&
                      !e.target.closest(d.ignore) &&
                      u.hostname === t.location.hostname &&
                      u.pathname === t.location.pathname &&
                      /#/.test(u.href)
                    ) {
                      var n, a;
                      try {
                        n = o(decodeURIComponent(u.hash));
                      } catch (e) {
                        n = o(u.hash);
                      }
                      if ("#" === n) {
                        if (!d.topOnEmptyHash) return;
                        a = document.documentElement;
                      } else a = document.querySelector(n);
                      (a = a || "#top" !== n ? a : document.documentElement) &&
                        (e.preventDefault(),
                        (function (e) {
                          if (
                            history.replaceState &&
                            e.updateURL &&
                            !history.state
                          ) {
                            var n = t.location.hash;
                            (n = n || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(e),
                                  anchor: n || t.pageYOffset,
                                },
                                document.title,
                                n || t.location.href
                              );
                          }
                        })(d),
                        p.animateScroll(a, u));
                    }
                  },
                  g = function (t) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(d)
                    ) {
                      var e = history.state.anchor;
                      ("string" == typeof e &&
                        e &&
                        !(e = document.querySelector(
                          o(history.state.anchor)
                        ))) ||
                        p.animateScroll(e, null, { updateURL: !1 });
                    }
                  };
                return (
                  (p.destroy = function () {
                    d &&
                      (document.removeEventListener("click", f, !1),
                      t.removeEventListener("popstate", g, !1),
                      p.cancelScroll(),
                      (m = h = u = d = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in t &&
                        "requestAnimationFrame" in t &&
                        "closest" in t.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    p.destroy(),
                      (d = n(e, c || {})),
                      (h = d.header ? document.querySelector(d.header) : null),
                      document.addEventListener("click", f, !1),
                      d.updateURL &&
                        d.popstate &&
                        t.addEventListener("popstate", g, !1);
                  })(),
                  p
                );
              };
            })(a);
          }.apply(e, [])),
          void 0 === o || (t.exports = o);
      },
    },
    e = {};
  function n(o) {
    var a = e[o];
    if (void 0 !== a) return a.exports;
    var r = (e[o] = { exports: {} });
    return t[o].call(r.exports, r, r.exports, n), r.exports;
  }
  (n.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      function t(t) {
        this.type = t;
      }
      (t.prototype.init = function () {
        const t = this;
        (this.??bjects = []),
          (this.daClassname = "_dynamic_adapt_"),
          (this.nodes = document.querySelectorAll("[data-da]"));
        for (let t = 0; t < this.nodes.length; t++) {
          const e = this.nodes[t],
            n = e.dataset.da.trim().split(","),
            o = {};
          (o.element = e),
            (o.parent = e.parentNode),
            (o.destination = document.querySelector(n[0].trim())),
            (o.breakpoint = n[1] ? n[1].trim() : "767"),
            (o.place = n[2] ? n[2].trim() : "last"),
            (o.index = this.indexInParent(o.parent, o.element)),
            this.??bjects.push(o);
        }
        this.arraySort(this.??bjects),
          (this.mediaQueries = Array.prototype.map.call(
            this.??bjects,
            function (t) {
              return (
                "(" +
                this.type +
                "-width: " +
                t.breakpoint +
                "px)," +
                t.breakpoint
              );
            },
            this
          )),
          (this.mediaQueries = Array.prototype.filter.call(
            this.mediaQueries,
            function (t, e, n) {
              return Array.prototype.indexOf.call(n, t) === e;
            }
          ));
        for (let e = 0; e < this.mediaQueries.length; e++) {
          const n = this.mediaQueries[e],
            o = String.prototype.split.call(n, ","),
            a = window.matchMedia(o[0]),
            r = o[1],
            i = Array.prototype.filter.call(this.??bjects, function (t) {
              return t.breakpoint === r;
            });
          a.addListener(function () {
            t.mediaHandler(a, i);
          }),
            this.mediaHandler(a, i);
        }
      }),
        (t.prototype.mediaHandler = function (t, e) {
          if (t.matches)
            for (let t = 0; t < e.length; t++) {
              const n = e[t];
              (n.index = this.indexInParent(n.parent, n.element)),
                this.moveTo(n.place, n.element, n.destination);
            }
          else
            for (let t = e.length - 1; t >= 0; t--) {
              const n = e[t];
              n.element.classList.contains(this.daClassname) &&
                this.moveBack(n.parent, n.element, n.index);
            }
        }),
        (t.prototype.moveTo = function (t, e, n) {
          e.classList.add(this.daClassname),
            "last" === t || t >= n.children.length
              ? n.insertAdjacentElement("beforeend", e)
              : "first" !== t
              ? n.children[t].insertAdjacentElement("beforebegin", e)
              : n.insertAdjacentElement("afterbegin", e);
        }),
        (t.prototype.moveBack = function (t, e, n) {
          e.classList.remove(this.daClassname),
            void 0 !== t.children[n]
              ? t.children[n].insertAdjacentElement("beforebegin", e)
              : t.insertAdjacentElement("beforeend", e);
        }),
        (t.prototype.indexInParent = function (t, e) {
          const n = Array.prototype.slice.call(t.children);
          return Array.prototype.indexOf.call(n, e);
        }),
        (t.prototype.arraySort = function (t) {
          "min" === this.type
            ? Array.prototype.sort.call(t, function (t, e) {
                return t.breakpoint === e.breakpoint
                  ? t.place === e.place
                    ? 0
                    : "first" === t.place || "last" === e.place
                    ? -1
                    : "last" === t.place || "first" === e.place
                    ? 1
                    : t.place - e.place
                  : t.breakpoint - e.breakpoint;
              })
            : Array.prototype.sort.call(t, function (t, e) {
                return t.breakpoint === e.breakpoint
                  ? t.place === e.place
                    ? 0
                    : "first" === t.place || "last" === e.place
                    ? 1
                    : "last" === t.place || "first" === e.place
                    ? -1
                    : e.place - t.place
                  : e.breakpoint - t.breakpoint;
              });
        });
      new t("max").init();
      let e = (t, e = 500, n = 0) => {
          t.classList.contains("_slide") ||
            (t.classList.add("_slide"),
            (t.style.transitionProperty = "height, margin, padding"),
            (t.style.transitionDuration = e + "ms"),
            (t.style.height = `${t.offsetHeight}px`),
            t.offsetHeight,
            (t.style.overflow = "hidden"),
            (t.style.height = n ? `${n}px` : "0px"),
            (t.style.paddingTop = 0),
            (t.style.paddingBottom = 0),
            (t.style.marginTop = 0),
            (t.style.marginBottom = 0),
            window.setTimeout(() => {
              (t.hidden = !n),
                !n && t.style.removeProperty("height"),
                t.style.removeProperty("padding-top"),
                t.style.removeProperty("padding-bottom"),
                t.style.removeProperty("margin-top"),
                t.style.removeProperty("margin-bottom"),
                !n && t.style.removeProperty("overflow"),
                t.style.removeProperty("transition-duration"),
                t.style.removeProperty("transition-property"),
                t.classList.remove("_slide");
            }, e));
        },
        o = (t, e = 500, n = 0) => {
          if (!t.classList.contains("_slide")) {
            t.classList.add("_slide"),
              (t.hidden = !t.hidden && null),
              n && t.style.removeProperty("height");
            let o = t.offsetHeight;
            (t.style.overflow = "hidden"),
              (t.style.height = n ? `${n}px` : "0px"),
              (t.style.paddingTop = 0),
              (t.style.paddingBottom = 0),
              (t.style.marginTop = 0),
              (t.style.marginBottom = 0),
              t.offsetHeight,
              (t.style.transitionProperty = "height, margin, padding"),
              (t.style.transitionDuration = e + "ms"),
              (t.style.height = o + "px"),
              t.style.removeProperty("padding-top"),
              t.style.removeProperty("padding-bottom"),
              t.style.removeProperty("margin-top"),
              t.style.removeProperty("margin-bottom"),
              window.setTimeout(() => {
                t.style.removeProperty("height"),
                  t.style.removeProperty("overflow"),
                  t.style.removeProperty("transition-duration"),
                  t.style.removeProperty("transition-property"),
                  t.classList.remove("_slide");
              }, e);
          }
        },
        a = !0,
        r = (t = 500) => {
          let e = document.querySelector("body");
          if (a) {
            let n = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let t = 0; t < n.length; t++) {
                n[t].style.paddingRight = "0px";
              }
              (e.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, t),
              (a = !1),
              setTimeout(function () {
                a = !0;
              }, t);
          }
        },
        i = (t = 500) => {
          let e = document.querySelector("body");
          if (a) {
            let n = document.querySelectorAll("[data-lp]");
            for (let t = 0; t < n.length; t++) {
              n[t].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (e.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (a = !1),
              setTimeout(function () {
                a = !0;
              }, t);
          }
        };
      function s(t) {
        setTimeout(() => {
          window.FLS && console.log(t);
        }, 0);
      }
      function l(t) {
        return t.filter(function (t, e, n) {
          return n.indexOf(t) === e;
        });
      }
      function c(t, e) {
        const n = Array.from(t).filter(function (t, n, o) {
          if (t.dataset[e]) return t.dataset[e].split(",")[0];
        });
        if (n.length) {
          const t = [];
          n.forEach((n) => {
            const o = {},
              a = n.dataset[e].split(",");
            (o.value = a[0]),
              (o.type = a[1] ? a[1].trim() : "max"),
              (o.item = n),
              t.push(o);
          });
          let o = t.map(function (t) {
            return (
              "(" +
              t.type +
              "-width: " +
              t.value +
              "px)," +
              t.value +
              "," +
              t.type
            );
          });
          o = l(o);
          const a = [];
          if (o.length)
            return (
              o.forEach((e) => {
                const n = e.split(","),
                  o = n[1],
                  r = n[2],
                  i = window.matchMedia(n[0]),
                  s = t.filter(function (t) {
                    if (t.value === o && t.type === r) return !0;
                  });
                a.push({ itemsArray: s, matchMedia: i });
              }),
              a
            );
        }
      }
      var d = n(2);
      let u = (t, e = !1, n = 500, o = 0) => {
        const a = document.querySelector(t);
        if (a) {
          let i = "",
            l = 0;
          e &&
            ((i = "header.header"),
            (l = document.querySelector(i).offsetHeight));
          let c = {
            speedAsDuration: !0,
            speed: n,
            header: i,
            offset: o,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (r(), document.documentElement.classList.remove("menu-open")),
            void 0 !== d)
          )
            new d().animateScroll(a, "", c);
          else {
            let t = a.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: l ? t - l : t, behavior: "smooth" });
          }
          s(`[gotoBlock]: ????????...???????? ?? ${t}`);
        } else s(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${t}`);
      };
      class h {
        constructor(t) {
          (this.config = Object.assign({ logging: !0 }, t)),
            this.observer,
            !document.documentElement.classList.contains("watcher") &&
              this.scrollWatcherRun();
        }
        scrollWatcherUpdate() {
          this.scrollWatcherRun();
        }
        scrollWatcherRun() {
          document.documentElement.classList.add("watcher"),
            this.scrollWatcherConstructor(
              document.querySelectorAll("[data-watch]")
            );
        }
        scrollWatcherConstructor(t) {
          if (t.length) {
            this.scrollWatcherLogging(
              `??????????????????, ?????????? ???? ?????????????????? (${t.length})...`
            ),
              l(
                Array.from(t).map(function (t) {
                  return `${
                    t.dataset.watchRoot ? t.dataset.watchRoot : null
                  }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
                })
              ).forEach((e) => {
                let n = e.split("|"),
                  o = { root: n[0], margin: n[1], threshold: n[2] },
                  a = Array.from(t).filter(function (t) {
                    let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                      n = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                      a = t.dataset.watchThreshold
                        ? t.dataset.watchThreshold
                        : 0;
                    if (
                      String(e) === o.root &&
                      String(n) === o.margin &&
                      String(a) === o.threshold
                    )
                      return t;
                  }),
                  r = this.getScrollWatcherConfig(o);
                this.scrollWatcherInit(a, r);
              });
          } else
            this.scrollWatcherLogging(
              "????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz"
            );
        }
        getScrollWatcherConfig(t) {
          let e = {};
          if (
            (document.querySelector(t.root)
              ? (e.root = document.querySelector(t.root))
              : "null" !== t.root &&
                this.scrollWatcherLogging(
                  `??????... ?????????????????????????? ?????????????? ${t.root} ?????? ???? ????????????????`
                ),
            (e.rootMargin = t.margin),
            !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
          ) {
            if ("prx" === t.threshold) {
              t.threshold = [];
              for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
            } else t.threshold = t.threshold.split(",");
            return (e.threshold = t.threshold), e;
          }
          this.scrollWatcherLogging(
            "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
          );
        }
        scrollWatcherCreate(t) {
          this.observer = new IntersectionObserver((t, e) => {
            t.forEach((t) => {
              this.scrollWatcherCallback(t, e);
            });
          }, t);
        }
        scrollWatcherInit(t, e) {
          this.scrollWatcherCreate(e),
            t.forEach((t) => this.observer.observe(t));
        }
        scrollWatcherIntersecting(t, e) {
          t.isIntersecting
            ? (!e.classList.contains("_watcher-view") &&
                e.classList.add("_watcher-view"),
              this.scrollWatcherLogging(
                `?? ???????? ${e.classList}, ?????????????? ?????????? _watcher-view`
              ))
            : (e.classList.contains("_watcher-view") &&
                e.classList.remove("_watcher-view"),
              this.scrollWatcherLogging(
                `?? ???? ???????? ${e.classList}, ?????????? ?????????? _watcher-view`
              ));
        }
        scrollWatcherOff(t, e) {
          e.unobserve(t),
            this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${t.classList}`);
        }
        scrollWatcherLogging(t) {
          this.config.logging && s(`[??????????????????????]: ${t}`);
        }
        scrollWatcherCallback(t, e) {
          const n = t.target;
          this.scrollWatcherIntersecting(t, n),
            n.hasAttribute("data-watch-once") &&
              t.isIntersecting &&
              this.scrollWatcherOff(n, e),
            document.dispatchEvent(
              new CustomEvent("watcherCallback", { detail: { entry: t } })
            );
        }
      }
      let m = !1;
      setTimeout(() => {
        if (m) {
          let t = new Event("windowScroll");
          window.addEventListener("scroll", function (e) {
            document.dispatchEvent(t);
          });
        }
      }, 0);
      const p = document.querySelector(".button-top");
      window.onscroll = () => {
        window.scrollY > 400
          ? p.classList.remove("button-top_hide")
          : p.classList.add("button-top_hide");
      };
      const f = document.querySelectorAll("[data-anim-items]");
      if (f.length > 0) {
        function t() {
          for (let t = 0; t < f.length; t++) {
            const n = f[t],
              o = n.offsetHeight,
              a = e(n).top,
              r = 4;
            let i = window.innerHeight - o / r;
            o > window.innerHeight &&
              (i = window.innerHeight - window.innerHeight / r),
              pageYOffset > a - i && pageYOffset < a + o
                ? n.classList.add("_active")
                : n.classList.remove("_active"),
              pageYOffset > a - i &&
                pageYOffset > a + o &&
                n.classList.add("_active");
          }
        }
        function e(t) {
          const e = t.getBoundingClientRect(),
            n = window.pageXOffset || document.documentElement.scrollLeft,
            o = window.pageYOffset || document.documentElement.scrollTop;
          return { top: e.top + o, left: e.left + n };
        }
        window.addEventListener("scroll", t),
          setTimeout(() => {
            t();
          }, 300);
      }
      (window.FLS = !0),
        (function (t) {
          let e = new Image();
          (e.onload = e.onerror =
            function () {
              t(2 == e.height);
            }),
            (e.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (t) {
          let e = !0 === t ? "webp" : "no-webp";
          document.documentElement.classList.add(e);
        }),
        (function () {
          let t = document.querySelector(".icon-menu");
          t &&
            t.addEventListener("click", function (t) {
              a &&
                (((t = 500) => {
                  document.documentElement.classList.contains("lock")
                    ? r(t)
                    : i(t);
                })(),
                document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        (function () {
          const t = document.querySelectorAll("[data-tabs]");
          let n = [];
          if (t.length > 0) {
            const e = location.hash.replace("#", "");
            e.startsWith("tab-") && (n = e.replace("tab-", "").split("-")),
              t.forEach((t, e) => {
                t.classList.add("_tab-init"),
                  t.setAttribute("data-tabs-index", e),
                  t.addEventListener("click", r),
                  (function (t) {
                    const e = t.querySelectorAll("[data-tabs-titles]>*"),
                      o = t.querySelectorAll("[data-tabs-body]>*"),
                      a = t.dataset.tabsIndex,
                      r = n[0] == a;
                    if (r) {
                      t.querySelector(
                        "[data-tabs-titles]>._tab-active"
                      ).classList.remove("_tab-active");
                    }
                    o.length > 0 &&
                      o.forEach((t, o) => {
                        e[o].setAttribute("data-tabs-title", ""),
                          t.setAttribute("data-tabs-item", ""),
                          r && o == n[1] && e[o].classList.add("_tab-active"),
                          (t.hidden = !e[o].classList.contains("_tab-active"));
                      });
                  })(t);
              });
            let o = c(t, "tabs");
            o &&
              o.length &&
              o.forEach((t) => {
                t.matchMedia.addEventListener("change", function () {
                  a(t.itemsArray, t.matchMedia);
                }),
                  a(t.itemsArray, t.matchMedia);
              });
          }
          function a(t, e) {
            t.forEach((t) => {
              const n = (t = t.item).querySelector("[data-tabs-titles]"),
                o = t.querySelectorAll("[data-tabs-title]"),
                a = t.querySelector("[data-tabs-body]");
              t.querySelectorAll("[data-tabs-item]").forEach((r, i) => {
                e.matches
                  ? (a.append(o[i]),
                    a.append(r),
                    t.classList.add("_tab-spoller"))
                  : (n.append(o[i]), t.classList.remove("_tab-spoller"));
              });
            });
          }
          function r(t) {
            const n = t.target;
            if (n.closest("[data-tabs-title]")) {
              const a = n.closest("[data-tabs-title]"),
                r = a.closest("[data-tabs]");
              if (
                !a.classList.contains("_tab-active") &&
                !r.querySelectorAll("._slide").length
              ) {
                const t = r.querySelector("[data-tabs-title]._tab-active");
                t && t.classList.remove("_tab-active"),
                  a.classList.add("_tab-active"),
                  (function (t) {
                    const n = t.querySelectorAll("[data-tabs-title]"),
                      a = t.querySelectorAll("[data-tabs-item]"),
                      r = t.dataset.tabsIndex,
                      i = (function (t) {
                        if (t.hasAttribute("data-tabs-animate"))
                          return t.dataset.tabsAnimate > 0
                            ? t.dataset.tabsAnimate
                            : 500;
                      })(t);
                    a.length > 0 &&
                      a.forEach((t, a) => {
                        n[a].classList.contains("_tab-active")
                          ? (i ? o(t, i) : (t.hidden = !1),
                            t.closest(".popup") ||
                              (location.hash = `tab-${r}-${a}`))
                          : i
                          ? e(t, i)
                          : (t.hidden = !0);
                      });
                  })(r);
              }
              t.preventDefault();
            }
          }
        })(),
        new h({}),
        (function () {
          function t(t) {
            if ("click" === t.type) {
              const e = t.target;
              if (e.closest("[data-goto]")) {
                const n = e.closest("[data-goto]"),
                  o = n.dataset.goto ? n.dataset.goto : "",
                  a = !!n.hasAttribute("data-goto-header"),
                  r = n.dataset.gotoSpeed ? n.dataset.gotoSpeed : "500";
                u(o, a, r), t.preventDefault();
              }
            } else if ("watcherCallback" === t.type && t.detail) {
              const e = t.detail.entry,
                n = e.target;
              if ("navigator" === n.dataset.watch) {
                const t = n.id,
                  o =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${t}"]`));
                e.isIntersecting
                  ? o && o.classList.add("_navigator-active")
                  : o && o.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", t),
            document.addEventListener("watcherCallback", t);
        })();
    })();
})();

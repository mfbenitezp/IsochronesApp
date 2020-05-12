function H(a, b, c, d) {
        if ("undefined" == typeof a[0] && "undefined" == typeof a[1] || "undefined" == typeof a.lat && "undefined" == typeof a.lng) {
            "undefined" != typeof a.lat && "undefined" != typeof a.lng && (a.lat = parseFloat(a.lat.toFixed(6)),
            a.lng = parseFloat(a.lng.toFixed(6))),
            "undefined" != typeof a[0] && "undefined" != typeof a[1] && (a[0] = parseFloat(a[0].toFixed(6)),
            a[1] = parseFloat(a[1].toFixed(6))),
            "undefined" == typeof c && (c = !0);
            var e, f, g;
            switch (g = "temp" !== b && "timing" !== b ? ga.layerGroups.markerLayerGroup : "timing" === b ? ga.layerGroups.reachabilityLayerGroup : ga.layerGroups.tempLayerGroup,
            b) {
            case "source":
                if (r.sourceMarkers.length >= r.maxSourceMarkers)
                    return void A("Maximum number of source Markers reached (" + r.maxSourceMarkers + ")");
                e = r.sourceMarkers,
                f = L.icon({
                    iconUrl: "./images/icons/marker_source.svg",
                    shadowUrl: "./images/icons/shadow.png",
                    iconSize: [28, 40],
                    shadowSize: [28, 45],
                    iconAnchor: [14, 40],
                    shadowAnchor: [2, 40],
                    popupAnchor: [0, -43]
                });
                break;
            case "target":
                if (r.targetMarkers.length >= r.maxTargetMarkers)
                    return void A("Maximum number of target Markers reached (" + r.maxTargetMarkers + ")");
                e = r.targetMarkers,
                f = L.icon({
                    iconUrl: "./images/icons/marker_target.svg",
                    shadowUrl: "./images/icons/shadow.png",
                    iconSize: [28, 40],
                    shadowSize: [28, 45],
                    iconAnchor: [14, 40],
                    shadowAnchor: [2, 40],
                    popupAnchor: [0, -43]
                });
                break;
            case "timing":
                if (r.timingMarkers.length >= r.maxTimingTargetMarkers)
                    return void A("Maximum number of timing target Markers reached (" + r.maxTimingTargetMarkers + ")");
                e = r.timingMarkers,
                f = a.travelTime > -1 && a.travelTime < 60 * r.travelTime ? L.icon({
                    iconUrl: "./images/icons/marker_timing_reachable.svg",
                    shadowUrl: "./images/icons/shadow.png",
                    iconSize: [28, 40],
                    shadowSize: [28, 45],
                    iconAnchor: [14, 40],
                    shadowAnchor: [2, 40],
                    popupAnchor: [0, -43]
                }) : L.icon({
                    iconUrl: "./images/icons/marker_timing_not_reachable.svg",
                    iconSize: [15, 15],
                    iconAnchor: [7.5, 7.5],
                    shadowAnchor: [4, 62],
                    popupAnchor: [0, -10]
                });
                break;
            case "temp":
                f = L.icon({
                    iconUrl: "./images/icons/marker_temp.svg",
                    iconSize: [15, 15],
                    iconAnchor: [7.5, 7.5],
                    shadowAnchor: [4, 62],
                    popupAnchor: [0, -10]
                });
                break;
            default:
                A("The Marker could not be added")
            }
            if ("temp" === b) {
                var h = L.marker(a, {
                    icon: f
                }).addTo(g)
                  , i = I(a);
                i.then(function(a) {
                    var b = J(a);
                    h.bindPopup("<strong>" + b.title + "</strong>", {
                        closeButton: !1
                    }),
                    h.openPopup()
                }),
                ga.map.setView(a, 15)
            } else {
                var h = L.marker(a, {
                    draggable: d ? !1 : !0,
                    icon: f,
                    contextmenu: d ? !1 : !0,
                    contextmenuItems: [{
                        text: "Delete Marker",
                        callback: F,
                        index: 0,
                        iconFa: "fa-fw fa-times"
                    }, {
                        separator: !0,
                        index: 1
                    }]
                }).addTo(g);
                d || (h.on("dragend", function() {
                    this._latlng.lat = this._latlng.lat.toFixed(6),
                    this._latlng.lng = this._latlng.lng.toFixed(6);
                    var a = I(this._latlng);
                    a.then(function(a) {
                        h.description = J(a)
                    }),
                    O(function() {
                        P()
                    }),
                    da()
                }),
                h.on("click", function() {
                    ga.optsOpen || (ga.optsOpen = !0)
                })),
                e.push(h),
                c && (da(),
                O(function() {
                    P()
                }));
                var i = I(a);
                i.then(function(a) {
                    h.description = J(a)
                })
            }
        }
    }
    function I(a) {
        var b = ""
          , c = m.defer();
        return "undefined" != typeof a.lat && "undefined" != typeof a.lng && (b = o.endpoints.geocoder + "reverse?lon=" + a.lng + "&lat=" + a.lat),
        "undefined" != typeof a[0] && "undefined" != typeof a[1] && (b = o.endpoints.geocoder + "reverse?lon=" + a[1] + "&lat=" + a[0]),
        l({
            method: "GET",
            url: b
        }).then(function(a) {
            var b;
            a.data.features.length > 0 ? (b = a.data.features[0].properties,
            "undefined" == typeof b.name && (b.name = "",
            "undefined" != typeof b.street && (b.name += b.street),
            "undefined" != typeof b.housenumber && (b.name += " " + b.housenumber))) : b = {
                name: "Marker",
                city: "",
                country: ""
            },
            c.resolve(b)
        }, function() {
            A("Reverse geocoding failed.")
        }),
        c.promise
    }
    function J(a) {
        var b, c, d, e = {
            title: "",
            meta1: "",
            meta2: "",
            full: ""
        };
        return angular.isDefined(a.name) && (b = a.name),
        angular.isDefined(a.street) && (c = a.street,
        angular.isDefined(a.housenumber) && (c += " " + a.housenumber)),
        angular.isDefined(a.city) ? (d = a.city,
        angular.isDefined(a.postcode) && (d = a.postcode + " " + d),
        angular.isDefined(a.country) && (d += ", " + a.country)) : angular.isDefined(a.country) && (d = a.country),
        angular.isDefined(b) ? (e.title = b,
        e.meta1 = c,
        e.meta2 = d) : (e.title = c,
        e.meta1 = d),
        e.full = e.title,
        "" !== e.meta1 && angular.isDefined(e.meta1) && (e.full += ", " + e.meta1),
        "" !== e.meta2 && angular.isDefined(e.meta2) && (e.full += ", " + e.meta2),
        e
    }
    function K(a) {
        ga.layerGroups.markerLayerGroup.removeLayer(a),
        void 0 !== r.sourceMarkers && r.sourceMarkers.forEach(function(b, c, d) {
            b === a && d.splice(c, 1)
        }),
        r.targetMarkers !== [] && r.targetMarkers.forEach(function(b, c, d) {
            b === a && d.splice(c, 1)
        }),
        da(),
        O(function() {
            P()
        })
    }
    function M() {
        ga.layerGroups.markerLayerGroup.clearLayers(),
        ga.layerGroups.reachabilityLayerGroup.clearLayers(),
        ga.layerGroups.polygonLayerGroup.clearLayers(),
        ga.layerGroups.routeLayerGroup.clearLayers(),
        ga.layerGroups.tempLayerGroup.clearLayers(),
        r.sourceMarkers = [],
        r.targetMarkers = []
    }
    function N() {
        var b = r360.travelOptions();
        if (b.setServiceUrl(r360.config.serviceUrl),
        r.customURL && angular.isDefined(r.customURL) && b.setServiceUrl(r.customURL),
        b.setServiceKey(r360.config.serviceKey),
        b.setElevationEnabled(ga.options.elevation),
        b.setReverse(ga.options.reverse),
        b.setEdgeWeight(ga.options.edgeWeight),
        b.getServiceUrl().indexOf("https://service.targomo.com/na_") > -1) {
            var c = r.sourceMarkers[0].getLatLng().lat
              , d = r.sourceMarkers[0].getLatLng().lng
              , e = "";
            if (-100 >= d && 36 >= c)
                e = "southwest";
            else if (-100 >= d && c >= 36)
                e = "northwest";
            else if (d >= -100 && c >= 36)
                e = "northeast";
            else {
                if (!(d >= -100 && 36 >= c))
                    return !1;
                e = "southeast"
            }
            r360.config.serviceUrl = "https://service.targomo.com/na_" + e + "/",
            b.setServiceUrl(r360.config.serviceUrl)
        }
        var f = 60 * r.travelTime
          , g = []
          , h = [];
        ga.prefs.travelTimeRanges[r.travelTimeRangeID].times.forEach(function(a, b) {
            var c = {};
            c.time = 60 * a,
            c.color = ga.prefs.colorRanges[r.colorRangeID].colors[b],
            c.opacity = ga.prefs.colorRanges[r.colorRangeID].opacities[b],
            h.push(c)
        }),
        h.forEach(function(a) {
            a.time <= f && g.push(a.time)
        }),
        "distance" === r.edgeWeight ? (b.setTravelTimes(ga.prefs.travelDistanceRanges[r.travelDistanceRangeID].times.slice(0, ga.prefs.travelDistanceRanges[r.travelDistanceRangeID].times.indexOf(r.travelDistance) + 1)),
        b.setMaxRoutingTime(r.travelDistance),
        b.setMaxEdgeWeight(r.travelDistance)) : (b.setTravelTimes(g),
        b.setMaxRoutingTime(60 * r.travelTime),
        b.setMaxEdgeWeight(60 * r.travelTime)),
        "transit" !== r.travelType || a.data.transit.available || (r.travelType = "walk",
        n.show(n.simple().content("Transit is not available. Switched to Walk").position("bottom right").hideDelay(3e3))),
        b.setTravelType(r.travelType),
        r.sourceMarkers.forEach(function(a, c) {
            a.id = "source" + c,
            b.addSource(a)
        }),
        r.targetMarkers.forEach(function(a, c) {
            a.id = "target" + c,
            b.addTarget(a)
        }),
        b.extendWidthX = 2 * r.extendWidth,
        b.extendWidthY = 2 * r.extendWidth,
        3 === r.colorRangeID ? ga.layerGroups.polygonLayerGroup.setInverse(!0) : ga.layerGroups.polygonLayerGroup.setInverse(!1),
        b.backgroundColor = r.backgroundColor,
        b.setIntersectionMode(r.intersection),
        "transit" === r.travelType && r.queryDate > a.data.transit.max_date && (r.queryDate = a.data.transit.max_date);
        var i = r.queryDate
          , j = String(i.getFullYear()) + ("0" + String(i.getMonth() + 1)).slice(-2) + ("0" + String(i.getDate())).slice(-2);
        b.setDate(j);
        var k = r.queryTime
          , l = 3600 * k.h + 60 * k.m;
        return b.setTime(l),
        b.setFrameDuration(ga.options.frameDuration),
        b.setMinPolygonHoleSize(r.minPolygonHoleSize),
        "car" === ga.options.travelType && (b.setMinPolygonHoleSize(1e7),
        b.setRushHour(ga.options.rushHour)),
        b
    }
    function O(a) {
        if (ga.states.requestPending = !0,
        0 === r.sourceMarkers.length)
            return ga.layerGroups.polygonLayerGroup.clearLayers(),
            ga.states.requestPending = !1,
            void (angular.isDefined(a) && a());
        var b = N();
        r360.PolygonService.getTravelTimePolygons(b, function(b) {
            0 === b.length && k.show(k.alert().parent(angular.element(document.querySelector("#map"))).clickOutsideToClose(!0).title("No Polygons").content('The server did not return any polygons for your request. If you are using intersection mode "intersection" or "average" please move the markers closer together or increase the maximum travel time.').ariaLabel("Error Dialog").ok("Got it!")),
            g(function() {
                ga.layerGroups.polygonLayerGroup.clearAndAddLayers(b, r.zoomAllTheTime),
                ba()
            }),
            ga.states.requestPending = !1,
            angular.isDefined(a) && a()
        }, function(a, b) {
            ga.states.requestPending = !1,
            k.show(k.alert().parent(angular.element(document.querySelector("#map"))).clickOutsideToClose(!0).title("Something went wrong").content(b).ariaLabel("Error Dialog").ok("Got it!"))
        })
    }
    function P(a) {
        if (ga.states.requestPending = !0,
        ga.layerGroups.routeLayerGroup.clearLayers(),
        0 === r.targetMarkers.length || 0 === r.sourceMarkers.length)
            return ga.states.requestPending = !1,
            void (angular.isDefined(a) && a());
        var b = N();
        b.setEdgeWeight("time"),
        r360.RouteService.getRoutes(b, function(b) {
            ga.states.requestPending = !1,
            q.routes = b,
            b.forEach(function(a) {
                r360.LeafletUtil.fadeIn(ga.layerGroups.routeLayerGroup, a, 500, "travelDistance", {
                    color: "red",
                    haloColor: "#fff"
                })
            }),
            c.$$phase || c.$apply(),
            "undefined" != typeof a && a()
        })
    }
    function Q(a) {
        ga.layerGroups.tempLayerGroup.clearLayers(),
        angular.isDefined(a) && H([a.geometry.coordinates[1], a.geometry.coordinates[0]], "temp")
    }
    function R(a) {
        angular.isDefined(ga.autocomplete.selectedItem) && ga.autocomplete.selectedItem ? (H([ga.autocomplete.selectedItem.geometry.coordinates[1], ga.autocomplete.selectedItem.geometry.coordinates[0]], a),
        ga.autocomplete.selectedItem = void 0) : A("No place defined.")
    }
    function S(a) {
        var b = ga.map.getCenter()
          , c = []
          , d = m.defer()
          , e = a.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/g);
        return e && e.length > 0 ? Promise.resolve([{
            geometry: {
                coordinates: [parseFloat(a.split(",")[1]), parseFloat(a.split(",")[0])]
            },
            properties: {
                name: a
            },
            description: J({
                name: a
            })
        }]) : (l({
            method: "GET",
            url: o.endpoints.geocoder + "api/?q=" + a + "&lat=" + b.lat + "&lon=" + b.lng + "&limit=5"
        }).then(function(a) {
            c = a.data.features.map(function(a) {
                return a.value = a.properties.osm_id,
                a.description = J(a.properties),
                a
            }),
            d.resolve(c)
        }, function() {
            k.show(k.alert().parent(angular.element(document.querySelector("#map"))).clickOutsideToClose(!0).title("Something went wrong").content("Please try Again later").ariaLabel("Alert Dialog").ok("Got it!"))
        }),
        d.promise)
    }
    function T() {
        ga.layerGroups.reachabilityLayerGroup.clearLayers(),
        r.timingMarkers = []
    }
    function U(a) {
        T();
        for (var b = ga.map.getBounds().getEast(), c = ga.map.getBounds().getWest(), d = ga.map.getBounds().getSouth(), e = ga.map.getBounds().getNorth(), f = [], g = 0; a > g; g++) {
            var h = e + Math.random() * (d - e)
              , i = c + Math.random() * (b - c);
            f.push({
                lat: h,
                lng: i,
                id: h + ";" + i
            })
        }
        var j = N();
        j.setTargets(f),
        r360.TimeService.getRouteTime(j, function(a) {
            a.forEach(function(a) {
                a.targets.forEach(function(a) {
                    var b = $.grep(f, function(b) {
                        return b.id === a.id
                    })[0];
                    a.lat = b.lat,
                    a.lng = b.lng,
                    H(a, "timing", !1, !0)
                })
            })
        })
    }
    function V() {
        ga.layerGroups.reachableLayerGroup.clearLayers(),
        r.requestPending = !0;
        var a = ga.layerGroups.polygonLayerGroup.getBoundingBox4326()
          , b = a.getSouthWest()
          , d = a.getNorthEast()
          , e = [];
        ga.prefs.pois.forEach(function(a) {
            a.selected && e.push(a.value)
        });
        var f = ["lat=" + r.sourceMarkers[0].getLatLng().lat, "lng=" + r.sourceMarkers[0].getLatLng().lng, "radius=500", "northEast=" + d.lat + "|" + d.lng, "southWest=" + b.lat + "|" + b.lng, "timeout=10000", "types=" + e.join("&types=")];
        l.get("https://dev.route360.net/places/places?" + f.join("&")).then(function(a) {
            var b = a.data;
            if (e.length > 0 && 0 === b.length && console.log("TODO implement notification"),
            0 === b.length)
                return void (ga.requestPending = !1);
            r.groups = [];
            var d = r360.travelOptions();
            d.setTravelType(r.travelType),
            d.addSource(r.sourceMarkers[0]),
            d.setTargets(b),
            d.setTravelTimes([60 * r.travelTime]);
            var f = r.queryDate
              , g = String(f.getFullYear()) + ("0" + String(f.getMonth())).slice(-2) + ("0" + String(f.getDate())).slice(-2);
            d.setDate(g);
            var h = r.queryTime
              , i = 3600 * h.h + 60 * h.m;
            d.setTime(i),
            d.setMaxRoutingTime(60 * r.travelTime),
            d.setMaxEdgeWeight(60 * r.travelTime),
            d.setEdgeWeight(r.edgeWeight),
            r360.TimeService.getRouteTime(d, function(a) {
                _.each(a[0].targets, function(a) {
                    var c = _.find(b, function(b) {
                        return b.id === a.id
                    });
                    c.travelTime = a.travelTime,
                    0 === c.matchedPlaces.length && c.matchedPlaces.push(c);
                    var e = L.icon({
                        iconUrl: "./images/icons/marker_source.svg",
                        shadowUrl: "./images/icons/marker_shadow.svg",
                        iconSize: [28, 40],
                        shadowSize: [27, 18],
                        iconAnchor: [14, 40],
                        shadowAnchor: [7, 14],
                        popupAnchor: [0, -43]
                    });
                    c.travelTime > 0 && c.travelTime <= d.getMaxRoutingTime() && W(c) && (c.marker = L.marker([c.lat, c.lng], {
                        icon: e,
                        opacity: 1
                    }).addTo(ga.layerGroups.reachableLayerGroup),
                    c.marker.on("click", function() {
                        ga.highlight(c)
                    }))
                });
                var e = [];
                if (r.groups.forEach(function(a) {
                    _.has(a, "error") && e.push(a.key)
                }),
                e.length > 0) {
                    var f;
                    f = 1 === e.length ? "Für den Objekttyp " + e[0] + " wurden sehe viele Ergebnisse gefunden. Es werden daher nur die Top " + r.placesLimit + " angezeigt!" : "Für die Objekttypen '" + e.join(", ") + "'' wurden sehe viele Ergebnisse gefunden. Es werden daher nur die Top " + r.placesLimit + " angezeigt!"
                }
                r.requestPending = !1,
                c.$$phase || c.$apply()
            })
        })
    }
    function W(a) {
        var b = !1;
        return r.groups.forEach(function(c) {
            c.key === a.type && (c.data.length >= r.placesLimit ? (a.error = "too-many-objects",
            c.error = "too-many-objects") : (c.data.push(a),
            b = !0))
        }),
        b || a.error || r.groups.push({
            key: a.type,
            data: [a],
            tableParams: void 0
        }),
        !(_.has(a, "error") && "too-many-objects" === a.error)
    }
    function X(a, b) {
        b ? (a.bindPopup("<strong>" + a.description.title + "</strong>", {
            closeButton: !0,
            minWidth: 10
        }),
        a.openPopup()) : (a.closePopup(),
        a.unbindPopup())
    }
    function Y(a) {
        r.travelTime !== a && (r.travelTime = a,
        O(),
        da())
    }
    function Z() {
        var a = r.travelTimeRangeID
          , b = 999999
          , c = 30;
        ga.prefs.travelTimeRanges[a].times.forEach(function(a) {
            b > Math.abs(a - r.travelTime) && (b = Math.abs(a - r.travelTime),
            c = a)
        }),
        r.travelTime = c,
        ga.states.init || O(),
        da()
    }
    function aa() {
        var a = r.travelDistanceRangeID
          , b = ga.prefs.travelDistanceRanges[a].times.filter(function(a) {
            return a >= r.travelDistance
        });
        r.travelDistance = b.length ? b[0] : ga.prefs.travelDistanceRanges[a][0],
        ga.states.init || O(),
        da()
    }
    function ba() {
        var a = [];
        "distance" === r.edgeWeight ? ga.prefs.travelDistanceRanges[r.travelDistanceRangeID].times.forEach(function(b, c) {
            var d = {};
            d.time = b,
            d.color = ga.prefs.colorRanges[r.colorRangeID].colors[c],
            d.opacity = ga.prefs.colorRanges[r.colorRangeID].opacities[c],
            a.push(d)
        }) : ga.prefs.travelTimeRanges[r.travelTimeRangeID].times.forEach(function(b, c) {
            var d = {};
            d.time = 60 * b,
            d.color = ga.prefs.colorRanges[r.colorRangeID].colors[c],
            d.opacity = ga.prefs.colorRanges[r.colorRangeID].opacities[c],
            a.push(d)
        }),
        3 === r.colorRangeID ? ga.layerGroups.polygonLayerGroup.setInverse(!0) : ga.layerGroups.polygonLayerGroup.setInverse(!1),
        ga.layerGroups.polygonLayerGroup.setColors(a),
        da()
    }
    function ca(a) {
        r.travelType !== a && (r.travelType = a,
        ga.prefs.travelTypes.forEach(function(b) {
            b.value === a && (r.travelTypeIcon = b.icon)
        }),
        O(function() {
            P()
        }),
        da())
    }
    function da() {
        ga.states.urlModified = !0;
        for (var a in r)
            switch (a) {
            case "sourceMarkers":
                if (0 === r.sourceMarkers.length) {
                    e.search("sources", null);
                    break
                }
                var b = [];
                r.sourceMarkers.forEach(function(a) {
                    b.push(a._latlng.lat + "," + a._latlng.lng)
                }),
                e.search("sources", b.join(";"));
                break;
            case "targetMarkers":
                if (0 === r.targetMarkers.length) {
                    e.search("targets", null);
                    break
                }
                var d = [];
                r.targetMarkers.forEach(function(a) {
                    d.push(a._latlng.lat + "," + a._latlng.lng)
                }),
                e.search("targets", d.join(";"));
                break;
            case "edgeWeight":
            case "areaID":
            case "travelTime":
            case "travelDistance":
            case "frameDuration":
            case "reverse":
            case "travelTimeRangeID":
            case "travelDistanceRangeID":
            case "travelType":
            case "colorRangeID":
            case "intersection":
            case "transition":
            case "zoomAllTheTime":
            case "mapstyle":
            case "serviceKey":
            case "rushHour":
                if (angular.isDefined(f[a]) && f[a] === r[a])
                    break;
                e.search(a, String(r[a]))
            }
        c.$$phase || c.$apply()
    }
    function ea(a) {
        a ? (r.transition && ga.map.panBy([-275, 0]),
        ga.map.setActiveArea({
            position: "absolute",
            top: "0",
            left: "450px",
            right: "0",
            bottom: "0"
        })) : (r.transition && ga.map.panBy([275, 0]),
        ga.map.setActiveArea({
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0"
        }))
    }
    var fa, ga = this;
    ga.mdMedia = p,
    ga.optsOpen = "development" === o.name ? !0 : !1,
    ga.debugMode = "development" === o.name ? !0 : !1,
    ga.Meta = a,
    ga.updateTileStyle = x,
    ga.toggleOptions = z,
    ga.flyTo = B,
    ga.removeMarker = K,
    ga.updateApiKey = function() {
        r.serviceKey && (r360.config.serviceKey = r.serviceKey),
        ga.updateView(),
        ga.updateTileStyle()
    }
    ,
    ga.updateView = function() {
        O(),
        da()
    }
    ,
    ga.autocomplete = [],
    ga.autocomplete.querySearch = S,
    ga.autocomplete.selectedItemChange = Q,
    ga.addAs = R,
    ga.addTargets = U,
    ga.clearTiming = T,
    ga.getPlaces = V,
    ga.focus = X,
    ga.changeTravelTime = Y,
    c.$watch("map.options.travelDistance", function(a) {
        a && (ga.states.init || O(),
        da())
    }),
    ga.changeColorRange = ba,
    ga.changeTravelTimeRange = Z,
    ga.changeTravelDistanceRange = aa,
    ga.changeTravelType = ca,
    ga.changeEdgeWeight = function(a) {
        r.edgeWeight = a,
        "distance" === a && "transit" === r.travelType && (r.travelType = "car"),
        O(function() {
            P()
        }),
        da()
    }
    ,
    s(),
    c.$on("$routeUpdate", function() {
        ga.states.urlModified ? ga.states.urlModified = !1 : u()
    })
}
]),
angular.module("r360DemoApp").service("RoutesService", [function() {
    var a = {};
    return a.routes = [],
    a
}
]),
angular.module("r360DemoApp").service("Meta", ["ENV", "Options", "$http", function(a, b, c) {
    function d(a, b) {
        var c = b.replace("_", "-")
          , d = b.replace("-", "_");
        angular.isDefined(a[d]) || (a[d] = a[c])
    }
    function e(a) {
        var b;
        if (b = "string" != typeof a ? a.toString() : a,
        !(b.length < 8)) {
            var c = parseInt(b.substr(0, 4))
              , d = Math.max(0, parseInt(b.substr(4, 2)) - 1)
              , e = parseInt(b.substr(6, 2));
            return new Date(c,d,e)
        }
    }
    var f = {};
    return f.data = {},
    f.fetchMetadata = function() {
        return c({
            method: "GET",
            url: a.endpoints[b.areaID] + "v1/metadata/network?key=" + a.serviceKey
        }).then(function(a) {
            f.data = a.data,
            d(f.data.transit, "min-date"),
            d(f.data.transit, "max-date"),
            f.data.transit.min_date = new e(f.data.transit.min_date),
            f.data.transit.max_date = new e(f.data.transit.max_date)
        })["catch"](function(a) {
            console.log(a)
        })
    }
    ,
    f
}
]),
angular.module("r360DemoApp").service("Options", ["ENV", function(a) {
    var b = new Date
      , c = b.getHours()
      , d = (b.getMinutes() + (5 - b.getMinutes() % 5)) % 60;
    0 === d && c++,
    24 === c && (c = 0);
    var e = {
        areaID: "germany",
        cityID: void 0,
        travelTime: 30,
        travelTimeRangeID: 0,
        travelDistanceRangeID: 0,
        travelType: "bike",
        travelDistance: 5e3,
        edgeWeight: "time",
        queryDate: b,
        queryTime: {
            h: c,
            m: d
        },
        colorRangeID: 0,
        mapProvider: "osm",
        sourceMarkers: [],
        maxSourceMarkers: 3,
        targetMarkers: [],
        maxTargetMarkers: 3,
        timingMarkers: [],
        maxTimingTargetMarkers: 1e3,
        groups: [],
        intersection: "union",
        strokeWidth: 30,
        extendWidth: 500,
        backgroundColor: "black",
        backgroundOpacity: 0,
        minPolygonHoleSize: 1e7,
        customURL: void 0,
        placesLimit: 100,
        transition: !0,
        zoomAllTheTime: !0,
        mapstyle: "light",
        showAdvanced: "development" === a.name ? !0 : !1,
        debugMode: "development" === a.name ? !0 : !1,
        elevation: !0,
        frameDuration: 18e3,
        rushHour: !1
    };
    return e;
}
]),
angular.module("r360DemoApp").filter("secToHoursMin", function() {
    return function(a) {
        var b = (a / 60).toFixed(0)
          , c = Math.floor(b / 60);
        b -= 60 * c;
        var d = "";
        return 0 !== c && (d += c + "h "),
        d += b + "min"
    }
}),
angular.module("r360DemoApp").filter("formatMeter", function() {
    return function(a) {
        var b = (a || 0).toFixed(3);
        if (1e3 > b)
            return 10 * Math.round(b / 10) + "m";
        var c = 10 * Math.round(b / 10);
        return c / 1e3 + "km"
    }
}),
angular.module("r360DemoApp").filter("secToMin", function() {
    return function(a) {
        return Math.floor(a / 60)
    }
}),
angular.module("r360DemoApp").filter("secToTime", function() {
    return function(a) {
        var b = (a / 60).toFixed(0)
          , c = Math.floor(b / 60);
        b -= 60 * c;
        var d = "";
        return d += 0 !== c ? c % 24 + ":" : "00:",
        0 === b ? b = "00" : 10 > b && (b = "0" + b),
        d += b
    }
}),
angular.module("r360DemoApp").filter("transferCount", function() {
    return function(a) {
        var b = ""
          , c = a - 2;
        return 1 > c ? b = "direct connection" : (b = "change " + c,
        b += c > 1 ? " times" : " time"),
        b
    }
}),
angular.module("r360DemoApp").filter("cleanName", function() {
    return function(a) {
        return "undefined" == typeof a ? "UNDEFINED" : (a = a.trim().replace("(Berlin)", ""),
        a = a.trim().replace("(Bln)", ""),
        a = a.trim().replace(/\[.*\]$/g, ""),
        a = a.trim().replace(/U{0-9}{1,2}$/g, ""))
    }
}),
angular.module("r360DemoApp").filter("distance", function() {
    return function(a) {
        return a >= 1e3 ? (a / 1e3).toFixed(2) + "km" : a + "m"
    }
}),
angular.module("r360DemoApp").filter("idToName", ["Options", function(a) {
    return function(b) {
        var c = b + "";
        return b.indexOf(!1) && a.sourceMarkers.forEach(function(a) {
            a.id === b && (c = a.description && a.description.title || "")
        }),
        b.indexOf(!1) && a.targetMarkers.forEach(function(a) {
            a.id === b && (c = a.description && a.description.title || "")
        }),
        c
    }
}
]),
angular.module("r360DemoApp").directive("r360RainbowLocal", function() {
    return {
        restrict: "E",
        templateUrl: "./templates/r360-rainbow-template.html",
        scope: {
            travelTime: "=",
            travelTimeRange: "=",
            colorRange: "="
        }
    }
}),
angular.module("r360DemoApp").directive("travelPlan", function() {
    return {
        restrict: "E",
        templateUrl: "./templates/travelPlan.html",
        controllerAs: "travelPlan",
        controller: "TravelPlanCtrl"
    }
}),
angular.module("r360DemoApp").controller("TravelPlanCtrl", ["$timeout", "RoutesService", "Options", function(a, b, c) {
    var d = this;
    d.routesService = b,
    d.isLoading = !1,
    d.isNotTransfer = function(a) {
        return 0 === a.travelTime ? !1 : !0
    }
    ,
    d.showPlan = function(a) {
        a.show ? a.show = !1 : (b.routes.forEach(function(a) {
            a.show = !1
        }),
        a.show = !0)
    }
    ,
    d.getMarkerDescription = function(a) {
        var b = a + "";
        return a.indexOf(!1) && c.sourceMarkers.forEach(function(c) {
            c.id === a && (b = c.description && c.description.title || "")
        }),
        a.indexOf(!1) && c.targetMarkers.forEach(function(c) {
            c.id === a && (b = c.description && c.description.title || "")
        }),
        b
    }
}
]),
angular.module("r360DemoApp").run(["$templateCache", function(a) {
    a.put("views/main.html", '<!-- <a class="github-link" title="r360 on GitHub" href="https://github.com/route360/r360-js">\n    <img src="images/github.svg" alt="r360 on GitHub">\n</a> --> <div ng-repeat="key in main.cities" class="bg-image" layout-fill layout="row" style="background: url(\'{{key.url}}\') center center; background-size: cover; z-index:{{(key.id == main.city) && 10 || 1}}; opacity: {{(key.id == main.city) && 1 || 0}}"> </div> <div class="abs dark" layout-fill layout="row" layout-align="center center" style="z-index: 99"> <md-content class="nobg" layout="column" flex> <section class="logo" layout-align="center center"> <img class="logo" src="images/r360.svg" alt="Targomo"> </section> <section layout="column" layout-align="center center"> <h1 flex layout="row" layout-xs="column" layout-align="center center" class="md-display-1"> <span>Targomo web services are currently available for </span> <md-select style="margin-left: 0.5rem" ng-model="main.city" aria-label="City Select" ng-click="main.stopTheTimers()"> <md-option ng-repeat="key in main.cities | orderBy:\'name\'" value="{{key.id}}">{{key.name}}</md-option> </md-select> </h1> <a layout="row" class="ghostbutton" ng-href="./#!/map?areaID={{main.city}}">Launch Demo</a> </section> </md-content> </div> <md-progress-linear class="timer-progress md-hue-1" md-mode="{{main.mode}}" value="{{main.timer}}"></md-progress-linear>'),
    a.put("views/map.html", '<div class="fs-wrapper"> <section class="fs-container" flex layout-fill> <md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="options" md-is-open="map.optsOpen"> <md-toolbar class="md-theme-light"> <div class="md-toolbar-tools"> <h2> <span>Targomo Demo for </span> </h2> <md-select style="margin-left: .5rem" ng-model="map.options.areaID" aria-label="City Select" ng-change="map.flyTo(map.options.areaID)"> <md-option ng-repeat="city in map.prefs.cities | orderBy:\'name\'" value="{{city.id}}">{{city.name}}</md-option> </md-select> <span flex></span> <md-button class="md-icon-button" aria-label="Close" ng-click="map.toggleOptions()"> <md-icon md-svg-icon="md:close"></md-icon> </md-button> </div> </md-toolbar> <md-content> <md-list> <md-list-item class="geocoder-wrapper"> <form flex ng-submit="$event.preventDefault()"> <md-autocomplete md-no-cache="map.autocomplete.noCache" md-selected-item="map.autocomplete.selectedItem" md-search-text="map.autocomplete.searchText" md-selected-item-change="map.autocomplete.selectedItemChange(item)" md-items="item in map.autocomplete.querySearch(map.autocomplete.searchText)" md-item-text="item.description.full" md-min-length="3" placeholder="Add marker..." md-menu-class="r360-autocomplete"> <md-item-template> <span class="item-title"> <span><strong>{{item.description.title}}</strong></span> </span> <span class="item-metadata"> <span class="item-metastat"> {{item.description.meta1}} </span> <span class="item-metastat"> {{item.description.meta2}} </span> </span> </md-item-template> <md-not-found> No matches found for "{{map.autocomplete.searchText}}". </md-not-found> </md-autocomplete> </form> </md-list-item> <div class="geocoder-wrapper" ng-show="map.autocomplete.selectedItem" layout-align="space-around center" layout="row"> <md-button class="md-raised" aria-label="Add as Source" ng-click="map.addAs(\'source\')"> Add as source </md-button> <md-button class="md-raised" aria-label="Add as Target" ng-click="map.addAs(\'target\')"> Add as target </md-button> </div> <!-- <md-list-item ng-repeat="poi in map.prefs.pois">\n\n                <p>{{poi.name}}</p>\n\n                <md-switch ng-change="getPlaces()" ng-model="poi.selected" aria-label="Switch {{poi.name}}" class="md-primary">\n\n                </md-list-item> --> <md-subheader class="md-no-sticky">Source Markers</md-subheader> <md-list-item class="md-3-line" ng-click="map.focus(marker,true)" ng-repeat="marker in map.options.sourceMarkers"> <md-icon class="md-avatar" md-svg-icon="md:map-marker" style="color: #D63E2A"></md-icon> <div class="md-list-item-text" layout="column"> <h3>{{marker.description.title}}</h3> <p>{{marker.description.meta1}} {{marker.description.meta2}}</p> <p>{{marker._latlng.lat}},{{marker._latlng.lng}}</p> </div> <md-button class="md-icon-button md-mini" aria-label="Delete Marker" ng-click="map.removeMarker(marker)"> <md-icon md-svg-icon="md:close"></md-icon> <md-tooltip>Delete Marker</md-tooltip> </md-button> </md-list-item> <md-list-item ng-if="map.options.sourceMarkers.length === 0" layout="row" layout-align="center center"> <div style="color: rgba(0,0,0,0.4)"> <md-icon md-svg-icon="md:information" style="color: rgba(0,0,0,0.4)"></md-icon> <span>No source Markers defined</span> </div> </md-list-item> <md-subheader class="md-no-sticky">Target Markers</md-subheader> <md-list-item class="md-3-line" ng-click="map.focus(marker,true)" ng-repeat="marker in map.options.targetMarkers"> <md-icon class="md-avatar" md-svg-icon="md:map-marker" style="color: #38A9DC"></md-icon> <div class="md-list-item-text" layout="column"> <h3>{{marker.description.title}}</h3> <p>{{marker.description.meta1}} {{marker.description.meta2}}</p> <p>{{marker._latlng.lat}},{{marker._latlng.lng}}</p> </div> <md-button class="md-icon-button md-mini" aria-label="Delete Marker" ng-click="map.removeMarker(marker)"> <md-icon md-svg-icon="md:close"></md-icon> <md-tooltip>Delete Marker</md-tooltip> </md-button> </md-list-item> <md-list-item ng-if="map.options.targetMarkers.length === 0" layout="row" layout-align="center center"> <div style="color: rgba(0,0,0,0.4)"> <md-icon md-svg-icon="md:information" style="color: rgba(0,0,0,0.4)"></md-icon> <span>No target Markers defined</span> </div> </md-list-item> </md-list> <travel-plan></travel-plan> <section ng-show="map.options.showAdvanced"> <md-subheader class="md-no-sticky">Advanced</md-subheader> <md-list> <md-list-item ng-show="map.options.edgeWeight != \'distance\'"> <p>Travel Time Range</p> <md-select style="margin: 0" ng-model="map.options.travelTimeRangeID" aria-label="Travel Time Range" ng-change="map.changeTravelTimeRange()"> <md-option ng-repeat="range in map.prefs.travelTimeRanges" value="{{range.id}}">{{range.name}}</md-option> </md-select> </md-list-item> <md-list-item ng-show="map.options.edgeWeight == \'distance\'"> <p>Travel Distance Range</p> <md-select style="margin: 0" ng-model="map.options.travelDistanceRangeID" aria-label="Travel distance Range" ng-change="map.changeTravelDistanceRange()"> <md-option ng-repeat="range in map.prefs.travelDistanceRanges" value="{{range.id}}">{{range.name}}</md-option> </md-select> </md-list-item> <md-list-item> <p>Color Range</p> <md-select style="margin: 0" ng-model="map.options.colorRangeID" aria-label="Travel Time Range" ng-change="map.changeColorRange()"> <md-option ng-repeat="range in map.prefs.colorRanges" value="{{range.id}}">{{range.name}}</md-option> </md-select> </md-list-item> <md-list-item> <p>Intersection Mode</p> <md-select style="margin: 0" ng-model="map.options.intersection" aria-label="Intersection Mode" ng-change="map.updateView()"> <md-option ng-repeat="type in map.prefs.intersectionTypes" value="{{type.value}}">{{type.name}}</md-option> </md-select> </md-list-item> <md-list-item> <p>Enable elevation</p> <md-switch class="md-primary" aria-label="Elevation Switch" ng-model="map.options.elevation" ng-change="map.updateView()"> </md-list-item> <md-list-item ng-show="map.Meta.data.general.congestion == true && map.options.travelType == \'car\' "> <p>Rush-hour</p> <md-switch class="md-primary" aria-label="Rush-hour Switch" ng-model="map.options.rushHour" ng-change="map.updateView()"> </md-list-item> <md-list-item> <p>Min. Polygon Hole Size (m²)</p> <md-input-container style="margin:0; width: 100px"> <input type="number" min="1000" step="1000" class="md-primary" aria-label="Min Polygon Hole Size" ng-model="map.options.minPolygonHoleSize" ng-change="map.updateView()"> </md-input-container> </md-list-item> <md-list-item> <p>Custom Service URL</p> <md-input-container style="margin:0; width: 150px"> <input aria-label="Custom URL" ng-model="map.options.customURL" ng-change="map.updateView()"> </md-input-container> </md-list-item> <md-list-item> <p>API Key</p> <md-input-container style="margin:0; width: 150px"> <input aria-label="API Key" ng-model="map.options.serviceKey" ng-change="map.updateApiKey()"> </md-input-container> </md-list-item> <md-divider style="margin-top:1rem" ng-show="map.options.travelType == \'transit\' "></md-divider> <md-list-item ng-show="map.options.travelType == \'transit\' && map.options.debugMode "> <p>Transit Mode</p> <md-select style="margin: 0" ng-model="map.options.reverse" aria-label="Departure or Arrival Mode Select" ng-change="map.updateView()"> <md-option value="false">Departure</md-option> <md-option value="true">Arrival</md-option> </md-select> </md-list-item> <md-list-item ng-show="map.options.travelType == \'transit\' "> <p>Time frame</p> <md-select style="margin: 0" ng-model="map.options.frameDuration" aria-label="Frame duration in which connections are searched" ng-change="map.updateView()"> <md-option value="600">10 min</md-option> <md-option value="1200">20 min</md-option> <md-option value="1800">30 min</md-option> <md-option value="2400">40 min</md-option> <md-option value="3000">50 min</md-option> <md-option value="3600">60 min</md-option> <md-option value="7200">2h</md-option> <md-option value="10800">3h</md-option> <md-option value="14000">4h</md-option> <md-option value="18000">5h</md-option> </md-select> </md-list-item> <md-list-item ng-show="map.options.travelType == \'transit\' "> <p>Travel Date</p> <md-datepicker ng-model="map.options.queryDate" md-placeholder="Travel Date" aria-label="Datepicker" md-min-date="map.Meta.data.transit.min_date" md-max-date="map.Meta.data.transit.max_date" ng-change="map.updateView()"></md-datepicker> </md-list-item> <md-list-item ng-show="map.options.travelType == \'transit\' "> <p>Start Time</p> <md-select style="margin: 0" ng-model="map.options.queryTime.h" aria-label="Start-Time Hour" ng-change="map.updateView()"> <md-option ng-repeat="hour in map.prefs.queryTimeRange.hour" value="{{hour}}">{{hour}}</md-option> </md-select> <span style="margin: 0 1rem">:</span> <md-select style="margin: 0" ng-model="map.options.queryTime.m" aria-label="Start-Time Minute" ng-change="map.updateView()"> <md-option ng-repeat="minute in map.prefs.queryTimeRange.minute" value="{{minute}}">{{minute}}</md-option> </md-select> </md-list-item> <!-- <md-list-item>\n                            <p>Map Provider</p>\n                            <md-select style="margin: 0" ng-model="map.options.mapProvider" aria-label="Map Provider">\n                                <md-option ng-repeat="provider in map.prefs.mapProviderList" value="{{provider.value}}">{{provider.name}}</md-option>\n                            </md-select>\n                    </md-list-item> --> <md-divider style="margin-top:1rem"></md-divider> <md-list-item> <p>Map transition (Menu open)</p> <md-switch class="md-primary" aria-label="Transition Switch" ng-model="map.options.transition"> </md-list-item> <md-list-item> <p>Zoom after Request</p> <md-switch class="md-primary" aria-label="Transition Switch" ng-model="map.options.zoomAllTheTime"> </md-list-item> <md-list-item> <p>Map Style</p> <md-select style="margin: 0" ng-model="map.options.mapstyle" aria-label="Map Style Select" ng-change="map.updateTileStyle()"> <md-option ng-repeat="style in map.prefs.mapStyles" value="{{style.value}}">{{style.name}}</md-option> </md-select> </md-list-item> <!-- <pre>{{debugMode}}</pre> --> <div ng-if="map.options.debugMode"> <md-divider style="margin-top:1rem"></md-divider> <md-list-item> <p>Number of targets</p> <md-select ng-init="map.options.randomTargetsSize = 10" ng-model="map.options.randomTargetsSize" aria-label="Number of random targets for TimeService"> <md-option value="1">1</md-option> <md-option value="10">10</md-option> <md-option value="20">20</md-option> <md-option value="50">50</md-option> <md-option value="100">100</md-option> <md-option value="500">500</md-option> <md-option value="1000">1000</md-option> </md-select> </md-list-item> <md-button aria-label="Add targets" ng-click="map.addTargets(map.options.randomTargetsSize)"> Add </md-button> <md-button aria-label="Clear targets" ng-click="map.clearTiming()"> Clear </md-button> </div> </md-list></section> <div layout-align="center center" layout="row"> <md-button ng-click="map.options.showAdvanced = !map.options.showAdvanced" class="md-primary" layout="row" layout-align="center center"><span>{{map.options.showAdvanced && \'Less\' || \'More\'}}</span> <md-icon md-svg-icon="md:chevron-{{map.options.showAdvanced && \'up\' || \'down\'}}"></md-icon></md-button> </div>  </md-content> </md-sidenav> <section id="fab-bounds" class="overlay-speeddials" layout="column" layout-xs="row" layout-align="start end" layout-align-xs="end start"> <md-fab-speed-dial ng-if="map.options.edgeWeight != \'distance\'" md-open="false" md-direction="{{ map.mdMedia(\'xs\') ? \'down\' : \'left\'}}" class="md-scale"> <md-fab-trigger> <md-button aria-label="Travel Type" class="md-fab md-accent md-hue-2"> {{map.options.travelTime}} Min. <md-tooltip hide show-gt-xs>Max. Travel Time</md-tooltip> </md-button> </md-fab-trigger> <md-fab-actions> <md-button ng-repeat="time in map.prefs.travelTimeRanges[map.options.travelTimeRangeID].times.slice().reverse()" ng-click="map.changeTravelTime(time)" aria-label="Set time to {{time}}" class="md-fab md-mini" style="background: {{map.prefs.colorRanges[map.options.colorRangeID].colors[5-$index]}}"> {{time}} </md-button> </md-fab-actions> </md-fab-speed-dial> <travel-distance-fab ng-if="map.options.edgeWeight == \'distance\'" md-animation="md-scale" unit-label="km" label="Travel Distance" md-direction="left" model="map.options.travelDistance" travel-distance-range="map.prefs.travelDistanceRanges[map.options.travelDistanceRangeID]" color-range="map.prefs.colorRanges[map.options.colorRangeID]"></travel-distance-fab> <md-fab-speed-dial md-open="false" md-direction="{{ map.mdMedia(\'xs\') ? \'down\' : \'left\'}}" class="md-scale"> <md-fab-trigger> <md-button aria-label="Travel Type" class="md-fab md-accent md-hue-2"> <md-icon ng-if="map.options.travelType == \'bike\'" md-svg-icon="md:bike"></md-icon> <md-icon ng-if="map.options.travelType == \'walk\'" md-svg-icon="md:walk"></md-icon> <md-icon ng-if="map.options.travelType == \'car\'" md-svg-icon="md:car"></md-icon> <md-icon ng-if="map.options.travelType == \'transit\'" md-svg-icon="md:train"></md-icon> <md-tooltip hide show-gt-xs>Travel Type</md-tooltip> </md-button> </md-fab-trigger> <md-fab-actions> <md-button ng-click="map.changeTravelType(\'walk\')" aria-label="Walk" class="md-fab md-mini"> <md-icon md-svg-icon="md:walk"></md-icon> <md-tooltip hide show-gt-xs>Walk</md-tooltip> </md-button> <md-button ng-click="map.changeTravelType(\'bike\')" aria-label="Bike" class="md-fab md-mini"> <md-icon md-svg-icon="md:bike"></md-icon> <md-tooltip hide show-gt-xs>Bike</md-tooltip> </md-button> <md-button ng-click="map.changeTravelType(\'car\')" aria-label="Car" class="md-fab md-mini"> <md-icon md-svg-icon="md:car"></md-icon> <md-tooltip hide show-gt-xs>Car</md-tooltip> </md-button> <md-button ng-disabled="!map.Meta.data.transit.available" ng-show="map.options.edgeWeight != \'distance\'" ng-click="map.changeTravelType(\'transit\')" aria-label="Transit" class="md-fab md-mini"> <md-icon md-svg-icon="md:train"></md-icon> <md-tooltip ng-if="map.Meta.data.transit.available" hide show-gt-xs>Transit</md-tooltip> <md-tooltip ng-if="!map.Meta.data.transit.available" hide show-gt-xs>Transit is not yet available for this region.</md-tooltip> </md-button> </md-fab-actions> </md-fab-speed-dial> <md-fab-speed-dial md-open="false" md-direction="{{ map.mdMedia(\'xs\') ? \'down\' : \'left\'}}" class="md-scale"> <md-fab-trigger> <md-button aria-label="Routing Type" class="md-fab md-accent md-hue-2"> <md-icon ng-if="map.options.edgeWeight != \'distance\'" md-svg-icon="md:timer"></md-icon> <md-icon ng-if="map.options.edgeWeight == \'distance\'" md-svg-icon="md:directions"></md-icon> <md-tooltip hide show-gt-xs>Routing Type</md-tooltip> </md-button> </md-fab-trigger> <md-fab-actions> <md-button ng-click="map.changeEdgeWeight(\'time\')" aria-label="Time" class="md-fab md-mini"> <md-icon md-svg-icon="md:timer"></md-icon> <md-tooltip hide show-gt-xs>Time</md-tooltip> </md-button> <md-button ng-click="map.changeEdgeWeight(\'distance\')" aria-label="Distance" class="md-fab md-mini"> <md-icon md-svg-icon="md:directions"></md-icon> <md-tooltip hide show-gt-xs>Distance</md-tooltip> </md-button> </md-fab-actions> </md-fab-speed-dial> </section> <section class="overlay-controls" layout="column"> <md-button class="md-fab md-primary overlay-btn md-hue-2" ng-click="map.toggleOptions()" aria-label="Open Menu"> <md-icon md-svg-icon="md:menu"></md-icon> <!--<md-tooltip>Options</md-tooltip>--> </md-button> </section> <section id="overlay-legend" style="margin-left: {{(map.prefsOpen || map.optsOpen) && \'450px\' || 0}}" layout="column" layout-align="center center"> <div class="progress-box md-whiteframe-z2" ng-show="map.states.requestPending"> <p>loading...</p> <md-progress-linear md-mode="indeterminate"></md-progress-linear> </div> <r360-rainbow ng-if="map.options.edgeWeight == \'distance\'" travel-time="map.options.travelDistance / 1000" label="km" travel-time-range="map.prefs.travelDistanceRanges[map.options.travelDistanceRangeID]" color-range="map.prefs.colorRanges[map.options.colorRangeID]"></r360-rainbow> <r360-rainbow ng-if="map.options.edgeWeight != \'distance\'" travel-time="map.options.travelTime" travel-time-range="map.prefs.travelTimeRanges[map.options.travelTimeRangeID]" color-range="map.prefs.colorRanges[map.options.colorRangeID]"></r360-rainbow> </section> <md-content flex layout="row" id="map"> </md-content></section>  <section class="overlay-init" layout="column" layout-align="center center" ng-show="map.states.init"> <p>initializing...</p> <md-progress-linear md-mode="indeterminate"></md-progress-linear> </section> </div>')
}
]);

/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"Arac/arac/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"Arac/arac/test/integration/pages/Worklist",
	"Arac/arac/test/integration/pages/Object",
	"Arac/arac/test/integration/pages/NotFound",
	"Arac/arac/test/integration/pages/Browser",
	"Arac/arac/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "Arac.arac.view."
	});

	sap.ui.require([
		"Arac/arac/test/integration/WorklistJourney",
		"Arac/arac/test/integration/ObjectJourney",
		"Arac/arac/test/integration/NavigationJourney",
		"Arac/arac/test/integration/NotFoundJourney",
		"Arac/arac/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});
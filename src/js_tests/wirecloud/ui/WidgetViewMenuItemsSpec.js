/*
 *     Copyright (c) 2020 Future Internet Consulting and Development Solutions S.L.
 *
 *     This file is part of Wirecloud Platform.
 *
 *     Wirecloud Platform is free software: you can redistribute it and/or
 *     modify it under the terms of the GNU Affero General Public License as
 *     published by the Free Software Foundation, either version 3 of the
 *     License, or (at your option) any later version.
 *
 *     Wirecloud is distributed in the hope that it will be useful, but WITHOUT
 *     ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *     FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public
 *     License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with Wirecloud Platform.  If not, see
 *     <http://www.gnu.org/licenses/>.
 *
 */

/* globals StyledElements, Wirecloud */


(function (ns, utils) {

    "use strict";

    describe("WidgetViewMenuItems", () => {

        describe("new WidgetViewMenuItems(widget)", () => {

            it("works", () => {
                let widget = {};

                let item = new ns.WidgetViewMenuItems(widget);

                expect(item.widget).toBe(widget);
            });

        });

        describe("build()", () => {

            const createwidgetmock = function createwidgetmock(options) {
                options = options || {};
                options.layout = options.layout != null ? options.layout : 0;

                return {
                    layout: options.layout,
                    model: {
                        hasPreferences: jasmine.createSpy("hasPreferences").and.returnValue(true),
                        isAllowed: jasmine.createSpy("isAllowed").and.returnValue(true),
                        meta: {
                            doc: "a"
                        }
                    },
                    position: {
                        anchor: options.anchor || "topleft",
                        relx: !!options.relx,
                        rely: !!options.rely,
                        x: 0,
                        y: 0
                    },
                    setPosition: jasmine.createSpy('setPosition'),
                    shape: {
                        relwidth: !!options.relwidth,
                        relheight: !!options.relheight,
                        width: 1,
                        height: 1
                    },
                    tab: {
                        dragboard: {
                            baseLayout: 0,
                            freeLayout: 1,
                            leftLayout: 2,
                            rightLayout: 3,
                            fulldragboardLayout: 4
                        }
                    }
                };
            };

            it("manages widgets on base layouts", () => {
                let widget = createwidgetmock({layout: 0});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                expect(items.some((item) => {return item.title === "Placement";})).toBe(false);
                expect(items.some((item) => {return item.title === "Extract from grid";})).toBe(true);
                expect(items.some((item) => {return item.title === "Move to the left sidebar";})).toBe(true);
                expect(items.some((item) => {return item.title === "Move to the right sidebar";})).toBe(true);
            });

            it("manages widgets on free layouts", () => {
                let widget = createwidgetmock({layout: 1});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                expect(items.some((item) => {return item.title === "Placement";})).toBe(true);
                expect(items.some((item) => {return item.title === "Extract from grid";})).toBe(false);
                expect(items.some((item) => {return item.title === "Move to the left sidebar";})).toBe(true);
                expect(items.some((item) => {return item.title === "Move to the right sidebar";})).toBe(true);
            });

            it("manages widgets on full dragboard", () => {
                let widget = createwidgetmock({layout: 4});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                expect(items.some((item) => {return item.title === "Placement";})).toBe(false);
                expect(items.some((item) => {return item.title === "Extract from grid";})).toBe(false);
                expect(items.some((item) => {return item.title === "Move to the left sidebar";})).toBe(false);
                expect(items.some((item) => {return item.title === "Move to the right sidebar";})).toBe(false);
            });

            it("manages widgets on left layouts", () => {
                let widget = createwidgetmock({layout: 2});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                expect(items.some((item) => {return item.title === "Placement";})).toBe(false);
                expect(items.some((item) => {return item.title === "Extract from grid";})).toBe(true);
                expect(items.some((item) => {return item.title === "Move to the left sidebar";})).toBe(false);
                expect(items.some((item) => {return item.title === "Move to the right sidebar";})).toBe(true);
            });

            it("manages widgets on right layouts", () => {
                let widget = createwidgetmock({layout: 3});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                expect(items.some((item) => {return item.title === "Placement";})).toBe(false);
                expect(items.some((item) => {return item.title === "Extract from grid";})).toBe(true);
                expect(items.some((item) => {return item.title === "Move to the left sidebar";})).toBe(true);
                expect(items.some((item) => {return item.title === "Move to the right sidebar";})).toBe(false);
            });

            it("handles Rename", () => {
                let widget = createwidgetmock({layout: 0});
                widget.titleelement = {
                    enableEdition: jasmine.createSpy("enableEdition")
                };
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Rename";});

                element.run();

                expect(widget.titleelement.enableEdition).toHaveBeenCalledWith();
            });

            it("handles Reload", () => {
                let widget = createwidgetmock({layout: 0});
                widget.reload = jasmine.createSpy("reload");
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Reload";});

                element.run();

                expect(widget.reload).toHaveBeenCalledWith();
            });

            it("handles Upgrade/Downgrade", () => {
                let widget = createwidgetmock({layout: 0});
                widget.reload = jasmine.createSpy("reload");
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);
                ns.UpgradeWindowMenu = jasmine.createSpy("UpgradeWindowMenu").and.callFake(function () {this.show = jasmine.createSpy("show");});

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Upgrade/Downgrade";});

                element.run();
            });

            it("handles Logs option", () => {
                let widget = createwidgetmock({layout: 0});
                widget.showLogs = jasmine.createSpy("showLogs");
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Logs";});

                element.run();

                expect(widget.showLogs).toHaveBeenCalledWith();
            });

            it("handles Settings option", () => {
                let widget = createwidgetmock({layout: 0});
                widget.showSettings = jasmine.createSpy("showSettings");
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Settings";});

                element.run();

                expect(widget.showSettings).toHaveBeenCalledWith();
            });

            it("handles User's manual option", () => {
                let widget = createwidgetmock({layout: 0});
                Wirecloud.UserInterfaceManager.views.myresources = {
                    createUserCommand: jasmine.createSpy("createUserCommand").and.returnValue(() => {})
                };
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "User's Manual";});

                element.run();

                expect(Wirecloud.UserInterfaceManager.views.myresources.createUserCommand).toHaveBeenCalled();
            });

            it("handles Full Dragboard option", () => {
                let widget = createwidgetmock({layout: 0});
                widget.setFullDragboardMode = jasmine.createSpy("setFullDragboardMode");
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Full Dragboard";});

                element.run();

                expect(widget.setFullDragboardMode).toHaveBeenCalled();
            });

            it("handles Extract from grid options", () => {
                let widget = createwidgetmock({layout: 0});
                widget.moveToLayout = jasmine.createSpy("moveToLayout");
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Extract from grid";});

                element.run();
            });

            it("handles Snap to grid options", () => {
                let widget = createwidgetmock({layout: 1});
                widget.moveToLayout = jasmine.createSpy("moveToLayout");
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Snap to grid";});

                element.run();
            });

            it("handles Move to the left sidebar option", () => {
                let widget = createwidgetmock({layout: 0});
                widget.moveToLayout = jasmine.createSpy("moveToLayout");
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Move to the left sidebar";});

                element.run();
            });

            it("handles Move to the right sidebar option", () => {
                let widget = createwidgetmock({layout: 0});
                widget.moveToLayout = jasmine.createSpy("moveToLayout");
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let element = items.find((item) => {return item.title === "Move to the right sidebar";});

                element.run();
            });

            it("handles switching into relative horizontal placement", () => {
                let widget = createwidgetmock({layout: 1});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                widget.layout = {
                    adaptColumnOffset: jasmine.createSpy("adaptColumnOffset").and.returnValue({}),
                    dragboard: {
                        leftMargin: 1
                    },
                    getColumnOffset: jasmine.createSpy("getColumnOffset").and.returnValue(0)
                };
                expect(items).toEqual(jasmine.any(Array));
                let submenu = items.find((item) => {return item.title === "Placement";});
                let element = submenu._items.find((item) => {return item.title === "Relative x";});

                element.run();
            });

            it("handles switching into absolute horizontal placement", () => {
                let widget = createwidgetmock({layout: 1, relx: true});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                widget.layout = {
                    adaptColumnOffset: jasmine.createSpy("adaptColumnOffset").and.returnValue({}),
                    dragboard: {
                        leftMargin: 1
                    },
                    getColumnOffset: jasmine.createSpy("getColumnOffset").and.returnValue(0)
                };
                expect(items).toEqual(jasmine.any(Array));
                let submenu = items.find((item) => {return item.title === "Placement";});
                let element = submenu._items.find((item) => {return item.title === "Absolute x";});

                element.run();
            });

            it("handles switching into relative vertical placement", () => {
                let widget = createwidgetmock({layout: 1});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                widget.layout = {
                    adaptRowOffset: jasmine.createSpy("adaptRowOffset").and.returnValue({}),
                    dragboard: {
                        topMargin: 1
                    },
                    getRowOffset: jasmine.createSpy("getRowOffset").and.returnValue(0)
                };
                expect(items).toEqual(jasmine.any(Array));
                let submenu = items.find((item) => {return item.title === "Placement";});
                let element = submenu._items.find((item) => {return item.title === "Relative y";});

                element.run();
            });

            it("handles switching into absolute vertical placement", () => {
                let widget = createwidgetmock({layout: 1, rely: true});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                widget.layout = {
                    adaptRowOffset: jasmine.createSpy("adaptRowOffset").and.returnValue({}),
                    dragboard: {
                        topMargin: 1
                    },
                    getRowOffset: jasmine.createSpy("getRowOffset").and.returnValue(0)
                };
                expect(items).toEqual(jasmine.any(Array));
                let submenu = items.find((item) => {return item.title === "Placement";});
                let element = submenu._items.find((item) => {return item.title === "Absolute y";});

                element.run();
            });

            it("handles switching into relative widths", () => {
                let widget = createwidgetmock({layout: 1});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let submenu = items.find((item) => {return item.title === "Placement";});
                let element = submenu._items.find((item) => {return item.title === "Relative width";});

                element.run();
            });

            it("handles switching into absolute widths", () => {
                let widget = createwidgetmock({layout: 1, relwidth: true});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let submenu = items.find((item) => {return item.title === "Placement";});
                let element = submenu._items.find((item) => {return item.title === "Absolute width";});

                element.run();
            });

            it("handles switching into relative heights", () => {
                let widget = createwidgetmock({layout: 1});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let submenu = items.find((item) => {return item.title === "Placement";});
                let element = submenu._items.find((item) => {return item.title === "Relative height";});

                element.run();
            });

            it("handles switching into absolute heights", () => {
                let widget = createwidgetmock({layout: 1, relheight: true});
                let item = new ns.WidgetViewMenuItems(widget);
                spyOn(Wirecloud.LocalCatalogue, 'hasAlternativeVersion').and.returnValue(true);

                let items = item.build();
                expect(items).toEqual(jasmine.any(Array));
                let submenu = items.find((item) => {return item.title === "Placement";});
                let element = submenu._items.find((item) => {return item.title === "Absolute height";});

                element.run();
            });

        });

    });

})(Wirecloud.ui, StyledElements.Utils);

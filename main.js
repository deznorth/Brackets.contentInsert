/*
 * @Author: David M. Rojas Gonzalez // davidr.info
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");

    
    // Function to run when the menu item is clicked
    function handleContentInsert() {
        alert('contentInsert');
    }
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var COMMAND_ID = "dez.contentInsert.insert";   // package-style naming to avoid collisions
    CommandManager.register("Insert Content with contentInsert", COMMAND_ID, handleContentInsert);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID);
});